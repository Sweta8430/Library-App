package com.example.demo.library.app.service;

import com.example.demo.library.app.dao.ReviewRepository;
import com.example.demo.library.app.entity.Review;
import com.example.demo.library.app.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Transactional
@Service
public class ReviewService {
       private ReviewRepository reviewRepository;

        @Autowired
        public ReviewService(ReviewRepository reviewRepository) {
            this.reviewRepository = reviewRepository;
        }

        public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
            Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
            if (validateReview != null) {
                throw new Exception("Review already created");
            }

            Review review = new Review();
            review.setBookId(reviewRequest.getBookId());
            review.setRating(reviewRequest.getRating());
            review.setUserEmail(userEmail);
            if (reviewRequest.getReviewDescription().isPresent()) {
                review.setReviewDescription(reviewRequest.getReviewDescription().map(
                        Object::toString
                ).orElse(null));
            }
            review.setDate(Date.valueOf(LocalDate.now()));
            reviewRepository.save(review);
        }
        public boolean userReviewListed(String userEmail,Long bookId){
            Review validatedReview = reviewRepository.findByUserEmailAndBookId(userEmail,bookId);
            if(validatedReview!=null){
                return true;
            }else{
                return false;
            }
        }
    }

