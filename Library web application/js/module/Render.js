import { Card } from "../component/Card.js";
import { Fetch } from "../component/Fetch.js";
import { BookData } from "../component/BookData.js";
import { BookCart } from "../component/BookCart.js";
import { LocalStorageHandler } from "../component/LocalStorageHandler.js";

export class Render {
  constructor() {
    this.localStorageHandler = new LocalStorageHandler();
    this.fetch = new Fetch();
    this.$cardsDivCatalog = $(".containerCatalog .cardsDiv");
    this.$cardsDivHome = $(".containerHome .cardsDiv");
  }

  RenderCard = (indexMin, indexMax) => {
    this.$cardsDivCatalog.html(`<h2 class="titleHome">Catalogo de libros</h2>`);
    const card = new Card(this.$cardsDivCatalog);
    const bookshelve = this.localStorageHandler.GetStorage("bookshelve");
    for (let index = indexMin; index <= indexMax; index++) {
      if (bookshelve[index]) {
        card.Append(bookshelve[index]);
      }
    }
    card.AssignEventHandler();
  };

  RenderPopularBookCard = () => {
    this.$cardsDivHome.html(`<h2 class="titleHome">Libros populares</h2>`);
    const card = new Card(this.$cardsDivHome);
    const popularBooks = this.localStorageHandler.GetStorage("popular");
    popularBooks.forEach(book => {
      card.Append(book);
    });

    this.$cardsDivHome.find(".book").each((_, el) => {
      const $el = $(el);
      $el.find(".bookCardDescription").prop("hidden", true);
      $el.css("height", "390px");
    });
    card.AssignEventHandler();
  };

  RenderBookInStorage = (storage, divName) => {
    const array = (storage === "historical" || storage === "cart")
      ? this.localStorageHandler.GetResolvedStorage(storage)
      : this.localStorageHandler.GetStorage(storage);
    const $div = $(divName).empty();
    let card;
    if (storage === "historical") {
      card = new Card($div);
    } else if (storage === "cart") {
      this.CheckCarousel();
      card = new BookCart($div);
      $(".bookCartCount").text(array.length);
    }
    array.forEach(item => {
      card.Append(item, storage);
    });
    card.AssignEventHandler();
  };

  // Evitar duplicados
  CheckCarousel = () => {
    const $carousel = $(".carousel");
    if ($carousel.find(".listBookSeen").children().length > 0) {
      $carousel.removeAttr("hidden");
    }
  };

  RenderBooksFiltered = async (fetchMethod, ...args) => {
    this.$cardsDivCatalog.empty();
    this.ShowLoading(this.$cardsDivCatalog);
    const books = await fetchMethod.apply(this.fetch, args);
    this.$cardsDivCatalog.empty();
    if (!books) {
      this.ShowMessage(this.$cardsDivCatalog, "Ocurrió un error al buscar los libros. Intentá nuevamente.");
      return;
    }
    if (!books.results || books.results.length === 0) {
      this.ShowMessage(this.$cardsDivCatalog, "No se encontraron libros para esa búsqueda.");
      return;
    }
    const card = new Card(this.$cardsDivCatalog);
    books.results.slice(0, 10).forEach(book => {
      const bookData = new BookData(book);
      card.Append(bookData);
    });
    card.AssignEventHandler();
  };
  ShowLoading = ($div) => {
    $div.html(`<p class="stateMessage stateMessage--loading">Buscando libros...</p>`);
  };
  ShowMessage = ($div, text) => {
    $div.html(`<p class="stateMessage"></p>`);
    $div.find(".stateMessage").text(text);
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
}
