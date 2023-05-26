package com.example.demo.library.app.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity // which represent that class is an entity which represents the table in DB.
@Data // this belongs to lombok library which generated automatically all getter and setter for the book class
@Table(name="review")
public class Review {

    @Id // primary key of the table
    @GeneratedValue( strategy = GenerationType.IDENTITY) // specify how we are generating the primary key.

    @Column(name="id")
    private long id;

    @Column(name="user_email")
    private String userEmail;

    @CreationTimestamp
    private Date date;

    @Column(name="rating")
    private double rating;

    @Column(name="book_id")
    private long bookId;

    @Column(name="review_description")
    private String reviewDescription;

}
