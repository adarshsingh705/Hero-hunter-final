let input = document.getElementById("input");
let button = document.getElementById("button");

let favoriteHeroes = JSON.parse(localStorage.getItem("favoriteHeroes")) || [];

button.addEventListener("click", async function getResult() {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
    return;
  }

  let mainDiv = document.getElementsByClassName("main-div")[0];
  

  let charactersContainer = ``;
  try {
    let response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input.value}&ts=1&apikey=9b4ba214347a8aa5026223be1b759e44&hash=1530de2cd26f5e11d34d062cfb952ef7`
    );
    let data = await response.json();
    let characters = data.data.results;

    if (characters.length === 0) {
      charactersContainer += `<h2 class="not-found">No results found for "${input.value}" Try again</h2>`;
    } else if (characters.length <= 9) {
      mainDiv.classList.remove("main-div");
      mainDiv.classList.add("main-div1");
    } else {
      mainDiv.classList.add("main-div");
    }

    characters.forEach((character) => {
      const heroId = character.id;

      const imageSrc =
        character.thumbnail.path +
        (character.thumbnail.extension === "jpg"
          ? "/standard_small.jpg"
          : "/standard_small.gif");

      charactersContainer += `
        <div class="card" id="hero-card" style="width: 15rem;">
              <img src=${imageSrc} class="card-img-top" alt="..." />
              <h5 class="card-title">${character.name} </h5>
              <ul class="list-group list-group-flush">
              <li class="list-group-item">
    <span>Hero ID: ${character.id} 
        <button class="btn btn-danger infobtn" type="button" data-hero="${
          character.id
        }">
            <a id="favorite" href="#">Details</a>
         </button>
          </span>
          </li>

                <li class="list-group-item">Comics available: ${
                  character.comics.available
                } <a href="${character.urls[1].url}">click</a></li>
                <li class="list-group-item">Series available: ${
                  character.series.available
                }</li>
                <button class="btn btn-danger favbtn" type="button" data-hero="${
                  character.id
                }">
                  ${
                    favoriteHeroes.includes(heroId)
                      ? "REMOVE FROM FAVORITE"
                      : "ADD TO FAVORITE"
                  }
                </button>
              </ul>          
          </div>`;
    });

    

    document.getElementById("characters-container").innerHTML =
      charactersContainer;

    // Add event listener for each favorite button
    document.querySelectorAll(".favbtn").forEach((btn) => {
      btn.addEventListener("click", addToFavorite);
    });

    document.querySelectorAll(".infobtn").forEach((btn) => {
      btn.addEventListener("click", function() {
          const heroId = this.dataset.hero;
          localStorage.setItem("infoId", JSON.stringify(heroId));
          window.location.href = `about.html`;
      });
  });
  
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function addToFavorite() {
  const button = this;
  const heroId = button.dataset.hero;



  let favoriteHeroes = JSON.parse(localStorage.getItem("favoriteHeroes")) || [];

  const heroIndex = favoriteHeroes.indexOf(heroId);

  if (heroIndex === -1) {
    // Hero not in favorites, add it
    favoriteHeroes.push(heroId);
    button.innerText = "REMOVE FROM FAVORITE";
  } else {
    // Hero already in favorites, remove it
    favoriteHeroes.splice(heroIndex, 1);
    button.innerText = "ADD TO FAVORITE";
  }

  localStorage.setItem("favoriteHeroes", JSON.stringify(favoriteHeroes));
}

function showCharacterInfo() {
  const button = this;
  const infoid = button.getAttribute("info-id"); // Get the character ID from the button attribute

  // Redirect to the details page with the character ID as a query parameter
  window.location.href = `about.html?charId=${infoid}`;
}
