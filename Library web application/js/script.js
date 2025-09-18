import { CatalogPageHandler } from "./module/CatalogPageHandler.js";
import { HomePageHandler } from "./module/HomePageHandler.js";

$(document).ready(async function () {
  const $liCatalogPage = $("#liCatalogPage");
  const catalogPageHandler = new CatalogPageHandler($liCatalogPage[0]);
  const $liHomePage = $("#liHomePage");
  const homePageHandler = new HomePageHandler($liHomePage[0]);

  // HomePage
  homePageHandler.AddEventHandler();
  // CatalogPage
  catalogPageHandler.AddEventHandler();
});
