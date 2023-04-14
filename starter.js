const cardsArray = [
   {
      name: "fire",
      img: "img/fire.png",
   },
   {
      name: "youtube",
      img: "img/youtube.png",
   },
   {
      name: "flash",
      img: "img/flash.png",
   },
   {
      name: "gift",
      img: "img/gift.png",
   },
   {
      name: "tron",
      img: "img/tron.png",
   },
   {
      name: "ufo",
      img: "img/ufo.png",
   },
   {
      name: "plant",
      img: "img/plant.png",
   },
   {
      name: "burger",
      img: "img/burger.png",
   },
];

const grid = document.querySelector(".grid");
let count = 0;
let previousCards;
let firstGuess = "";
let secondGuess = "";
const delay = 500;

// .sort(() => 0.5 - Math.random()): random array
function generateCard() {
   // reset inner html
   grid.innerHTML = "";
   const cardsArrayMerge = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
   cardsArrayMerge.forEach((item) => {
      const card = document.createElement("div");
      card.classList = "card";
      card.setAttribute("data-name", item.name);
      // Front card
      const front = document.createElement("div");
      front.classList.add("front");
      // Back card
      const back = document.createElement("div");
      back.classList.add("front");
      // card.dataset.name = item.name;
      card.style.backgroundImage = `url(${item.img}) `;
      card.style.cursor = "pointer";
      card.appendChild(front);
      card.appendChild(back);
      grid.appendChild(card);
   });
}

generateCard();

function matchingCard() {
   const selects = document.querySelectorAll(".selected");
   [...selects].forEach((item) => item.classList.add("matched"));
}

function resetGuess() {
   count = 0;
   firstGuess = "";
   secondGuess = "";
   previousCards = null;
   const selects = document.querySelectorAll(".selected");
   const matchedAll = document.querySelectorAll(".matched");
   const cardLenght = document.querySelectorAll(".card").length;
   [...selects].forEach((item) => item.classList.remove("selected"));
   if (matchedAll.length === cardLenght) {
      // done game -> reset game
      setTimeout(matchedAll.forEach((el) => el.classList.remove("matched")), delay);
      setTimeout(generateCard, delay);
   }
}

grid.addEventListener("click", function (e) {
   const clicked = e.target;

   if (clicked.nodeName === "SECTION" || previousCards === clicked || clicked.parentNode.classList.contains("selected") || clicked.parentNode.classList.contains("matched")) {
      return;
   }

   if (count < 2) {
      count++;

      if (count === 1) {
         firstGuess = clicked.parentNode.dataset.name;
         clicked.parentNode.classList.add("selected");
      } else {
         secondGuess = clicked.parentNode.dataset.name;
         clicked.parentNode.classList.add("selected");
      }

      if (firstGuess && secondGuess) {

         if (firstGuess === secondGuess) {
            // handle match here
            setTimeout(matchingCard, delay);
         }
         setTimeout(resetGuess, delay);

      }

      previousCards = clicked;
   }

});
// 274