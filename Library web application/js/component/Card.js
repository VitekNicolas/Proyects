import { LocalStorageHandler } from "./LocalStorageHandler.js";
import { BookCart } from "./BookCart.js";
import { BookDescription } from "./BookDescription.js";

export class Card {
  constructor($divName) {
    this.$divName = $divName;
    this.$bookSeenDiv = $(".listBookSeen");
    this.$bookCartDiv = $(".divBookCart");
    this.$containerDiv = $(".containerCatalog");
    this.$bookDescriptionDiv = $(".containerBookDescription");
    this.localStorageHandler = new LocalStorageHandler();
    this.bookDescription = new BookDescription(this.$bookDescriptionDiv);
  }

  Create(json) {
    const $card = $(`
    <div class="book"
        data-image="${this.Escape(json.image)}"
        data-author="${this.Escape(json.author)}"
        data-title="${this.Escape(json.title)}"
        data-birthYear="${this.Escape(json.birthYear)}"
        data-deathYear="${this.Escape(json.deathYear)}"
        data-summaries="${this.Escape(json.summaries)}"
        data-copyright="${this.Escape(json.copyright)}"
        data-language="${this.Escape(json.language)}"
        data-subjects="${this.Escape(json.subjects)}"
        data-bookshelves="${this.Escape(json.bookshelves)}">
      <div class="coverImage">
        <img class="bookImage" src="${this.Escape(json.image)}"/>
      </div>
      <div class="bookCardDescription">
        <p class="title"></p>
        <button class="btnShowDetails">Ver más</button>
        <button class="btnAddToCart">Agregar al carrito</button>
      </div>
    </div>
  `);
    $card.find(".title").text(`${json.title} - ${json.author}`);
    return $card;
  }

  Escape(value) {
    return $("<div>").text(value ?? "").html();
  }

  Append(json, origin = "normal") {
    this.localStorageHandler.IndexBook(json);
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
      summaries: $card.data("summaries"),
      copyright: $card.data("copyright"),
      language: $card.data("language"),
      subjects: $card.data("subjects"),
      bookshelves: $card.data("bookshelves"),
    };

    $card.find(".btnShowDetails").on("click", () => {
      const $bookCard = this.$bookSeenDiv.find(`[data-title="${json.title}"]`);
      this.bookDescription.Append(json);
      this.$bookDescriptionDiv.removeAttr("hidden");
      this.$containerDiv.prop("hidden", true)
      if ($bookCard.length === 0) {
        const clonedCard = new Card(this.$bookSeenDiv);
        clonedCard.Append(json, "historical");
        clonedCard.AssignEventHandler();
        const $carousel = $(".carousel");
        if ($carousel.find(".listBookSeen").children().length > 0) {
          $carousel.removeAttr("hidden");
        }
        this.localStorageHandler.AppendBookReferenceToStorage("historical", json);      }
    });
    $card.find(".btnAddToCart").on("click", () => {
      this.localStorageHandler.AppendBookReferenceToStorage("cart", json);
      const array = this.localStorageHandler.GetStorage("cart");
      const $bookCard = this.$bookCartDiv.find(`[data-title="${json.title}"]`);
      const $cartCount = $(".bookCartCount");
      if ($bookCard.length === 0) {
        const bookCart = new BookCart(this.$bookCartDiv);
        bookCart.Append(json, "cart");
        bookCart.AssignEventHandler();
      }
      $cartCount.text(array.length);
    });
  }

  CreateDeleteButton($card) {
    const $btnRemove = $('<button class="btnRemoveBookCard">Eliminar</button>');
    const $bookCardDescription = $card.find(".bookCardDescription")
    $bookCardDescription.append($btnRemove);
    $btnRemove.on("click", () => {
      $card.remove();
      const $carousel = $(".carousel");
      if ($carousel.find(".listBookSeen").children().length === 0) {
        $carousel.attr("hidden", "");
      }
      this.localStorageHandler.DeleteBookReferenceFromStorage("historical", $card.data("title"));
    });
  }
}
