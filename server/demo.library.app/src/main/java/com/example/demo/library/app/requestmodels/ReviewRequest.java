package com.example.demo.library.app.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data

public class ReviewRequest {
    private double rating;
    private long bookId;
    private Optional<String> reviewDescription;
}
