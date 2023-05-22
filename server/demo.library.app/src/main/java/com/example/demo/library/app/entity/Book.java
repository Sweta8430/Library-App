package com.example.demo.library.app.entity;
import lombok.Data;
import javax.persistence.*;
@Entity
@Data // which generated automatically all getter and setter for the book
@Table(name="book") // name of the table is book which matched in SQL DB.
public class Book {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

}
