export class BookDescription {

  constructor($divName) {
    this.$divName = $divName;
  }

  Create(json) {
    return $(` 
      <div class="bookDescription">
        <div class="bookDescriptionImage" aria-hidden="true">
          <img
            src="${json.image}"
          />
        </div>
        <section class="bookDetails">
          <h1 class="hBookDescriptionTitle">${json.title}</h1>
          <div class="bookDescriptionDetailsContainer">
            <div class="bookDescriptionDetailsTitle">
              <span>Descripcion:</span>
            </div>
            <ul class="ulBookDescriptionDetails">
              <li><strong>Título del libro: </strong>${json.title}</li>
              <li><strong>Autor: </strong>${json.author}</li>
              <li><strong>Vivió entre: </strong>${json.birthYear} y ${json.deathYear}</li>
              <li><strong>Derechos de autor: </strong>${json.copyright}</li>
              <li><strong>Idioma: </strong>${json.language}</li>
              <li><strong>Temas: </strong>${json.subjects}</li>
              <li><strong>Categorias: </strong>${json.bookshelves}</li>
              <li><strong>Resumen: </strong>${json.summary}</li>
            </ul>
          </div>
        </section>
      </div>
  `)
  }

  Append(json) {
    this.$divName.empty();
    const $card = this.Create(json);
    this.$divName.append($card);
  }
}