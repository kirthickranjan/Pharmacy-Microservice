package com.pharmacy.priscription.Controller;

import com.pharmacy.priscription.Model.Prescription;
import com.pharmacy.priscription.Repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/prescription")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepo;

    // Health check endpoint (public)
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Prescription Service is running on port 8081");
    }

    // Get all prescriptions - Both Admin and User can view
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> getAllPrescriptions() {
        try {
            List<Prescription> prescriptions = prescriptionRepo.findAll();
            return ResponseEntity.ok(prescriptions);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch prescriptions");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Get prescription by ID - Both Admin and User can view
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> getPrescriptionById(@PathVariable Integer id) {
        try {
            Optional<Prescription> prescription = prescriptionRepo.findById(id);
            if (prescription.isPresent()) {
                return ResponseEntity.ok(prescription.get());
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Prescription not found");
                error.put("id", id.toString());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch prescription");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Create prescription - Only Admin
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPrescription(@RequestBody Prescription prescription) {
        try {
            // Validate required fields
            if (prescription.getProviderName() == null || prescription.getProviderName().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Provider name is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }
            if (prescription.getPatientName() == null || prescription.getPatientName().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Patient name is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }
            if (prescription.getMedicineName() == null || prescription.getMedicineName().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Medicine name is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            Prescription savedPrescription = prescriptionRepo.save(prescription);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPrescription);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create prescription");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Update prescription - Only Admin
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePrescription(@PathVariable Integer id, 
                                               @RequestBody Prescription prescription) {
        try {
            if (!prescriptionRepo.existsById(id)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Prescription not found");
                error.put("id", id.toString());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            prescription.setPrescriptionId(id);
            Prescription updatedPrescription = prescriptionRepo.save(prescription);
            return ResponseEntity.ok(updatedPrescription);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update prescription");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Delete prescription - Only Admin
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePrescription(@PathVariable Integer id) {
        try {
            if (!prescriptionRepo.existsById(id)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Prescription not found");
                error.put("id", id.toString());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            prescriptionRepo.deleteById(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Prescription deleted successfully");
            response.put("id", id.toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to delete prescription");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Search by patient name - Both Admin and User
    @GetMapping("/patient/{patientName}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> getPrescriptionsByPatient(@PathVariable String patientName) {
        try {
            List<Prescription> prescriptions = prescriptionRepo.findByPatientName(patientName);
            return ResponseEntity.ok(prescriptions);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch prescriptions");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Search by provider name - Both Admin and User
    @GetMapping("/provider/{providerName}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> getPrescriptionsByProvider(@PathVariable String providerName) {
        try {
            List<Prescription> prescriptions = prescriptionRepo.findByProviderName(providerName);
            return ResponseEntity.ok(prescriptions);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch prescriptions");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}