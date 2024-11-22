package com.example.health_management.healthrecord.model;

import com.example.health_management.healthrecord.model.dto.HealthRecordDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "health_records")
public class HealthRecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "allergies")
    private String allergies;

    @Column(name = "medical_history")
    private String medicalHistory;

    @Column(name = "diagnoses")
    private String diagnoses;

    @Column(name = "medicines")
    private String medicines;

    @Column(name = "health_insurance")
    private String healthInsurance;

    @Column(name = "has_left", nullable = false)
    private boolean hasLeft;


    public HealthRecordEntity() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getDiagnoses() {
        return diagnoses;
    }

    public void setDiagnoses(String diagnoses) {
        this.diagnoses = diagnoses;
    }

    public String getMedicines() {
        return medicines;
    }

    public void setMedicines(String medicines) {
        this.medicines = medicines;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getHealthInsurance() {
        return healthInsurance;
    }

    public void setHealthInsurance(String healthInsurance) {
        this.healthInsurance = healthInsurance;
    }

    public boolean getHasLeft() {
        return hasLeft;
    }

    public void setHasLeft(boolean hasLeft) {
        this.hasLeft = hasLeft;
    }

    private List<String> convertStringToList(String str) {
        if (str == null || str.isEmpty()) {
            return List.of();
        }
        return Arrays.stream(str.replace("[", "").replace("]", "").split(","))
                .map(String::trim)
                .collect(Collectors.toList());
    }

    public HealthRecordDTO toDTO() {
        return new HealthRecordDTO(
                this.id,
                this.userId,
                this.username,
                convertStringToList(this.allergies),
                convertStringToList(this.medicalHistory),
                convertStringToList(this.diagnoses),
                convertStringToList(this.medicines),
                this.healthInsurance
        );
    }
}