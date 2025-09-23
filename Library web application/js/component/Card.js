import { LocalStorageHandler } from "./LocalStorageHandler.js";
import { BookCart } from "./BookCart.js";
import { BookModal } from "./BookModal.js";

export class Card {
  constructor($divName) {
    this.$divName = $divName; // ahora es un objeto jQuery
    this.$bookSeenDiv = $(".listBookSeen");
    this.$bookCartDiv = $(".divBookCart");
    this.$containerDiv = $(".containerCatalog");
    this.localStorageHandler = new LocalStorageHandler();
    this.bookModal = new BookModal();
  }

  Create(json) {
    return $(` 
    <div class="book"
        data-image="${json.image}"
        data-author="${json.author}"
        data-title="${json.title}"
        data-birthYear="${json.birthYear}"
        data-deathYear="${json.deathYear}"
        data-summary="${json.summary}"
        data-copyright="${json.copyright}"
        data-language="${json.language}"
        data-subjects="${json.subjects}"
        data-bookshelves="${json.bookshelves}">
      <div class="cover">
        <img class="bookImage" src="${json.image}"/>
      </div>
      <div class="description">
        <p class="title">
          ${json.title}<br/>
          ${json.author}
        </p>
        <button class="btnShowDetails">Ver más</button>
        <button class="btnAddToCart">Agregar al carrito</button>
      </div>
    </div>
  `);
  }

  Append(json, origin = "normal") {
    const $card = this.Create(json);
    $card.data("origin", origin);
    $card.data("title", json.title);
    this.$divName.append($card);
  }

  AssignEventHandler() {
    const self = this;
    this.$divName.find(".book").each(function () {
      const $card = $(this);
      if ($card.data("eventsAttached") === true) return;

      const isHistorical = $card.data("origin") === "historical";
      self.AttachOriginalHandlers($card);
      if (isHistorical) self.CreateDeleteButton($card);

      $card.data("eventsAttached", true);
    });
  }

  AttachOriginalHandlers($card) {
    const json = {
      image: $card.data("image"),
      author: $card.data("author"),
      title: $card.data("title"),
      birthYear: $card.data("birthyear") ?? "desconocido",
      deathYear: $card.data("deathYear") ?? "desconocido",
      summary: $card.data("summary"),
      copyright: $card.data("copyright"),
      language: $card.data("language"),
      subjects: $card.data("subjects"),
      bookshelves: $card.data("bookshelves"),
    };

    $card.find(".btnShowDetails").on("click", () => {
      const $bookCard = this.$bookSeenDiv.find(`[data-title="${json.title}"]`);
      this.bookModal.Append(json);
      this.bookModal.AssignEventHandler();

      if ($bookCard.length === 0) {
        const clonedCard = new Card(this.$bookSeenDiv);
        clonedCard.Append(json, "historical");
        clonedCard.AssignEventHandler();

        const $carousel = $(".carousel");
        if ($carousel.find(".listBookSeen").children().length > 0) {
          $carousel.removeAttr("hidden");
        }
        this.localStorageHandler.AppendBookDataToStorage("historical", json);
      }
    });

    $card.find(".btnAddToCart").on("click", () => {
      this.localStorageHandler.AppendBookDataToStorage("cart", json);
      const array = this.localStorageHandler.GetStorage("cart");
      const $bookCard = this.$bookCartDiv.find(`[data-title="${json.title}"]`);
      const $cartCount = $("#cart-count");

      if ($bookCard.length === 0) {
        const bookCart = new BookCart(this.$bookCartDiv);
        bookCart.Append(json, "cart");
        bookCart.AssignEventHandler();
      }
      $cartCount.text(array.length);
    });
  }

  CreateDeleteButton($card) {
    const $btnRemove = $('<button class="btn-remove">Eliminar</button>');
    const $description= $card.find(".description")
     $description.append($btnRemove);
    $btnRemove.on("click", () => {
      $card.remove();
      const $carousel = $(".carousel");
      if ($carousel.find(".listBookSeen").children().length === 0) {
        $carousel.attr("hidden", "");
      }
      this.localStorageHandler.DeleteBookDataFromStorage("historical", $card.data("title"));
    });
  }
}
