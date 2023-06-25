// VARIABLES *****************

const btnDesayunos = document.querySelector("#Breakfast");
const btnPostres = document.querySelector("#Dessert");
const btnPastas = document.querySelector("#Pasta");
const btnCarnes = document.querySelector("#Beef");
const divResults = document.querySelector(".results");

// EVENTOS *****************

const links = document.querySelectorAll(".links");

links.forEach((linkElement) =>
  linkElement.addEventListener("click", () => buscarlosEnApi(linkElement.id))
);

// FUNCIONES *****************

async function buscarlosEnApi(id) {
  activarCurrentLink(id);

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const meal = data.meals;
    mostrarEnHtml(meal);
  } catch (error) {
    console.log(error);
  }
}

// F1 --------------------------

function mostrarEnHtml(comidas) {
  limpiarHtml(divResults);

  comidas.forEach((elemntoComida) => {
    const { idMeal, strMeal, strMealThumb } = elemntoComida;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${strMealThumb}" class="imagecard"></img>
      <div class="cardInfo">
        <p class="mealName">${strMeal}</p>
        <hr>
        <p class="mealPrice">  <span class="valor">price &dollar; </span>${idMeal}</p>
      </div>
      `;
    divResults.appendChild(card);
  });
}

// F2 --------------------------

function limpiarHtml(referencia) {
  while (referencia.firstChild) {
    referencia.removeChild(referencia.firstChild);
  }
}

// F ---------------------------

function activarCurrentLink(id) {
  for (let i = 0; i < links.length; i++) {
    if (links[i].id === id) {
      links[i].classList.add("linkActive");
    } else {
      links[i].classList.remove("linkActive");
    }
  }
}
