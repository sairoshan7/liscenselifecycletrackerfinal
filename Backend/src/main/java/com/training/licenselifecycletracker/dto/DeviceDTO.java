package com.training.licenselifecycletracker.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class DeviceDTO {

    private Integer deviceId;
    private String deviceName;
    private String deviceType;
    private LocalDate purchaseDate;
    private LocalDate endOfLife;
    private LocalDate endOfSupportDate;
    private String status;
    private LocalDate dateOfLastReplacement;
    private UserDTO user; // Representing UserDTO instead of User entity
    private List<SoftwareDTO> softwareList;
    private LifecycleEventDTO lifecycleEvent;

}
