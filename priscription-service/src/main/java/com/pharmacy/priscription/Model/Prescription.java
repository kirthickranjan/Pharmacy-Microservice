package com.pharmacy.priscription.Model;
import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "prescriptions")
public class Prescription {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prescription_id")
    private Integer prescriptionId;
    
    @Column(name = "provider_name")
    private String providerName;
    
    @Column(name = "patient_name")
    private String patientName;
    
    @Column(name = "medicine_name")
    private String medicineName;
    
    @Column(name = "dosage")
    private String dosage;
    
    @Column(name = "followup_date")
    private String followupDate;
    
    @Column(name = "followup_notes", length = 500)
    private String followupNotes;

    // Constructors
    public Prescription() {}

    public Prescription(Integer prescriptionId, String providerName, String patientName,
                       String medicineName, String dosage, String followupDate, String followupNotes) {
        this.prescriptionId = prescriptionId;
        this.providerName = providerName;
        this.patientName = patientName;
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.followupDate = followupDate;
        this.followupNotes = followupNotes;
    }

    // Getters and Setters
    public Integer getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Integer prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFollowupDate() {
        return followupDate;
    }

    public void setFollowupDate(String followupDate) {
        this.followupDate = followupDate;
    }

    public String getFollowupNotes() {
        return followupNotes;
    }

    public void setFollowupNotes(String followupNotes) {
        this.followupNotes = followupNotes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Prescription)) return false;
        Prescription that = (Prescription) o;
        return Objects.equals(prescriptionId, that.prescriptionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(prescriptionId);
    }

    @Override
    public String toString() {
        return "Prescription{" +
                "prescriptionId=" + prescriptionId +
                ", providerName='" + providerName + '\'' +
                ", patientName='" + patientName + '\'' +
                ", medicineName='" + medicineName + '\'' +
                ", dosage='" + dosage + '\'' +
                ", followupDate='" + followupDate + '\'' +
                ", followupNotes='" + followupNotes + '\'' +
                '}';
    }
}