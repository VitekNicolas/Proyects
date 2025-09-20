import { CatalogPageHandler } from "./module/CatalogPageHandler.js";
import { HomePageHandler } from "./module/HomePageHandler.js";
import { FormPageHandler } from "./module/FormPageHandler.js";

$(document).ready(async function () {
  sessionStorage.setItem("currentPage", "home");
  const homePageHandler = new HomePageHandler();
  homePageHandler.AddEventHandler();
  const catalogPageHandler = new CatalogPageHandler();
  const formPageHandler = new FormPageHandler();
  // HomePage
  homePageHandler.ShowPage();
  // CatalogPage
  catalogPageHandler.ShowPage();
  catalogPageHandler.AddEventHandler();
  // FormPage
  formPageHandler.ShowPage();
});
