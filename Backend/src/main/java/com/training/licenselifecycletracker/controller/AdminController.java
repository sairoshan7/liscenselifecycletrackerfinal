package com.training.licenselifecycletracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;
import com.training.licenselifecycletracker.service.DeviceService;
import com.training.licenselifecycletracker.service.RegularUserService;
import com.training.licenselifecycletracker.service.RoleService;
import com.training.licenselifecycletracker.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

     @Autowired
     RegularUserService regularUserService;
     
     @Autowired
     UserService userService;
     
     @Autowired
     RoleService roleService;

    @Autowired
    DeviceService deviceService;

    @PostMapping("/addDevices")
    public ResponseEntity<DeviceDTO> addDevice(@RequestBody DeviceDTO deviceDTO) {
        DeviceDTO addedDevice = deviceService.addDevice(deviceDTO);
        return new ResponseEntity<>(addedDevice, HttpStatus.CREATED);
    }

    @PutMapping("/update/{deviceId}")
    public ResponseEntity<DeviceDTO> updateDevice(@PathVariable Integer deviceId, @RequestBody DeviceDTO deviceDTO) throws DeviceNotFoundException {
        deviceDTO.setDeviceId(deviceId); // Set the deviceId from the path variable
        DeviceDTO updatedDevice = deviceService.updateDevice(deviceDTO);
        return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
    }
    @GetMapping("/getdevice/{deviceId}")
    public ResponseEntity<DeviceDTO> getDeviceById(@PathVariable Integer deviceId) throws DeviceNotFoundException {
        DeviceDTO device = deviceService.getDeviceById(deviceId);
        if (device != null) {
            return new ResponseEntity<>(device, HttpStatus.OK);
        } else {
            throw new DeviceNotFoundException("Device not found with id: " + deviceId);
        }
    }

    @GetMapping("/getalldevice")
    public ResponseEntity<List<DeviceDTO>> getAllDevices() {
        List<DeviceDTO> devices = deviceService.getAllDevices();
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteDevice(@RequestBody Integer deviceId) throws DeviceNotFoundException {
        deviceService.deleteDevice(deviceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{deviceId}/addSoftware")
    public ResponseEntity<DeviceDTO> addSoftwareToDevice(@PathVariable Integer deviceId, @RequestBody SoftwareDTO softwareDTO) throws DeviceNotFoundException {
        DeviceDTO deviceWithSoftware = deviceService.addSoftwareToDevice(deviceId, softwareDTO);
        return new ResponseEntity<>(deviceWithSoftware, HttpStatus.OK);
    }	

    @PostMapping("/{deviceId}/lifecycle-events")
    public ResponseEntity<DeviceDTO> addLifecycleEventToDevice(@PathVariable Integer deviceId, @RequestBody LifecycleEventDTO lifecycleEventDTO) throws DeviceNotFoundException {
        DeviceDTO deviceWithLifecycleEvent = deviceService.addLifecycleEventToDevice(deviceId, lifecycleEventDTO);
        return new ResponseEntity<>(deviceWithLifecycleEvent, HttpStatus.OK);
    }
    
    
    @PostMapping("/updaterole")
    public ResponseEntity<String> updateUserRole(@RequestParam Integer userId, @RequestBody Role role) {
        try {
            String result = userService.updateRole(userId, role);
            return ResponseEntity.ok(result);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the user role.");
        }
    }
    
    
    @GetMapping("/getallusers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = regularUserService.getAllUsers(); // Assuming you have a userService to fetch users
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    
//    @GetMapping("/getallusers")
//   	public ResponseEntity<Iterable<UserEntity>> getAllUsers() {
//   		Iterable<UserEntity> users = userservice.getAllUsers();
//   		return ResponseEntity.ok(users);
//   	}
    
   	@GetMapping("/getallroles")
   	public ResponseEntity<Iterable<Role>> getAllRoles() {
   		Iterable<Role> role = roleService.getAllRole();
   		return ResponseEntity.ok(role);
   	}
}
