import { Render } from "../module/Render.js";

export class PaginationHandler {

    constructor() {
        this.currentPage = 1;
        this.totalPages = 5;
        this.render = new Render();
    }

    loadPage = (pageNumber) => {
        console.log("Cargando página", pageNumber);
        this.currentPage = pageNumber;
    }
    ChangePage = () => {
        const links = document.querySelectorAll(".pagination a");
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                let newPage;
                if (page === "next") {
                    if (this.currentPage >= this.totalPages) return;
                    newPage = this.currentPage + 1;
                }
                else if (page === "back") {
                    if (this.currentPage <= 1) return;
                    newPage = this.currentPage - 1;
                } else {
                    newPage = parseInt(page);
                }
                if (newPage === this.currentPage) return;

                this.loadPage(newPage);
                if (newPage == 1) {
                    this.render.RenderCard(0, 9);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (newPage == 2) {
                    this.render.RenderCard(10, 19);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (newPage == 3) {
                    this.render.RenderCard(20, 29);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (newPage == 4) {
                    this.render.RenderCard(30, 39);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (newPage == 5) {
                    this.render.RenderCard(40, 49);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                links.forEach(a => a.classList.remove("active"));
                const activeLink = document.querySelector(`.pagination a[data-page="${newPage}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            });
        });
    }
}
