package com.training.licenselifecycletracker.controller;

import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/management")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ManagementController {

	
	@Autowired
    DeviceService deviceService;

    
    

    @GetMapping("/lifecycle-events")
    public ResponseEntity<List<LifecycleEventDTO>> getAllLifecycleEvents() {
        List<LifecycleEventDTO> lifecycleEvents = deviceService.getAllLifecycleEvents();
        return new ResponseEntity<>(lifecycleEvents, HttpStatus.OK);
    }
}
