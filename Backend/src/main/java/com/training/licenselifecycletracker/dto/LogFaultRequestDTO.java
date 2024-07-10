package com.training.licenselifecycletracker.dto;

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
public class LogFaultRequestDTO {
    private String deviceName;
    private String description;
    private String date;
    private String category;
 
}