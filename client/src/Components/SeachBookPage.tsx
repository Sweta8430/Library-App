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
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book Category");
  useEffect(() => {
    const getBooks = async () => {
      const baseUrl = "http://localhost:8080/api/books";

      let url = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${perPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }
      try {
        const response = await axios.get(url);
        const responseData = response.data._embedded.books;
        const { page } = response.data;

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
  }, [currentPage, searchUrl]);

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
  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${perPage}`
      );
    }
    setCategorySelection("Book Category");
  };
  const categoryHandleChange = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "fe" ||
      value.toLowerCase() === "be" ||
      value.toLowerCase() === "data" ||
      value.toLowerCase() === "devops"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${perPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${perPage}`);
    }
  };
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
                  aria-labelledby="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
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
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryHandleChange("All")}>
                    <a href="#" className="dropdown-item">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryHandleChange("FE")}>
                    <a href="#" className="dropdown-item">
                      Front End
                    </a>
                  </li>
                  <li onClick={() => categoryHandleChange("BE")}>
                    <a href="#" className="dropdown-item">
                      Back End
                    </a>
                  </li>
                  <li onClick={() => categoryHandleChange("Data")}>
                    <a href="#" className="dropdown-item">
                      Data
                    </a>
                  </li>
                  <li onClick={() => categoryHandleChange("Devops")}>
                    <a href="#" className="dropdown-item">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBook > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of Results: ({totalAmountOfBook})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBook}{" "}
                Items:
              </p>
              {books.map((book) => (
                <SearchEachBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Sorry!Book is not Available!</h3>
              <a
                href="#"
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
              >
                Library Services
              </a>
            </div>
          )}

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
