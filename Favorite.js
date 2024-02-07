// favorite.js
const loader = document.querySelector(".loader");
const loaderOut = () => {
  // loader.classList.remove("loader")
  document.body.removeChild(loader);
};

// Function to fetch and display favorite characters
async function displayFavoriteCharacters() {
  const favoriteHeroes = JSON.parse(localStorage.getItem("favoriteHeroes")) || [];
  let favoriteCharactersContainer = '';

  for (const heroId of favoriteHeroes) {
    try {
      const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${heroId}?ts=1&apikey=9b4ba214347a8aa5026223be1b759e44&hash=1530de2cd26f5e11d34d062cfb952ef7`);
      const data = await response.json();
      const character = data.data.results[0];

      const imageSrc = character.thumbnail.path +
        (character.thumbnail.extension === "jpg"
          ? "/portrait_medium.jpg"
          : "/portrait_medium.gif");

      favoriteCharactersContainer += `
      <div class="card" id="${heroId}" style="width: 18rem">
            <img src=${imageSrc} class="card-img-top" alt="..." />
            <h5 class="card-title">${character.name}</h5>
            <div class="card-body">
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Hero ID: ${character.id}</li>
              <li class="list-group-item">Comics available: ${character.comics.available} <a href="${character.urls[1].url}">click</a></li>
              <li class="list-group-item">Series available: ${character.series.available}</li>
            </ul>
            <div class="card-body">
              <button class="btn btn-danger remove-btn" type="button" data-hero="${heroId}">
                REMOVE FROM FAVORITE
              </button>
            </div>
            
        </div>`;
    } catch (error) {
      console.error("Error fetching favorite character:", error);
    }
  }

  

  document.getElementById("favorite-characters-container").innerHTML = favoriteCharactersContainer;

  
  loaderOut();
  if (favoriteHeroes.length==0) {
    // If it's empty, display a message
    document.getElementById(
      "favorite-characters-container"
    ).innerHTML = `<h1 class="not-found" style="font-family:Honk, system-ui;">No favorite characters found.</h1>`;
  }

  // Attach event listener to remove buttons
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", removeFromFav);
  });
}

// Function to remove a character from the user's favorites
const removeFromFav = function (e) {
  try {
    let heroId = e.target.dataset.hero;
  

    // Retrieve favoriteHeroes array from localStorage
    let favoriteHeroes = JSON.parse(localStorage.getItem("favoriteHeroes")) || [];
  

    // Remove the heroId from the array
    const index = favoriteHeroes.indexOf(heroId);
    if (index !== -1) {
      favoriteHeroes.splice(index, 1);

      // Update localStorage with the modified array
      localStorage.setItem("favoriteHeroes", JSON.stringify(favoriteHeroes));
     

      // Remove the card from the UI
      const cardToRemove = document.getElementById(heroId);
      if (cardToRemove) {
        cardToRemove.remove();
      }
    }
    if (favoriteHeroes.length == 0) {
      // If it's empty, display a message
      document.getElementById(
        "favorite-characters-container"
      ).innerHTML = `<h1 class="not-found" style="font-family:Honk, system-ui;">No favorite characters found.</h1>`;
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

// Call the function to display favorite characters when the page loads
displayFavoriteCharacters();
