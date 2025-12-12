package com.pharmacy.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("API Gateway started on port 8080");
        System.out.println("CORS configured for: http://localhost:3000");
        System.out.println("========================================\n");
    }

    @GetMapping("/")
    public String home() {
        return "API Gateway is running on port 8080";
    }

    @GetMapping("/health")
    public String health() {
        return "API Gateway Health: OK";
    }
}
