package com.pharmacy.stock.Repository;

import com.pharmacy.stock.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Long countById(Integer id);
}