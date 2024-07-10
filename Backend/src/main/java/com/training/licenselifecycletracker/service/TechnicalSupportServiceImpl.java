package com.training.licenselifecycletracker.service;

import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.SoftwareUpdateDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.RequestLog;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
import com.training.licenselifecycletracker.repositories.RequestLogRepository;

import jakarta.transaction.Transactional;
@Service
public class TechnicalSupportServiceImpl implements TechnicalService{
	
	@Autowired
	RequestLogRepository requestLogRepository;
	
	   @Autowired
	    DeviceRepository deviceRepository;
	    
	    
	    @Autowired
	    ModelMapper modelMapper;
	    
	    @Autowired
	    LifecycleEventRepository lifecycleEventRepository;
	   

	@Override
	public List<RequestLog> getAllRequestLogs() {
		// TODO Auto-generated method stub
		return (List<RequestLog>) requestLogRepository.findAll();
	}
	
	
	@Override
	public DeviceDTO updateDeviceDates(HardwareUpdateDTO hardwareupdatedto) {
		Device deviceToUpdate = deviceRepository.findById(hardwareupdatedto.getDeviceId())
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + hardwareupdatedto.getDeviceId()));

        modelMapper.map(hardwareupdatedto, deviceToUpdate);

        // Ensure lifecycle event association is correctly set
        if (deviceToUpdate.getLifecycleEvent() != null) {
            deviceToUpdate.getLifecycleEvent().setDevice(deviceToUpdate);
        }

        deviceToUpdate.setEndOfLife(hardwareupdatedto.getEndOfLife());
        deviceToUpdate.setDateOfLastReplacement(LocalDate.now());
        deviceToUpdate.setEndOfSupportDate(hardwareupdatedto.getEndOfSupportDate());
        deviceToUpdate.setStatus("Active");
        
        deviceRepository.save(deviceToUpdate);
        
        
       LifecycleEvent lifecycle =lifecycleEventRepository.findByDevice_DeviceId(hardwareupdatedto.getDeviceId());
       lifecycle.setDescription("Replaced the device");
       lifecycle.setEventType("Active");
       lifecycle.setEventDate(LocalDate.now());
       
       lifecycleEventRepository.save(lifecycle);

        return modelMapper.map(deviceToUpdate, DeviceDTO.class);
		
	}


	 @Override
	 @Transactional
	 public DeviceDTO updateSoftwareDates(SoftwareUpdateDTO softwareUpdateDTO) {
	        // Find the device by software ID
	        Device deviceToUpdate = deviceRepository.findBySoftwareList_SoftwareId(softwareUpdateDTO.getSoftwareId())
	                .orElseThrow(() -> new RuntimeException("Device not found with software id: " + softwareUpdateDTO.getSoftwareId()));

	        // Update the software in the list
	        List<Software> softwareList = deviceToUpdate.getSoftwareList();
	        for (Software software : softwareList) {
	            if (software.getSoftwareId().equals(softwareUpdateDTO.getSoftwareId())) {
	               
	                software.setExpirationDate(softwareUpdateDTO.getExpirationDate());
	                software.setSupportEndDate(softwareUpdateDTO.getSupportEndDate());
	                software.setDateOfLastRenewal(LocalDate.now());
	                break;
	            }
	        }

	        // Save the updated device entity
	        deviceRepository.save(deviceToUpdate);

	        // Map the updated device entity back to DeviceDTO and return
	        return modelMapper.map(deviceToUpdate, DeviceDTO.class);
	    }

}
