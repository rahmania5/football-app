import {getAll, getById} from "./db.js";

const base_url = "https://api.football-data.org/v2/";

const fetchAPI = base_url => {
    return fetch(base_url, {
        headers: {
            'X-Auth-Token': 'c96e8d8571bf41bd9fe47a4ee2b50a1c'
        }
    })
    .then(status)
    .then(json)
    .catch(error)
};

function status(response) {
  if (response.status === 404) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
  M.toast({
      html: "Unable to update data while offline.",
      options: {
        inDuration: 300,
        outDuration: 375
      }
  })
}

function getMatches() {
    if ("caches" in window) {
        caches.match(`${base_url}competitions/ELC/matches?status=SCHEDULED`).then(function(response) {
          if (response) {
            response.json().then(function(data) {
              let matchesHTML = "";
              data.matches.forEach(function(match) {
                let getDate = JSON.parse(`\"${match.utcDate}\"`);
                let date = new Date(getDate);
                let formattedDate = moment(date).format('LLL');
                matchesHTML += `
                  <div class="col s12 m6 l4">  
                      <div class="card hoverable">
                      <a href="./match.html?id=${match.id}">
                        <div class="card-image">
                          <img src="img/post-1.png" alt="Logo ELC">
                        </div>
                      </a>
                        <div class="card-content">
                          <span class="card-title">${match.homeTeam.name} VS ${match.awayTeam.name}</span>
                          <p>Date: ${formattedDate}</p>
                        </div>
                      </div>
                  </div>
                    `;
              });

              document.getElementById("matches").innerHTML = matchesHTML;
            });
          }
        });
    }

    fetch(`${base_url}competitions/ELC/matches?status=SCHEDULED`, {
            headers: {
            'X-Auth-Token': 'c96e8d8571bf41bd9fe47a4ee2b50a1c'
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
          // Objek/array JavaScript dari response.json() masuk lewat data.
          // Menyusun komponen card artikel secara dinamis
              let matchesHTML = "";
              data.matches.forEach(function(match) {
                let getDate = JSON.parse(`\"${match.utcDate}\"`);
                let date = new Date(getDate);
                let formattedDate = moment(date).format('LLL');
                matchesHTML += `
                  <div class="col s12 m6 l4">  
                    <div class="card hoverable">
                    <a href="./match.html?id=${match.id}">
                      <div class="card-image">
                        <img src="img/post-1.png" alt="Logo ELC">
                      </div>
                    </a>
                      <div class="card-content">
                          <span class="card-title">${match.homeTeam.name} VS ${match.awayTeam.name}</span>
                          <p>Date: ${formattedDate}</p>
                      </div>
                    </div>
                  </div>
                  `;
               });

              document.getElementById("matches").innerHTML = matchesHTML;
        })
        .catch(error);
}

function getMatchById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if ("caches" in window) {
        caches.match(`${base_url}matches/${idParam}`).then(function(response) {
          if (response) {
            response.json().then(function(data) {
              let getDate = JSON.parse(`\"${data.match.utcDate}\"`);
              let date = new Date(getDate);
              let formattedDate = moment(date).format('LLL');
              let matchHTML = `
              <div class="col s12">  
              <div class="card hoverable">
                <div class="card-image">
                  <img src="img/post-1.png" alt="Logo ELC">
                </div>
                <div class="card-content">
                    <span class="card-title">${data.match.homeTeam.name} VS ${data.match.awayTeam.name}</span>
                    <p>Season: ${data.match.season.startDate} - ${data.match.season.endDate}</p>
                    <p>Date: ${formattedDate}</p>
                    <p>Home Team: ${data.match.homeTeam.name}</p>
                    <p>Away Team: ${data.match.awayTeam.name}</p>
                </div>
              </div>
            </div>
              `;

              document.getElementById("body-content").innerHTML = matchHTML;
              resolve(data);
            });
          }
        });
      }
    
      fetch(`${base_url}matches/${idParam}`, {
        headers: {
        'X-Auth-Token': 'c96e8d8571bf41bd9fe47a4ee2b50a1c'
        }
      })
        .then(status)
        .then(json)
        .then(function(data) {
              let getDate = JSON.parse(`\"${data.match.utcDate}\"`);
              let date = new Date(getDate);
              let formattedDate = moment(date).format('LLL');
              let matchHTML = `
              <div class="col s12">  
              <div class="card hoverable">
                <div class="card-image">
                  <img src="img/post-1.png" alt="Logo ELC">
                </div>
                <div class="card-content">
                    <span class="card-title">${data.match.homeTeam.name} VS ${data.match.awayTeam.name}</span>
                    <p>Season: ${data.match.season.startDate} - ${data.match.season.endDate}</p>
                    <p>Date: ${formattedDate}</p>
                    <p>Home Team: ${data.match.homeTeam.name}</p>
                    <p>Away Team: ${data.match.awayTeam.name}</p>
                </div>
              </div>
            </div>
              `;

              document.getElementById("body-content").innerHTML = matchHTML;
              resolve(data);
        })
        .catch(error)
  });
}

function getSavedMatches() {
   getAll().then(function(data) {
    let matchesHTML = "";
    data.forEach(function(value) {
      let getDate = JSON.parse(`\"${value.utcDate}\"`);
      let date = new Date(getDate);
      let formattedDate = moment(date).format('LLL');
      matchesHTML += `
          <div class="col s12 m6 l4">  
            <div class="card hoverable">
              <a href="./match.html?id=${value.id}&saved=true">
                <div class="card-image">
                  <img src="img/post-1.png" alt="Logo ELC">
                </div>
              </a>
              <div class="card-content">
                <span class="card-title">${value.homeTeam.name} VS ${value.awayTeam.name}</span>
                <p>Date: ${formattedDate}</p>
              </div>
            </div>
          </div>
          `;
    });

    document.getElementById("savedmatch").innerHTML = matchesHTML;  
  });
}

function getSavedMatchById() {
 return new Promise(function(resolve, reject) {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  
  getById(idParam).then(function(data) {
      let getDate = JSON.parse(`\"${data.utcDate}\"`);
      let date = new Date(getDate);
      let formattedDate = moment(date).format('LLL');
      let matchHTML = '';
      matchHTML = `
          <div class="col s12">  
            <div class="card hoverable">
              <div class="card-image">
                <img src="img/post-1.png" alt="Logo ELC">
              </div>
              <div class="card-content">
                <span class="card-title">${data.homeTeam.name} VS ${data.awayTeam.name}</span>
                <p>Season: ${data.season.startDate} - ${data.season.endDate}</p>
                <p>Date: ${formattedDate}</p>
                <p>Home Team: ${data.homeTeam.name}</p>
                <p>Away Team: ${data.awayTeam.name}</p>
              </div>
            </div>
          </div>
          `;

          document.getElementById("body-content").innerHTML = matchHTML;
          resolve(data);
  });
 });
}

function getScorers() {
    if ("caches" in window) {
        caches.match(`${base_url}competitions/ELC/scorers`).then(function(response) {
          if (response) {
            response.json().then(function(data) {
              let scorersHTML = "";
              data.scorers.forEach(function(scorer) {
                scorersHTML += `
                  <tr>
                    <td>${scorer.player.name}</td>
                    <td>${scorer.player.shirtNumber}</td>
                    <td>${scorer.player.position}</td>
                    <td>${scorer.team.name}</td>
                    <td>${scorer.numberOfGoals}</td>
                  </tr>
                  `;
              });
              document.getElementById("scorers").innerHTML = scorersHTML;
            });
          }
        });
    }

    fetch(`${base_url}competitions/ELC/scorers`, {
            headers: {
            'X-Auth-Token': 'c96e8d8571bf41bd9fe47a4ee2b50a1c'
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
              let scorersHTML = "";
              data.scorers.forEach(function(scorer) {
                scorersHTML += `
                  <tr>
                    <td>${scorer.player.name}</td>
                    <td>${scorer.player.shirtNumber}</td>
                    <td>${scorer.player.position}</td>
                    <td>${scorer.team.name}</td>
                    <td>${scorer.numberOfGoals}</td>
                  </tr>
                  `;
              });
              document.getElementById("scorers").innerHTML = scorersHTML;
          })
        .catch(error);
}

export {
  getMatches,
  getMatchById,
  getSavedMatches,
  getSavedMatchById,
  getScorers
};