export class bookModal {

    Create = (json) => {
        return `<div class="bookModal">
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
            </div>`
    }

    Append = (json) => {
        const div = document.createElement("div")
        div.innerHTML = this.Create(json)
        document.body.appendChild(div);
    }

    AssignEventHandler = () => {
        const btnCloseModal = document.querySelector(".btnCloseModal");
        btnCloseModal.addEventListener("click", () => {
            const bookModal = document.querySelector(".bookModal");
            bookModal.remove();
        });
    }
}