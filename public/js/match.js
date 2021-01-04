import {saveForLater, delMatch} from "./db.js";
import {getMatchById, getSavedMatchById} from "./api.js";

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function() {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");

        let btnSave = document.getElementById("save");
        let btnDel = document.getElementById("delete");
        if (isFromSaved) {
          btnSave.style.display = 'none';
          getSavedMatchById();
        } else {
          btnDel.style.display = 'none';
          getMatchById();
        }

        btnSave.onclick = function() {
          let item = getMatchById();
          console.log("Tombol FAB di klik.");
          item.then(function(data) {
            saveForLater(data);
          });
          M.toast({
            html: 'Match schedule saved successfully!',
            options: {
              inDuration: 300,
              outDuration: 375
            }});
        };

        btnDel.onclick = function() {
          let item = getSavedMatchById();
          console.log("Tombol FAB di klik.");
          item.then(function(value) {
            delMatch(value);
          });
          M.toast({
            html: 'Match schedule deleted.',
            options: {
              inDuration: 300,
              outDuration: 375
            }
          });
        };
});