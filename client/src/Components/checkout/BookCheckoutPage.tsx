import { useState, useEffect } from "react";
import BookModel from "../../model/BookModel";
import axios from "axios";
import { Spinner } from "../../Utils/Spinner";
import { StarsReview } from "../../Utils/StarsReview";
import { CheckoutAndReview } from "./CheckoutAndReview";
import ReviewModel from "../../model/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../model/ReviewRequestModel";

export const BookCheckoutPage = () => {
  const { authState } = useOktaAuth();
  const bookId = window.location.pathname.split("/")[2];

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  //Review States
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setisLoadingUserReview] = useState(true);
  //Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLodingCount, setIsLodingCount] = useState(true);

  // Is booked checked out?
  const [isLoadingCheckedOut, setIsLoadingCheckedOut] = useState(true);
  const [isBookedCheckedOut, setIsBookedCheckedOut] = useState(false);
  useEffect(() => {
    const getBooks = async () => {
      const baseUrl = `http://localhost:8080/api/books/${bookId}`;
      try {
        const response = await axios.get(baseUrl);
        const loadedBook: BookModel = {
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          description: response.data.description,
          copies: response.data.copies,
          copiesAvailable: response.data.copiesAvailable,
          category: response.data.category,
          img: response.data.img,
        };
        setBook(loadedBook);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    getBooks();
  }, [isBookedCheckedOut]);
  // Review UseEffect
  useEffect(() => {
    const getReviews = async () => {
      const baseUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      try {
        const response = await axios.get(baseUrl);
        const responseData = response.data._embedded.reviews;
        const loadedReviews: ReviewModel[] = [];
        let starReviewData: number = 0;
        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            date: responseData[key].date,
            rating: responseData[key].rating,
            book_id: responseData[key].bookId,
            reviewDescription: responseData[key].reviewDescription,
          });
          starReviewData = starReviewData + responseData[key].rating;
        }
        if (loadedReviews.length > 0) {
          const round = (
            Math.round((starReviewData / loadedReviews.length) * 2) / 2
          ).toFixed(1);
          setTotalStars(Number(round));
        }
        setReviews(loadedReviews);
        setIsLoadingReview(false);
      } catch (error: any) {
        setIsLoadingReview(false);
        setHttpError(error.message);
      }
    };
    getReviews();
  }, [isReviewLeft]);
  useEffect(() => {
    const fetchUserReviewBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/reviews/secure/user/book/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error("Something went wrong");
        }
        const userReviewResponseJson = await userReview.json();
        setIsReviewLeft(userReviewResponseJson);
      }
      setisLoadingUserReview(false);
    };
    fetchUserReviewBook().catch((error: any) => {
      setisLoadingUserReview(false);
      setHttpError(error.message);
    });
  }, [authState]);
  // UseEffect for Current Loans count
  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/currentloans/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentLoansCountResponseJson =
          await currentLoansCountResponse.json();
        setCurrentLoansCount(currentLoansCountResponseJson);
      }
      setIsLodingCount(false);
    };
    fetchUserCurrentLoansCount().catch((error: any) => {
      setIsLodingCount(false);
      setHttpError(error.message);
    });
  }, [authState, isBookedCheckedOut]);
  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const bookCheckedOut = await fetch(url, requestOptions);

        if (!bookCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        setIsBookedCheckedOut(bookCheckedOutResponseJson);
      }
      setIsLoadingCheckedOut(false);
    };
    fetchUserCheckedOutBook().catch((error: any) => {
      setIsLoadingCheckedOut(false);
      setHttpError(error.message);
    });
  }, [authState]);
  if (
    isLoading ||
    isLoadingReview ||
    isLodingCount ||
    isLoadingCheckedOut ||
    isLoadingUserReview
  ) {
    return <Spinner />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  async function checkoutBook() {
    const url = `http://localhost:8080/api/books/secure/checkout/?bookId=${book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsBookedCheckedOut(true);
  }
  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book.id;
    }

    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      bookId,
      reviewDescription
    );
    const url = `http://localhost:8080/api/reviews/secure`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsReviewLeft(true);
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="Book" />
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReview
            mobile={false}
            book={book}
            currentLoansCount={currentLoansCount}
            isAuthenticated={authState?.isAuthenticated}
            isBookedCheckedOut={isBookedCheckedOut}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="Book" />
          ) : (
            <img
              src={require("../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReview
          mobile={true}
          book={book}
          currentLoansCount={currentLoansCount}
          isAuthenticated={authState?.isAuthenticated}
          isBookedCheckedOut={isBookedCheckedOut}
          checkoutBook={checkoutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
