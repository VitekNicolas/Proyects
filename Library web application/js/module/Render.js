import { Card } from "../component/Card.js";
import { Fetch } from "../component/Fetch.js";
import { BookData } from "../component/BookData.js";
import { BookCart } from "../component/BookCart.js";
import { LocalStorageHandler } from "../component/LocalStorageHandler.js";

export class Render {

  constructor() {
    this.localStorageHandler = new LocalStorageHandler();
  }
  //Takes the array of books. Catch the first and only element
  //because in this case is searching by id, transforms to 
  //BookData and create a card with this last one. 
  RenderCard = async (indexMin, indexMax) => {
    const cardDiv = document.querySelector(".cardsDiv");
    cardDiv.innerHTML = "";
    let card = new Card(cardDiv);
    let bookshelve = this.localStorageHandler.GetStorage("bookshelve");
    for (let index = indexMin; index <= indexMax; index++) {
      card.Append(bookshelve[index])
    }
    card.AssignEventHandler();
  };

  RenderBookInStorage = (storage, divName) => {
    const array = this.localStorageHandler.GetStorage(storage);
    const div = document.querySelector(divName);
    let card;
    if (storage === "historical") {
      card = new Card(div);
    } else if (storage === "cart") {
      this.CheckCarousel();
      card = new BookCart(div);
      let cartCount = document.querySelector("#cart-count");
      cartCount.textContent = array.length;
    }
    for (let index = 0; index < array.length; index++) {
      card.Append(array[index], storage);
    }
    card.AssignEventHandler();
  };

  //To avoid duplicate cards
  CheckCarousel = () => {
    const carrousel = document.querySelector(".carousel");
    if (carrousel.querySelector(".listBookSeen").childNodes.length > 0) {
      carrousel.removeAttribute("hidden");
    }
  }

  RenderBooksFilteredByYears = async (minYear, maxYear) => {
    const cardDiv = document.querySelector(".cardsDiv");
    cardDiv.innerHTML = "";
    let card = new Card(cardDiv);
    var fetch = new Fetch();
    const books = await fetch.GetBooksByYears(minYear, maxYear);
    for (let i = 0; i < 10; i++) {
      const bookData = new BookData(books.results[i]);
      card.Append(bookData);
    }
    card.AssignEventHandler();
  }
};