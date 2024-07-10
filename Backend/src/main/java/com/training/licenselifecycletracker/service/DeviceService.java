package com.training.licenselifecycletracker.service;

import java.util.List;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.dto.LogFaultRequestDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.dto.UpdateFaultLogRequestDTO;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;

public interface DeviceService {

    DeviceDTO addDevice(DeviceDTO deviceDTO);

    DeviceDTO updateDevice(DeviceDTO deviceDTO);

    DeviceDTO getDeviceById(Integer deviceId);

    List<DeviceDTO> getAllDevices();

    void deleteDevice(Integer deviceId);

    DeviceDTO addSoftwareToDevice(Integer deviceId, SoftwareDTO softwareDTO);

    DeviceDTO addLifecycleEventToDevice(Integer deviceId, LifecycleEventDTO lifecycleEventDTO);

    public String updateRole(Integer userId, Role role) throws UserNotFoundException;
   

	
	// techsupport
	
	String logFault(LogFaultRequestDTO logFaultRequest);

    String updateFaultLog(UpdateFaultLogRequestDTO updateFaultLogRequest);

    List<SoftwareDTO> viewEndOfSupportDates();
    

    
    // manager
    
    List<LifecycleEventDTO> getAllLifecycleEvents();
	
	

}