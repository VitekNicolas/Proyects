export class Fetch {

  // Método privado genérico para hacer requests a Gutendex
  async #Get(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor (${response.status})`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al consultar ${url}:`, error);
      return null;
    }
  }

  // Devuelve un array de libros por id
  GetBook = async (id) => {
    const json = await this.#Get(`https://gutendex.com/books?ids=${id}`);
    return json ? json.results : null;
  };

  GetBooksByYears = async (minYear, maxYear) => {
    return this.#Get(`https://gutendex.com/books/?author_year_start=${minYear}&author_year_end=${maxYear}`);
  };

  GetBooksByAuthorName = async (authorName) => {
    return this.#Get(`https://gutendex.com/books?search=${authorName}`);
  };

  GetBooksByTopic = async (topic) => {
    return this.#Get(`https://gutendex.com/books?topic=${topic}`);
  };

  GetBookByCopyright = async (valor) => {
    return this.#Get(`https://gutendex.com/books?copyright=${valor}`);
  };

  GetBookByLanguage = async (language) => {
    return this.#Get(`https://gutendex.com/books?languages=${language}`);
  };

  GetBookByPopularity = async (order = "popular") => {
    return this.#Get(`https://gutendex.com/books?sort=${order}`);
  };
}