import { Render } from "../module/Render.js";

export class PaginationHandler {

    constructor() {
        this.currentPage = 1;
        this.totalPages = 5;
        this.render = new Render();
    }

    loadPage = (pageNumber) => {
        this.currentPage = pageNumber;
        const itemsPerPage = 10;
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage - 1;
        this.render.RenderCard(start, end);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const links = document.querySelectorAll(".pagination a");
        links.forEach(a => a.classList.remove("active"));
        const activeLink = document.querySelector(`.pagination a[data-page="${pageNumber}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    };

    ChangePage = () => {
        const links = document.querySelectorAll(".pagination a");
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("Click en:", link.dataset.page);
                const page = link.dataset.page;
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
                this.loadPage(newPage);
                this.render.RenderCard((newPage - 1) * 10, newPage * 10 - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    };
}