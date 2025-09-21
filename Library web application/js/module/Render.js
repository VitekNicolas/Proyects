import { Card } from "../component/Card.js";
import { Fetch } from "../component/Fetch.js";
import { BookData } from "../component/BookData.js";
import { BookCart } from "../component/BookCart.js";
import { LocalStorageHandler } from "../component/LocalStorageHandler.js";

export class Render {

  constructor() {
    this.localStorageHandler = new LocalStorageHandler();
    this.fetch = new Fetch();
    this.cardsDivCatalog = document.querySelector(".containerCatalog .cardsDiv");
    this.cardsDivHome = document.querySelector(".containerHome .cardsDiv");
  }

  RenderCard = (indexMin, indexMax) => {
    this.cardsDivCatalog.innerHTML = "";
    this.cardsDivCatalog.innerHTML = `<h2 class="titleHome">Catalogo de libros</h2>`;
    const card = new Card(this.cardsDivCatalog);
    const bookshelve = this.localStorageHandler.GetStorage("bookshelve");
    for (let index = indexMin; index <= indexMax; index++) {
      card.Append(bookshelve[index])
    }
    card.AssignEventHandler();
  };

  RenderPopularBookCard = () => {
    this.cardsDivHome.innerHTML = "";
    this.cardsDivHome.innerHTML = `<h2 class="titleHome">Libros populares</h2>`;
    const card = new Card(this.cardsDivHome);
    const popularBooks = this.localStorageHandler.GetStorage("popular");
    popularBooks.forEach(book => {
      card.Append(book);
    });
    const cards = this.cardsDivHome.querySelectorAll(".book");
    cards.forEach((card) => {
      let description = card.querySelector(".description");
      description.hidden = true;
      card.style.height = "390px";
    });
  };

  RenderBookInStorage = (storage, divName) => {
    const array = this.localStorageHandler.GetStorage(storage);
    const div = document.querySelector(divName);
    div.innerHTML = "";
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
  };

  RenderBooksFiltered = async (fetchMethod, ...args) => {
    this.cardsDivCatalog.innerHTML = "";
    let card = new Card(this.cardsDivCatalog);
    const books = await fetchMethod.apply(this.fetch, args);
    const results = books.results.slice(0, 10);
    results.forEach(book => {
      const bookData = new BookData(book);
      card.Append(bookData);
    });
    card.AssignEventHandler();
  };

  RenderBooksFilteredByYears = (minYear, maxYear) => {
    return this.RenderBooksFiltered(this.fetch.GetBooksByYears, minYear, maxYear);
  };

  RenderBooksFilteredByAuthorName = (authorName) => {
    return this.RenderBooksFiltered(this.fetch.GetBooksByAuthorName, authorName);
  };

  RenderBooksFilteredByTopic = (topic) => {
    return this.RenderBooksFiltered(this.fetch.GetBooksByTopic, topic);
  };

  RenderBooksFilteredByCopyrights = (valor) => {
    return this.RenderBooksFiltered(this.fetch.GetBookByCopyright, valor);
  };

  RenderBooksFilteredByLanguage = (language) => {
    return this.RenderBooksFiltered(this.fetch.GetBookByLanguage, language);
  };
};