import { LocalStorageHandler } from "./LocalStorageHandler.js";
import { BookCart } from "./BookCart.js";
import { BookModal } from "./BookModal.js";

export class Card {

  constructor(divName) {
    this.divName = divName;
    this.bookSeenDiv = document.querySelector(".listBookSeen");
    this.bookCartDiv = document.querySelector(".divBookCart")
    this.containerDiv = document.querySelector(".containerCatalog");
    this.localStorageHandler = new LocalStorageHandler();
    this.bookModal = new BookModal();
  }

  Create = ({ json }) => {
    return `<div class="book" id="bookId"
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
    <button id="btnShowDetails">Ver más</button>
    <button id="btnAddToCart">Agregar al carrito</button>
  </div>
</div>`;
  }

  Append = (json, origin = "normal") => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.Create({ json });
    const card = wrapper.firstElementChild;
    card.dataset.origin = origin;
    card.dataset.title = json.title;
    this.divName.appendChild(card);
  };

  AssignEventHandler = () => {
    const cards = this.divName.querySelectorAll(".book");
    cards.forEach((card) => {
      if (card.dataset.eventsAttached === "true") return;
      const isHistorical = card.dataset.origin === "historical";
      this.AttachOriginalHandlers(card);
      if (isHistorical) { this.CreateDeleteButton(card); }
      card.dataset.eventsAttached = "true";
    });
  };

  AttachOriginalHandlers = (card) => {
    let json = {
      image: card.dataset.image,
      author: card.dataset.author,
      title: card.dataset.title,
      birthYear: card.dataset.birthyear ?? "desconocido",
      deathYear: card.dataset.deathYear ?? "desconocido",
      summary: card.dataset.summary,
      copyright: card.dataset.copyright,
      language: card.dataset.language,
      subjects: card.dataset.subjects,
      bookshelves: card.dataset.bookshelves
    };
    const btnShowDetails = card.querySelector("#btnShowDetails");
    const btnAddToCart = card.querySelector("#btnAddToCart");
    btnShowDetails.addEventListener("click", () => {
      let bookCard = this.bookSeenDiv.querySelector(`[data-title="${json.title}"]`);
      this.bookModal.Append(json);
      this.bookModal.AssignEventHandler();
      if (!bookCard) {
        let clonedCard = new Card(this.bookSeenDiv);
        clonedCard.Append(json, "historical");
        clonedCard.AssignEventHandler();
        const carrousel = document.querySelector(".carousel");
        if (carrousel.querySelector(".listBookSeen").childNodes.length > 0) {
          carrousel.removeAttribute("hidden");
        }
        this.localStorageHandler.AppendBookDataToStorage("historical", json);
      }
    });
    btnAddToCart.addEventListener("click", () => {
      this.localStorageHandler.AppendBookDataToStorage("cart", json);
      let array = this.localStorageHandler.GetStorage("cart");
      let bookCard = this.bookCartDiv.querySelector(`[data-title="${json.title}"]`);
      let cartCount = document.querySelector("#cart-count");
      if (!bookCard) {
        const bookCart = new BookCart(this.bookCartDiv);
        bookCart.Append(json, "cart");
        bookCart.AssignEventHandler();
      }
      cartCount.textContent = array.length;
    });
  };

  CreateDeleteButton = (card) => {
    const description = card.querySelector(".description");
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Eliminar";
    btnRemove.classList.add("btn-remove");
    btnRemove.style.backgroundImage=" #cc0000";
    description.appendChild(btnRemove);
    btnRemove.addEventListener("click", () => {
      card.remove();
      const carrousel = document.querySelector(".carousel");
      if (carrousel.querySelector(".listBookSeen").childNodes.length == 0) {
        carrousel.setAttribute("hidden", "");
      }
      this.localStorageHandler.DeleteBookDataFromStorage("historical", card.dataset.title);
    });
  };
}
// import { LocalStorageHandler } from "./LocalStorageHandler.js";
// import { BookCart } from "./BookCart.js";
// import { BookModal } from "./BookModal.js";

// export class Card {
//   constructor($divName) {
//     this.$divName = $divName; // ahora es un objeto jQuery
//     this.$bookSeenDiv = $(".listBookSeen");
//     this.$bookCartDiv = $(".divBookCart");
//     this.$containerDiv = $(".containerCatalog");
//     this.localStorageHandler = new LocalStorageHandler();
//     this.bookModal = new BookModal();
//   }

//   Create({ json }) {
//     return $(`
//       <div class="book"
//           data-image="${json.image}"
//           data-author="${json.author}"
//           data-title="${json.title}"
//           data-birthYear="${json.birthYear}"
//           data-deathYear="${json.deathYear}"
//           data-summary="${json.summary}"
//           data-copyright="${json.copyright}"
//           data-language="${json.language}"
//           data-subjects="${json.subjects}"
//           data-bookshelves="${json.bookshelves}">
//         <div class="cover">
//           <img class="bookImage" src="${json.image}"/>
//         </div>
//         <div class="description">
//           <p class="title">
//             ${json.title}<br/>
//             ${json.author}
//           </p>
//           <button class="btnShowDetails">Ver más</button>
//           <button class="btnAddToCart">Agregar al carrito</button>
//         </div>
//       </div>
//     `);
//   }

//   Append(json, origin = "normal") {
//     const $card = this.Create({ json });
//     $card.data("origin", origin);
//     $card.data("title", json.title);
//     this.$divName.append($card);
//   }

//   AssignEventHandler() {
//     const self = this;
//     this.$divName.find(".book").each(function () {
//       const $card = $(this);
//       if ($card.data("eventsAttached") === true) return;

//       const isHistorical = $card.data("origin") === "historical";
//       self.AttachOriginalHandlers($card);
//       if (isHistorical) self.CreateDeleteButton($card);

//       $card.data("eventsAttached", true);
//     });
//   }

//   AttachOriginalHandlers($card) {
//     const json = {
//       image: $card.data("image"),
//       author: $card.data("author"),
//       title: $card.data("title"),
//       birthYear: $card.data("birthyear") ?? "desconocido",
//       deathYear: $card.data("deathYear") ?? "desconocido",
//       summary: $card.data("summary"),
//       copyright: $card.data("copyright"),
//       language: $card.data("language"),
//       subjects: $card.data("subjects"),
//       bookshelves: $card.data("bookshelves"),
//     };

//     $card.find(".btnShowDetails").on("click", () => {
//       const $bookCard = this.$bookSeenDiv.find(`[data-title="${json.title}"]`);
//       this.bookModal.Append(json);
//       this.bookModal.AssignEventHandler();

//       if ($bookCard.length === 0) {
//         const clonedCard = new Card(this.$bookSeenDiv);
//         clonedCard.Append(json, "historical");
//         clonedCard.AssignEventHandler();

//         const $carousel = $(".carousel");
//         if ($carousel.find(".listBookSeen").children().length > 0) {
//           $carousel.removeAttr("hidden");
//         }
//         this.localStorageHandler.AppendBookDataToStorage("historical", json);
//       }
//     });

//     $card.find(".btnAddToCart").on("click", () => {
//       this.localStorageHandler.AppendBookDataToStorage("cart", json);
//       const array = this.localStorageHandler.GetStorage("cart");
//       const $bookCard = this.$bookCartDiv.find(`[data-title="${json.title}"]`);
//       const $cartCount = $("#cart-count");

//       if ($bookCard.length === 0) {
//         const bookCart = new BookCart(this.$bookCartDiv);
//         bookCart.Append(json, "cart");
//         bookCart.AssignEventHandler();
//       }
//       $cartCount.text(array.length);
//     });
//   }

//   CreateDeleteButton($card) {
//     const $btnRemove = $('<button class="btn-remove">Eliminar</button>');
//     $card.append($btnRemove);

//     $btnRemove.on("click", () => {
//       $card.remove();
//       const $carousel = $(".carousel");
//       if ($carousel.find(".listBookSeen").children().length === 0) {
//         $carousel.attr("hidden", "");
//       }
//       this.localStorageHandler.DeleteBookDataFromStorage("historical", $card.data("title"));
//     });
//   }
// }
