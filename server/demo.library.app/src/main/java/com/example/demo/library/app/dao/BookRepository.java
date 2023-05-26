package com.example.demo.library.app.dao;

import com.example.demo.library.app.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;



// exends JPA repository(The JPA Repository provides a set of pre-defined methods for performing CRUD (Create, Read, Update, Delete) operations on entities) where we are passing the class name where all our entitys are there and Long is the data type
// of our primary key.
public interface BookRepository extends JpaRepository<Book,Long> {
    Page<Book> findByTitleContaining(@RequestParam("title")String title, Pageable pageable);
    Page<Book> findByCategory(@RequestParam("category")String category, Pageable pageable);

}
