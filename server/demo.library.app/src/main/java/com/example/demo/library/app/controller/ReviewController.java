package com.example.demo.library.app.controller;

import com.example.demo.library.app.Utils.ExtractJwt;
import com.example.demo.library.app.requestmodels.ReviewRequest;
import com.example.demo.library.app.service.ReviewService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;
    public ReviewController (ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    @GetMapping("/secure/user/book")
    public Boolean reviewByUser(@RequestHeader(value="Authorization") String token,@RequestParam Long bookId)throws Exception{
        String userEmail = ExtractJwt.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail==null){
            throw new Exception("User Email is not exist!");
        }
       return  reviewService.userReviewListed(userEmail,bookId);
    }
    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {
        String userEmail = ExtractJwt.payloadJWTExtraction(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }
}


