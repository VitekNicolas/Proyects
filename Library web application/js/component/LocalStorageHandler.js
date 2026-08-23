import { Fetch } from "./Fetch.js";
import { BookData } from "./BookData.js";

export class LocalStorageHandler {
  constructor() {
    this.fetch = new Fetch();
  }

  CreateStorageForBooks(storageName) {
    let storage = $.parseJSON(localStorage.getItem(storageName));
    if (storage == null) {
      localStorage.setItem(storageName, JSON.stringify([]));
    }
  }

  AppendBookDataToStorage(category, bookdata) {
    let array = $.parseJSON(localStorage.getItem(category));
    const exists = $.grep(array, (item) => item.title === bookdata.title).length > 0;
    if (!exists) {
      array.push(bookdata);
      localStorage.setItem(category, JSON.stringify(array));
    }
  }

  DeleteBookDataFromStorage(category, bookTitle) {
    let array = $.parseJSON(localStorage.getItem(category));
    array = $.grep(array, (item) => item.title !== bookTitle);
    localStorage.setItem(category, JSON.stringify(array));
  }

  async FillBookshelve() {
    let storage = this.GetStorage("bookshelve");
    if (storage.length === 0) {
      const ids = [];
      for (let i = 340; i <= 390; i++) ids.push(i);
      const chunkSize = 30;
      const chunks = [];
      for (let i = 0; i < ids.length; i += chunkSize) {
        chunks.push(ids.slice(i, i + chunkSize));
      }
      const results = await Promise.all(
        chunks.map((chunk) => this.fetch.GetBook(chunk.join(",")))
      );
      results.forEach((arrayOfBooks) => {
        if (!arrayOfBooks) return;
        arrayOfBooks.forEach((bookJson) => {
          const book = new BookData(bookJson);
          this.AppendBookDataToStorage("bookshelve", book);
        });
      });
      console.log("Libros subidos");
    }
  }

  async FillPopular() {
    let storage = this.GetStorage("popular");
    let arrayOfBooks = await this.fetch.GetBookByPopularity();
    if (storage.length === 0) {
      $.each(arrayOfBooks.results.slice(0, 10), (i, bookJson) => {
        let book = new BookData(bookJson);
        this.AppendBookDataToStorage("popular", book);
        console.log(i + " agregado");
      });
    }
  }

  GetStorage(category) {
    return $.parseJSON(localStorage.getItem(category));
  }
}