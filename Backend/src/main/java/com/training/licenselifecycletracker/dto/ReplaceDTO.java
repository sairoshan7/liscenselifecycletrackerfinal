package com.training.licenselifecycletracker.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReplaceDTO {

	 private Integer deviceId;
	 private String deviceName;
	 private String deviceType;
}
