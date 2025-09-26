import { BasePageHandler } from "./BasePageHandler.js";

export class HomePageHandler extends BasePageHandler {
  constructor() {
    super();
    this.$liHomePage = $("#liHomePage"); // con jQuery
    this.localStorageHandler.CreateStorageForBooks("popular");
    this.localStorageHandler.FillPopular();
  }

  ShowPage = () => {
    this.$liHomePage.on("click", () => {
      sessionStorage.setItem("currentPage", "home");
      this.DisplayContainer([this.containerHome]);
    });
  };

  ShowPageAfterForm = () => {
    sessionStorage.setItem("currentPage", "home");
    this.DisplayContainer([this.containerHome]);
    this.render.RenderPopularBookCard();
  };

  AddEventHandler = () => {
    this.render.RenderPopularBookCard();
  };
}
