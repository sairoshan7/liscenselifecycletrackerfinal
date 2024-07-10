package com.training.licenselifecycletracker.entities;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "devices")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private Integer deviceId;

    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "device_type")
    private String deviceType;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "end_of_life")
    private LocalDate endOfLife;

    @Column(name = "support_end_date")
    private LocalDate endOfSupportDate;

    @Column(name = "status")
    private String status;
    
    @Column(name = "date_of_last_replacement")
    private LocalDate dateOfLastReplacement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Software> softwareList;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL)
    @JsonManagedReference
    private LifecycleEvent lifecycleEvent;
    
    // Constructors, getters, setters
}
