package com.training.licenselifecycletracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SoftwareDTO {

    private Integer softwareId;
    private String softwareName;
    private String version;
    private String licenseKey;
    private LocalDate purchaseDate;
    private LocalDate expirationDate;
    private LocalDate supportEndDate;
    private String status;
    private LocalDate dateOfLastRenewal;
//    private DeviceDTO device; // Representing DeviceDTO instead of Device entity

}
