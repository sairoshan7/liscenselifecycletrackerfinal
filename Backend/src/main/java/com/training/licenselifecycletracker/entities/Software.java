package com.training.licenselifecycletracker.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "software")
public class Software {

    @Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "software_seq")
	@SequenceGenerator(name = "software_seq", sequenceName = "software_seq", initialValue = 500)
    @Column(name = "software_id")
    private Integer softwareId;

    @Column(name = "software_name")
    private String softwareName;
    
    @Column(name = "version")
    private String version;

    @Column(name = "license_key")
    private String licenseKey;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "expiry_date")
    private LocalDate expirationDate;

    @Column(name = "support_end_date")
    private LocalDate supportEndDate;

    @Column(name = "status")
    private String status;
    
    @Column(name = "date_of_last_renewal")
    private LocalDate dateOfLastRenewal;

    @ManyToOne
    @JoinColumn(name = "device_id")
    @JsonBackReference
    private Device device;
    
    // Constructors, getters, setters
}
