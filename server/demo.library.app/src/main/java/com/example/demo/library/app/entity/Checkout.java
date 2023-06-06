package com.example.demo.library.app.entity;

import lombok.Data;
import org.hibernate.annotations.Check;

import javax.persistence.*;

@Entity
@Data
@Table(name="checkout")
public class Checkout {
    public Checkout(){
    }
    public Checkout(String userEmail,String checkoutDate,String returnDate ,long bookId){
        this.userEmail=userEmail;
        this.checkoutDate=checkoutDate;
        this.returnDate=returnDate;
        this.bookId=bookId;
    }
    @Id // priamry key of the table
    @GeneratedValue( strategy = GenerationType.IDENTITY) // specify how we are generating the primary key.
    @Column(name="id")
    private Long id;

    @Column(name="user_email")
    private String userEmail;
    @Column(name="checkout_date")
    private String checkoutDate;
    @Column(name="return_date")
    private String returnDate;
    @Column(name="book_id")
    private Long bookId;

}
