export class BookDescription {

  constructor($divName) {
    this.$divName = $divName;
  }

  Create(json) {
    return $(` 
    <div class="bookDescription">
      <div class="bookDescriptionImage" aria-hidden="true">
        <img src="${json.image}" />
      </div>
      <section class="bookDetails">
        <h2 class="hBookDescriptionTitle">${json.title}</h2>
        <div class="bookDescriptionDetailsContainer">
          <div class="bookDescriptionDetailsCard">
            <div class="shareBookActions">
              <a href="#" class="btnShareBook">Enviar este producto 🔗</a>
              <div class="shareBookDropdown">
                <ul>
                  <li>
                    <a href="whatsapp://send?text=${this.GetMessage(json)}" target="_blank">
                    <i class="fa-brands fa-whatsapp"></i>Enviar por WhatsApp</a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(this.GetMessage(json))}" target="_blank">
                    <i class="fa-brands fa-facebook"></i>Publicar en Facebook</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(this.GetMessage(json))}" target="_blank">
                    <i class="fa-brands fa-twitter"></i>Compartir en Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="bookDescriptionDetailsTitle">
            <span>Descripcion:</span>
          </div>
          <ul class="ulBookDescriptionDetails">
            <li><strong>Título del libro: </strong>${json.title}</li>
            <li><strong>Autor: </strong>${json.author}</li>
            <li>
              <strong>Vivió entre: </strong>${json.birthYear} y
              ${json.deathYear}
            </li>
            <li><strong>Derechos de autor: </strong>${json.copyright}</li>
            <li><strong>Idioma: </strong>${json.language}</li>
            <li><strong>Temas: </strong>${json.subjects}</li>
            <li><strong>Categorias: </strong>${json.bookshelves}</li>
            <li><strong>Resumen: </strong>${json.summaries}</li>
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

  GetMessage(json) {
    return `Mira el libro que vi!! ${json.title} de ${json.author} en ${json.language}`;
  }
}