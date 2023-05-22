package com.example.demo.library.app.dao;

import com.example.demo.library.app.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
// exends JPA repository(The JPA Repository provides a set of pre-defined methods for performing CRUD (Create, Read, Update, Delete) operations on entities) where we are passing the class name where all our entitys are there and Long is the data type
// of our primary key.
public interface BookRepository extends JpaRepository<Book,Long> {
}
