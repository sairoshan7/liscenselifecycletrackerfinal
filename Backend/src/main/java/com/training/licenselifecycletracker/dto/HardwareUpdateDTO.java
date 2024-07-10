package com.training.licenselifecycletracker.dto;

import java.time.LocalDate;
import java.util.List;

import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;

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
public class HardwareUpdateDTO {
	
	private Integer deviceId;
	
	private LocalDate endOfLife;
	
	private LocalDate endOfSupportDate;


}
