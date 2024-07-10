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
public class LifecycleEventDTO {

    private Integer eventId;
    private Integer deviceId; // Using deviceId instead of DeviceDTO to avoid cyclic dependency
    private String eventType;
    private LocalDate eventDate;
    private String description;
    private String category;

}
