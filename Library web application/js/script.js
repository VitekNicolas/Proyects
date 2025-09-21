import { CatalogPageHandler } from "./module/CatalogPageHandler.js";
import { HomePageHandler } from "./module/HomePageHandler.js";
import { FormPageHandler } from "./module/FormPageHandler.js";

$(document).ready(async function () {
  sessionStorage.setItem("currentPage", "home");
  const homePageHandler = new HomePageHandler();
  const catalogPageHandler = new CatalogPageHandler();
  const formPageHandler = new FormPageHandler();
  // HomePage
  homePageHandler.ShowPage();
  homePageHandler.AddEventHandler();
  // CatalogPage
  catalogPageHandler.ShowPage();
  catalogPageHandler.AddEventHandler();
  // FormPage
  formPageHandler.ShowPage();
  formPageHandler.AddEventHandler();
});
