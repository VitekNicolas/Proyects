import { Render } from "../module/Render.js";

export class PaginationHandler {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 5;
    this.render = new Render();
    this.$divname = $(".divPagination");
  }

  LoadPage(pageNumber) {
    this.currentPage = pageNumber;
    const itemsPerPage = 10;
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;
    this.render.RenderCard(start, end);
    $("html, body").animate({ scrollTop: 0 }, "smooth");
    this.$divname.find("a").removeClass("active");
    this.$divname.find(`a[data-page='${pageNumber}']`).addClass("active");
  }

  ChangePage() {
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