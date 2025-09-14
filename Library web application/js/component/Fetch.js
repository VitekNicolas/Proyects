import { BookData } from "./BookData.js";

export class Fetch {

  //Returns an array of books
  GetBook = async (id) => {
    try {
      const response = await fetch(`https://gutendex.com/books?ids=${id}`);
      if (!response.ok) {
        throw new Error(
          `Error fetching book with id ${id}: ${response.statusText}`
        );
      }
      const json = await response.json();
      const arrayOfBooks = json.results;
      return arrayOfBooks;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  GetBooksByYears = async (minYear, maxYear) => {
    try {
      const response = await fetch(`https://gutendex.com/books/?author_year_start=${minYear}&author_year_end=${maxYear}`);
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al buscar libros:", error);
    }
  }
}