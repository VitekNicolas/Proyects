import { LocalStorageHandler } from "./LocalStorageHandler.js";
import { BookCart } from "./BookCart.js";

export class Card {

  constructor(divName) {
    this.divName = divName;
    this.bookSeenDiv = document.querySelector(".listBookSeen");
    this.bookCartDiv = document.querySelector(".divBookCart")
    this.localStorageHandler = new LocalStorageHandler();
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
    <div class="divBookDetails">
      <p class="bookTitle">Título del libro: ${json.title}</p>
      <p class="bookAuthor">Autor: ${json.author}</p>
      <p class="bookDetails">
        Vivió entre: ${json.birthYear} y ${json.deathYear}<br>
        Resumen: ${json.summary}<br>
        Derechos de autor: ${json.copyright}<br>
        Idioma: ${json.language}<br>
        Temas: ${json.subjects}<br>
        Categorías: ${json.bookshelves}<br>
      </p>
    </div>
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
      birthYear: card.dataset.birthyear,
      deathYear: card.dataset.deathYear,
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
      card.classList.toggle("show-info");
      btnShowDetails.classList.toggle("active");
      const isExpanded = card.classList.contains("show-info");
      btnShowDetails.textContent = isExpanded ? "Ver menos" : "Ver más";
      if (isExpanded && !bookCard) {
        let clonedCard = new Card(this.bookSeenDiv)
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
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Eliminar";
    btnRemove.classList.add("btn-remove");
    card.appendChild(btnRemove);
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