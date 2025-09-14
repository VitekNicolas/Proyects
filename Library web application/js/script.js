import { Render } from "./module/Render.js";
import { SearchFilters } from "./component/SearchFilters.js";
import { LocalStorageHandler } from "./component/LocalStorageHandler.js";
import { PaginationHandler } from "./component/PaginationHandler.js";
import { BookCart } from "./component/BookCart.js";

document.addEventListener("DOMContentLoaded", async function () {
  document.querySelector(".cardsDiv").innerHTML = "";
  const render = new Render();
  const divFilterYears = document.querySelector(".divFilterYears")
  const searchFilters = new SearchFilters(divFilterYears);
  const bookCart = new BookCart();
  const divBookCart = document.querySelector(".divBookCart")
  searchFilters.AddBeheaviorToBtnSearchByYears();
  searchFilters.AddEventListenerToBtnSearchByYears();
  const handler = new LocalStorageHandler();
  handler.CreateStorageForBooks("bookshelve");
  handler.CreateStorageForBooks("cart");
  handler.CreateStorageForBooks("historical");
  render.CheckCarousel();
  render.RenderBookInStorage("historical", ".listBookSeen")
  render.RenderBookInStorage("cart", ".divBookCart")
  //handler.FillBookshelve();
  const pHandler = new PaginationHandler();
  pHandler.loadPage(1);
  pHandler.ChangePage();
  bookCart.AssignEventHandlerContainer(divBookCart);
});