package com.training.licenselifecycletracker.service;

import java.util.List;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.ReplaceDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;

public interface RegularUserService {
	
	 // user
    
		List<DeviceDTO> getDevicesByUserId(Integer userId);
		
		List<SoftwareDTO> getSoftwareByDeviceName(String deviceName);
		
		String requestRenew(SoftwareDTO softwareDTO);
		
		String requestReplacement(ReplaceDTO replaceDTO);
		
		public List<Device> searchDevices(String deviceName, String status, String deviceType)throws DeviceNotFoundException ;
		
		public List<User> getAllUsers() ;

}
