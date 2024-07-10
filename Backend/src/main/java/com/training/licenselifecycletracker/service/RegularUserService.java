package com.training.licenselifecycletracker.service;

import java.util.List;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.ReplaceDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Software;

public interface RegularUserService {
	
	 // user
    
		List<DeviceDTO> getDevicesByUserId(Integer userId);
		
		List<SoftwareDTO> getSoftwareByDeviceName(String deviceName);
		
		String requestRenew(SoftwareDTO softwareDTO);
		
		String requestReplacement(ReplaceDTO replaceDTO);

}
