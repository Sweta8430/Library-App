import BookModel from "../model/BookModel";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "../Utils/Spinner";
import { SearchEachBook } from "./SearchEachBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBookPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [totalAmountOfBook, setTotalAmountOfBook] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const getBooks = async () => {
      const baseUrl = "http://localhost:8080/api/books";
      const url = `${baseUrl}?page=${currentPage - 1}&size=${perPage}`;
      try {
        const response = await axios.get(url);
        const responseData = response.data._embedded.books;
        const { page } = response.data;
        console.log(page.totalElements);
        console.log(page.totalPages);
        setTotalAmountOfBook(page.totalElements);
        setTotalPages(page.totalPages);

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
    window.scrollTo(0, 0);
  }, [currentPage]);

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
  const indexOfLastBook: number = currentPage * perPage;
  const indexOfFirstBook: number = indexOfLastBook - perPage;
  let lastItem =
    perPage * currentPage <= totalAmountOfBook
      ? perPage * currentPage
      : totalAmountOfBook;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
            <h5>Number of Results: ({totalAmountOfBook})</h5>
          </div>
          <p>
            {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBook} Items:
          </p>
          {books.map((book) => (
            <SearchEachBook book={book} key={book.id} />
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
