const DB_NAME = "picgallery";
const DB_VERSION = 1;
const STORE = "uploads";

let databasePromise = null;

function openDatabase() {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE)) {
        database.createObjectStore(STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return databasePromise;
}

function transaction(mode, callback) {
  return openDatabase().then(
    (database) =>
      new Promise((resolve, reject) => {
        const tx = database.transaction(STORE, mode);
        const store = tx.objectStore(STORE);
        const result = callback(store);

        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      })
  );
}

export async function saveUpload(record) {
  await transaction("readwrite", (store) => store.put(record));
}

export async function getAllUploads() {
  return transaction("readonly", (store) => {
    const request = store.getAll();
    let records = [];

    request.onsuccess = () => {
      records = request.result;
    };

    return {
      get value() {
        return records;
      },
    };
  }).then((holder) => holder.value);
}

export async function deleteUpload(id) {
  await transaction("readwrite", (store) => store.delete(id));
}
