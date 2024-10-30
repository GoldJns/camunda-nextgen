package com.example.health_management.healthrecord.model;



import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "health_records")
public class HealthRecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "allergies")
    private String allergies;

    @Column(name = "chronic_conditions")
    private String chronicConditions;

    @Column(name = "surgeries")
    private String surgeries;

    @Column(name = "health_insurance", nullable = false)
    private String healthInsurance;

    @OneToMany(mappedBy = "healthRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Visit> visits = new ArrayList<>();

    public HealthRecordEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHealthInsurance() {
        return healthInsurance;
    }

    public void setHealthInsurance(String healthInsurance) {
        this.healthInsurance = healthInsurance;
    }

    public List<Visit> getVisits() {
        return visits;
    }

    public void addVisit(Visit visit) {
        visits.add(visit);
        visit.setHealthRecord(this);
    }

    public void removeVisit(Visit visit) {
        visits.remove(visit);
        visit.setHealthRecord(null);
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public void setChronicConditions(String chronicConditions) {
        this.chronicConditions = chronicConditions;
    }

    public void setSurgeries(String surgeries) {
        this.surgeries = surgeries;
    }
}