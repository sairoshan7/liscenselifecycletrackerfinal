package com.training.licenselifecycletracker.service;

import java.util.List;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.dto.LogFaultRequestDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.dto.UpdateFaultLogRequestDTO;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;

public interface DeviceService {

    DeviceDTO addDevice(DeviceDTO deviceDTO);

    DeviceDTO updateDevice(DeviceDTO deviceDTO)throws DeviceNotFoundException;

    DeviceDTO getDeviceById(Integer deviceId)throws DeviceNotFoundException;

    List<DeviceDTO> getAllDevices();

    void deleteDevice(Integer deviceId)throws DeviceNotFoundException;

    DeviceDTO addSoftwareToDevice(Integer deviceId, SoftwareDTO softwareDTO)throws DeviceNotFoundException;

    DeviceDTO addLifecycleEventToDevice(Integer deviceId, LifecycleEventDTO lifecycleEventDTO)throws DeviceNotFoundException;

    public String updateRole(Integer userId, Role role) throws UserNotFoundException;
   

	
	// techsupport
	


    List<SoftwareDTO> viewEndOfSupportDates();
    

    
    // manager
    
    List<LifecycleEventDTO> getAllLifecycleEvents();
	
	

}