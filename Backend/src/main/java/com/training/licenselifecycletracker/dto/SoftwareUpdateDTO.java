package com.training.licenselifecycletracker.dto;

import java.time.LocalDate;

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
public class SoftwareUpdateDTO {
	
	private Integer softwareId;
	
	private LocalDate expirationDate;
	
	private LocalDate supportEndDate;

}
