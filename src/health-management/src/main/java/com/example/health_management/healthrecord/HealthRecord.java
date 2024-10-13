package com.example.health_management.healthrecord;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "health_records")
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long diagnosisId;

    @Column(nullable = false)
    private Long treatmentId;

    @Column(nullable = false)
    private LocalDate dateOfVisit;

    @Column
    private String doctorNotes;

    @Column(nullable = false)
    private Boolean isApproved;

    @Column
    private String insuranceDetails;

  
    public HealthRecord() {
    }

    public HealthRecord(Long patientId, Long diagnosisId, Long treatmentId, LocalDate dateOfVisit, String doctorNotes, Boolean isApproved, String insuranceDetails) {
        this.patientId = patientId;
        this.diagnosisId = diagnosisId;
        this.treatmentId = treatmentId;
        this.dateOfVisit = dateOfVisit;
        this.doctorNotes = doctorNotes;
        this.isApproved = isApproved;
        this.insuranceDetails = insuranceDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDiagnosisId() {
        return diagnosisId;
    }

    public void setDiagnosisId(Long diagnosisId) {
        this.diagnosisId = diagnosisId;
    }

    public Long getTreatmentId() {
        return treatmentId;
    }

    public void setTreatmentId(Long treatmentId) {
        this.treatmentId = treatmentId;
    }

    public LocalDate getDateOfVisit() {
        return dateOfVisit;
    }

    public void setDateOfVisit(LocalDate dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public String getInsuranceDetails() {
        return insuranceDetails;
    }

    public void setInsuranceDetails(String insuranceDetails) {
        this.insuranceDetails = insuranceDetails;
    }



    // TODO : Reference other Tables
}