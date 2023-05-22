package com.example.demo.library.app.entity;
import lombok.Data;
import javax.persistence.*;
@Entity // which represnt that class is an entity which represents the table in DB.
@Data // this belongs to lombork library which generated automatically all getter and setter for the book class
@Table(name="book") // name of the table is book which matched in SQL DB.
public class Book {
    @Id // priamry key of the table
    @GeneratedValue( strategy = GenerationType.IDENTITY) // specify how we are generating the primary key.
    @Column(name="id")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="author")
    private String author;

    @Column(name="description")
    private String description;

    @Column(name="copies")
    private int copies;

    @Column(name="copies_available")
    private int copiesAvailable;

    @Column(name="category")
    private String category;

    @Column(name="img")
    private  String img;

}
