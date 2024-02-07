

// Retrieve character ID from local storage
const characterId = JSON.parse(localStorage.getItem("infoId"));

// Function to display information on screen
async function getAboutData() {
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=9b4ba214347a8aa5026223be1b759e44&hash=1530de2cd26f5e11d34d062cfb952ef7`);
    const data = await response.json();
    let info = data.data.results[0];
    console.log(info);

    const imageSrc = info.thumbnail.path +
        (info.thumbnail.extension === "jpg"
          ? "/landscape_small.jpg"
          : "/landscape_small.gif");

    const infoCharactersContainer = `
    <button class="btn btn-danger" type="button" > <a id="home" href="index.html"><<< Back to home</a></button>
      <div class="card" id="${info.id}" style="width: 18rem">
            <img src=${imageSrc} class="card-img-top" alt="..." />
            <h5 class="card-title">${info.name}</h5>
            <div class="card-body">${info.description}
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Hero ID: ${info.id}</li>
              <li class="list-group-item">Stories available : ${info.stories.available}</li>
              <li class="list-group-item">Hero ID: ${info.id}</li>
              <li class="list-group-item">Comics available: ${info.comics.available} <a href="${info.urls[1].url}">click</a></li>
              <li class="list-group-item">Series available: ${info.series.available}</li>
            </ul>
            
        </div>`;

    document.getElementsByClassName("info-container")[0].innerHTML = infoCharactersContainer;

}
getAboutData();
