package com.pharmacy.priscription;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PrescriptionServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PrescriptionServiceApplication.class, args);
        System.out.println("========================================");
        System.out.println("Prescription Service started on port 8081");
        System.out.println("========================================");
    }
}