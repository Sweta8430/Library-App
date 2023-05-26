import { useState, useEffect } from "react";
import BookModel from "../../model/BookModel";
import axios from "axios";
import { Spinner } from "../../Utils/Spinner";
import { StarsReview } from "../../Utils/StarReviews";
import { CheckoutAndReview } from "./CheckoutAndReview";
import ReviewModel from "../../model/ReviewModel";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {
  const bookId = window.location.pathname.split("/")[2];

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  //Review States
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
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
  }, []);
  // Review UseEffect
  useEffect(() => {
    const getReviews = async () => {
      const baseUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      try {
        const response = await axios.get(baseUrl);
        const responseData = response.data._embedded.reviews;
        console.log(responseData);
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
  }, []);

  if (isLoading || isLoadingReview) {
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
          <CheckoutAndReview mobile={false} book={book} />
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
        <CheckoutAndReview mobile={true} book={book} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
