package com.training.licenselifecycletracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.ReplaceDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.service.DeviceService;
import com.training.licenselifecycletracker.service.RegularUserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
	
	
	
	@Autowired
	RegularUserService regularUserService;
	
	
	@Autowired
    DeviceService deviceService;

    
    

    @GetMapping("/devices/{userId}")
    public ResponseEntity<List<DeviceDTO>> getDevicesByUserId(@PathVariable Integer userId) {
        List<DeviceDTO> devices = regularUserService.getDevicesByUserId(userId);
        if (!devices.isEmpty()) {
            return new ResponseEntity<>(devices, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @GetMapping("/software/{deviceName}")
    public ResponseEntity<List<SoftwareDTO>> getSoftwareByDeviceName(@PathVariable String deviceName) {
        List<SoftwareDTO> software = regularUserService.getSoftwareByDeviceName(deviceName);
        if (!software.isEmpty()) {
            return new ResponseEntity<>(software, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // Add other controller methods as needed

    //@PostMapping("/software/requestrenewal/")
   
    @PostMapping("/renew")
    public String requestRenew(@RequestBody SoftwareDTO softwareDTO) {
        return regularUserService.requestRenew(softwareDTO);
    }
    
    @PostMapping("/replace")
    public String requestReplace(@RequestBody ReplaceDTO replaceDTO) {
        return regularUserService.requestReplacement(replaceDTO);
    }
    
    @GetMapping("/devices/searchByName")
    public ResponseEntity<List<Device>> searchDevicesByName(@RequestParam String deviceName) {
        List<Device> devices = regularUserService.searchDevices(deviceName, null, null);
        if (!devices.isEmpty()) {
            return new ResponseEntity<>(devices, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/devices/searchByStatus")
    public ResponseEntity<List<Device>> searchDevicesByStatus(@RequestParam String status) {
        List<Device> devices = regularUserService.searchDevices(null, status, null);
        if (!devices.isEmpty()) {
            return new ResponseEntity<>(devices, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/devices/searchByType")
    public ResponseEntity<List<Device>> searchDevicesByType(@RequestParam String deviceType) {
        List<Device> devices = regularUserService.searchDevices(null, null, deviceType);
        if (!devices.isEmpty()) {
            return new ResponseEntity<>(devices, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
}
