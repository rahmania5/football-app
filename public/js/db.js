import "./idb.js";

let dbPromised = idb.open("football-app", 1, function(upgradeDb) {
    let matchesObjectStore = upgradeDb.createObjectStore("matches", {
      keyPath: "id"
    });
    matchesObjectStore.createIndex("utcDate", "utcDate", { unique: false });
});

function saveForLater(data) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("matches", "readwrite");
        let store = tx.objectStore("matches");
        console.log(data);
        store.put(data.match);
        return tx.complete;
      })
      .then(function() {
        console.log("Match schedule has been saved.");
      });
}

function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("matches", "readonly");
          let store = tx.objectStore("matches");
          return store.getAll();
        })
        .then(function(matches) {
          if(matches.length === 0) {
            let content = document.querySelector("#body-content");
            content.innerHTML = "<p>No match schedule is saved.</p>";
          }
          else {
            resolve(matches);
          }
        });
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("matches", "readonly");
        let store = tx.objectStore("matches");
        return store.get(Number(id));
      })
      .then(function(data) {
        resolve(data);
      });
  });
}

function delMatch(data) {
  dbPromised
  .then(function(db) {
    let tx = db.transaction('matches', 'readwrite');
    let store = tx.objectStore('matches');
    console.log(data);
    store.delete(data.id);
    return tx.complete;
  }).then(function() {
    console.log('Match schedule deleted');
  });
}

export {
  saveForLater,
  getAll,
  getById,
  delMatch
};