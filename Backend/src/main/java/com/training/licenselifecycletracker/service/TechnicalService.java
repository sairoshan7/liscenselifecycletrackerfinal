package com.training.licenselifecycletracker.service;

import java.util.List;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.SoftwareUpdateDTO;
import com.training.licenselifecycletracker.entities.RequestLog;

public interface TechnicalService {
	
	List<RequestLog> getAllRequestLogs();
    DeviceDTO updateDeviceDates(HardwareUpdateDTO hardwareupdatedto);
	DeviceDTO updateSoftwareDates(SoftwareUpdateDTO softwareupdatedto);

}
