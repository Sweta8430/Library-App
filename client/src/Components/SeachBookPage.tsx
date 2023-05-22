import BookModel from "../model/BookModel";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "../Utils/Spinner";
import { SearchEachBook } from "./SearchEachBook";

export const SearchBookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const getBooks = async () => {
      const baseUrl = "http://localhost:8080/api/books";
      const url = `${baseUrl}?page=0&size=5`;
      try {
        const response = await axios.get(url);
        const responseData = response.data._embedded.books;
        const loadedBooks: BookModel[] = responseData.map(
          (bookData: BookModel) => ({
            id: bookData.id,
            title: bookData.title,
            author: bookData.author,
            description: bookData.description,
            copies: bookData.copies,
            copiesAvailable: bookData.copiesAvailable,
            category: bookData.category,
            img: bookData.img,
          })
        );
        setBooks(loadedBooks);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    getBooks();
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      ALL
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      FrontEnd
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      BackEnd
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Data
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of Results: (22)</h5>
          </div>
          <p>1 to 5 of 22 Items:</p>
          {books.map((book) => (
            <SearchEachBook book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
