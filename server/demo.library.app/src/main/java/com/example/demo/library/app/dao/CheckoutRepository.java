package com.example.demo.library.app.dao;

import com.example.demo.library.app.entity.Checkout;
import org.hibernate.annotations.Check;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {
    Checkout findByUserEmailAndBookId(String userEmail,Long bookId);
    List<Checkout> findBookByUserEmail(String userEmail);
}
