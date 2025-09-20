export class BookModal {
    Create = (json) => {
        return `
            <div class="bookModal">
                <div class="modal-content">
                    <span class="btnCloseModal">&times;</span>
                    <p class="bookTitle">Título del libro: ${json.title}</p>
                    <p class="bookAuthor">Autor: ${json.author}</p>
                    <p class="bookDetails">
                        Vivió entre: ${json.birthYear} y ${json.deathYear}<br>
                        Resumen: ${json.summary}<br>
                        Derechos de autor: ${json.copyright}<br>
                        Idioma: ${json.language}<br>
                        Temas: ${json.subjects}<br>
                        Categorías: ${json.bookshelves}<br>
                    </p>
                </div>
            </div>
        `;
    }

    Append = (json) => {
        $("body").append(this.Create(json));
    }

    AssignEventHandler = () => {
        $(document).on("click", ".btnCloseModal", () => {
            $(".bookModal").remove();
        });
    }
}
