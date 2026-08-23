import { Render } from "../module/Render.js";
import { LocalStorageHandler } from "./LocalStorageHandler.js";

export class PaginationHandler {
  constructor() {
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.render = new Render();
    this.localStorageHandler = new LocalStorageHandler();
    this.$divname = $(".divPagination");
    this.$pageNumbers = this.$divname.find(".pageNumbers");
  }

  GetTotalPages() {
    const bookshelve = this.localStorageHandler.GetStorage("bookshelve") || [];
    return Math.max(1, Math.ceil(bookshelve.length / this.itemsPerPage));
  }

  RenderPageNumbers() {
    this.totalPages = this.GetTotalPages();
    this.$pageNumbers.empty();
    for (let i = 1; i <= this.totalPages; i++) {
      const $link = $(`<a href="#" data-page="${i}">${i}</a>`);
      if (i === this.currentPage) $link.addClass("active");
      this.$pageNumbers.append($link);
    }
  }

  LoadPage(pageNumber) {
    this.currentPage = pageNumber;
    const start = (pageNumber - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage - 1;
    this.render.RenderCard(start, end);
    $("html, body").animate({ scrollTop: 0 }, "smooth");
    this.RenderPageNumbers();
  }

  ChangePage() {
    this.RenderPageNumbers();
    this.$divname.on("click", "a", (e) => {
      e.preventDefault();
      const page = $(e.currentTarget).data("page");
      let newPage = this.currentPage;
      if (page === "next") {
        if (this.currentPage < this.totalPages) {
          newPage = this.currentPage + 1;
        }
      } else if (page === "back") {
        if (this.currentPage > 1) {
          newPage = this.currentPage - 1;
        }
      } else {
        newPage = parseInt(page);
      }
      if (newPage === this.currentPage || isNaN(newPage)) return;
      this.LoadPage(newPage);
    });
  }

  ChangePaginationAtributtes(pointerEvent, color, textDecoration) {
    this.$divname.find("a").css({
      "pointer-events": pointerEvent,
      "color": color,
      "text-decoration": textDecoration
    });
  }
}