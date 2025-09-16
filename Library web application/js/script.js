import { Render } from "./module/Render.js";
import { SearchFilters } from "./component/SearchFilters.js";
import { LocalStorageHandler } from "./component/LocalStorageHandler.js";
import { PaginationHandler } from "./component/PaginationHandler.js";
import { BookCart } from "./component/BookCart.js";

$(document).ready(async function () {
  $(".cardsDiv").html(""); 
  const render = new Render();
  const $divFilterYears = $(".aside");
  const searchFilters = new SearchFilters($divFilterYears[0]); 
  const bookCart = new BookCart();
  const $divBookCart = $(".divBookCart");
  const handler = new LocalStorageHandler();
  const pHandler = new PaginationHandler();
  // Filtros
  // searchFilters.AddBeheaviorToBtnSearchByYears();
  searchFilters.AddEventListenerToBtnSearchByYears();
  searchFilters.AddEventListenerBtnReset();
  searchFilters.AddEventListenerToBtnSearchByAuthorName();
  searchFilters.AddEventListenerToBtnSearchByTopic();
  searchFilters.AddEventListenerToInpCopyright();
  searchFilters.AddEventListenerToInpLanguage();
  searchFilters.AddEventListenerBtnSubmit();
  searchFilters.AddBehaviorToAside();
  // Storages
  handler.CreateStorageForBooks("bookshelve");
  handler.CreateStorageForBooks("cart");
  handler.CreateStorageForBooks("historical");
  // Render
  render.CheckCarousel();
  render.RenderBookInStorage("historical", ".listBookSeen");
  render.RenderBookInStorage("cart", ".divBookCart");
  // Pagination
  pHandler.LoadPage(1);
  pHandler.ChangePage();
  // BookCart
  bookCart.AssignEventHandlerContainer($divBookCart[0]); 
});
