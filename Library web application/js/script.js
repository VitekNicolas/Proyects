import { CatalogPageHandler } from "./module/CatalogPageHandler.js";
import { HomePageHandler } from "./module/HomePageHandler.js";
import { FormPageHandler } from "./module/FormPageHandler.js";

$(document).ready(async function () {
  const $liCatalogPage = $("#liCatalogPage");
  const catalogPageHandler = new CatalogPageHandler($liCatalogPage[0]);
  const $liHomePage = $("#liHomePage");
  const homePageHandler = new HomePageHandler($liHomePage[0]);
  const $liFormPage = $("#liFormPage");
  const formPageHandler = new FormPageHandler($liFormPage[0]);
  // HomePage
  homePageHandler.ShowPage();
  // CatalogPage
  catalogPageHandler.ShowPage();
  // FormPage
  formPageHandler.ShowPage();
});
