package com.pharmacy.priscription.Repository;
import com.pharmacy.priscription.Model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
    // Additional custom queries if needed
    List<Prescription> findByPatientName(String patientName);
    List<Prescription> findByProviderName(String providerName);
}