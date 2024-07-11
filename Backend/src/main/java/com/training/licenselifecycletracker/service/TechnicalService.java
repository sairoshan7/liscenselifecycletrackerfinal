package com.training.licenselifecycletracker.service;

import java.util.List;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.SoftwareUpdateDTO;
import com.training.licenselifecycletracker.entities.RequestLog;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.RequestLogNotFoundException;

public interface TechnicalService {
	
	List<RequestLog> getAllRequestLogs();
    DeviceDTO updateDeviceDates(HardwareUpdateDTO hardwareupdatedto)throws DeviceNotFoundException ;
	DeviceDTO updateSoftwareDates(SoftwareUpdateDTO softwareupdatedto)throws DeviceNotFoundException ;
	
	 public boolean deleteRequestLogById(Integer id)throws RequestLogNotFoundException;

}
