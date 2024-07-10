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
import org.springframework.web.bind.annotation.RestController;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.LogFaultRequestDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.dto.SoftwareUpdateDTO;
import com.training.licenselifecycletracker.dto.UpdateFaultLogRequestDTO;
import com.training.licenselifecycletracker.entities.RequestLog;
import com.training.licenselifecycletracker.service.DeviceService;
import com.training.licenselifecycletracker.service.TechnicalService;

@RestController
@RequestMapping("/api/technicalsupport")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TechnicalSupportController {

   @Autowired
   DeviceService deviceService;
   
   @Autowired
   TechnicalService technicalService;
   
   
 
   @PostMapping("/support/faults")
   public ResponseEntity<String> logFault(@RequestBody LogFaultRequestDTO logFaultRequest) {
       try {
           String result = deviceService.logFault(logFaultRequest);
           return new ResponseEntity<>(result, HttpStatus.OK);
       } catch (RuntimeException e) {
           return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
       }
   }

   @PostMapping("/support/faults/update")
   public ResponseEntity<String> updateFaultLog(@RequestBody UpdateFaultLogRequestDTO updateFaultLogRequest) {
       try {
           String result = deviceService.updateFaultLog(updateFaultLogRequest);
           return new ResponseEntity<>(result, HttpStatus.OK);
       } catch (RuntimeException e) {
           return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
       }
   }

//   @GetMapping("/support/end-of-support-dates")
//   public ResponseEntity<List<SoftwareDTO>> getEndOfSupportDates() {
//       List<SoftwareDTO> softwareDTOList = deviceService.viewEndOfSupportDates();
//       return new ResponseEntity<>(softwareDTOList, HttpStatus.OK);
//   }
   
   @GetMapping("/support/end-of-support-dates")
   public ResponseEntity<List<SoftwareDTO>> viewEndOfSupportDates() {
       List<SoftwareDTO> softwareDTOList = deviceService.viewEndOfSupportDates();
       return new ResponseEntity<>(softwareDTOList, HttpStatus.OK);
   }
   
   @GetMapping("/viewAllRequestLog")
   public ResponseEntity<List<RequestLog>> viewAllRequestLog() {
       List<RequestLog> requestLogList = technicalService.getAllRequestLogs();
       return ResponseEntity.ok(requestLogList);
   }
   
   
   @PostMapping("/update/device")
   public ResponseEntity<DeviceDTO> updateDeviceDates(@RequestBody HardwareUpdateDTO hardwareupdatedto) {
       DeviceDTO updatedDevice = technicalService.updateDeviceDates(hardwareupdatedto);
       return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
   }
   
   @PostMapping("/update/software")
   public ResponseEntity<DeviceDTO> updateSoftwareDates(@RequestBody SoftwareUpdateDTO softwareupdatedto) {
       DeviceDTO updatedDevice = technicalService.updateSoftwareDates(softwareupdatedto);
       return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
   }
   
   
   

}
