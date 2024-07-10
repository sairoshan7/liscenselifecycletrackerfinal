package com.training.licenselifecycletracker.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.training.licenselifecycletracker.dto.DeviceDTO;
//import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
//import com.training.licenselifecycletracker.dto.SoftwareDTO;
//import com.training.licenselifecycletracker.entities.Device;
//import com.training.licenselifecycletracker.entities.LifecycleEvent;
//import com.training.licenselifecycletracker.entities.Software;
//import com.training.licenselifecycletracker.repositories.DeviceRepository;
//import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
//import com.training.licenselifecycletracker.repositories.SoftwareRepository;
//
//@Service
//public class DeviceServiceImpl implements DeviceService {
//
//    private final DeviceRepository deviceRepository;
//    private final SoftwareRepository softwareRepository;
//    private final LifecycleEventRepository lifecycleEventRepository;
//    private final ModelMapper modelMapper;
//
//    @Autowired
//    public DeviceServiceImpl(DeviceRepository deviceRepository,
//                             SoftwareRepository softwareRepository,
//                             LifecycleEventRepository lifecycleEventRepository,
//                             ModelMapper modelMapper) {
//        this.deviceRepository = deviceRepository;
//        this.softwareRepository = softwareRepository;
//        this.lifecycleEventRepository = lifecycleEventRepository;
//        this.modelMapper = modelMapper;
//    }
//
//    @Override
//    @Transactional
//    public DeviceDTO addDevice(DeviceDTO deviceDTO) {
//        Device device = modelMapper.map(deviceDTO, Device.class);
//        Device savedDevice = deviceRepository.save(device);
//        return modelMapper.map(savedDevice, DeviceDTO.class);
//    }
//    
//    
//    @Override
//    @Transactional
//    public DeviceDTO updateDevice(DeviceDTO deviceDTO) {
//        Device deviceToUpdate = deviceRepository.findById(deviceDTO.getDeviceId())
//                .orElseThrow(() -> new RuntimeException("Device not found with id: " + deviceDTO.getDeviceId()));
//
//        // Update existing device entity
//        Device device= new Device();
//        modelMapper.map(deviceDTO, device);
//        System.out.println(device);
//        device.getLifecycleEvent().setDevice(device);
//
//        // Save the updated device
//        deviceRepository.save(device);
//        DeviceDTO upDto = modelMapper.map(device, DeviceDTO.class);
//        System.out.println(upDto);
//        return upDto ;
//    }
//
//    
//
//    @Override
//    @Transactional(readOnly = true)
//    public DeviceDTO getDeviceById(Integer deviceId) {
//        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
//        return optionalDevice.map(device -> modelMapper.map(device, DeviceDTO.class)).orElse(null);
//    }
//
//    @Override
//    @Transactional(readOnly = true)
//    public List<DeviceDTO> getAllDevices() {
//        List<Device> devices = (List<Device>) deviceRepository.findAll();
//        return devices.stream()
//                .map(device -> modelMapper.map(device, DeviceDTO.class))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    @Transactional
//    public void deleteDevice(Integer deviceId) {
//        deviceRepository.deleteById(deviceId);
//    }
//
//    @Override
//    @Transactional
//    public DeviceDTO addSoftwareToDevice(Integer deviceId, SoftwareDTO softwareDTO) {
//        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
//        if (optionalDevice.isPresent()) {
//            Device device = optionalDevice.get();
//            Software software = modelMapper.map(softwareDTO, Software.class);
//            software.setDevice(device);
//            Software savedSoftware = softwareRepository.save(software);
//            device.getSoftwareList().add(savedSoftware);
//            deviceRepository.save(device);
//            return modelMapper.map(device, DeviceDTO.class);
//        } else {
//            throw new RuntimeException("Device not found with id: " + deviceId);
//        }
//    }
//
//    @Override
//    @Transactional
//    public DeviceDTO addLifecycleEventToDevice(Integer deviceId, LifecycleEventDTO lifecycleEventDTO) {
//        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
//        if (optionalDevice.isPresent()) {
//            Device device = optionalDevice.get();
//            LifecycleEvent lifecycleEvent = modelMapper.map(lifecycleEventDTO, LifecycleEvent.class);
//            lifecycleEvent.setDevice(device);
//            LifecycleEvent savedLifecycleEvent = lifecycleEventRepository.save(lifecycleEvent);
//            device.setLifecycleEvent(savedLifecycleEvent);
//            deviceRepository.save(device);
//            return modelMapper.map(device, DeviceDTO.class);
//        } else {
//            throw new RuntimeException("Device not found with id: " + deviceId);
//        }
//    }
//}


import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.HardwareUpdateDTO;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.dto.LogFaultRequestDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.dto.UpdateFaultLogRequestDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
import com.training.licenselifecycletracker.repositories.SoftwareRepository;
import com.training.licenselifecycletracker.repositories.UserRepository;

@Service
public class DeviceServiceImpl implements DeviceService {


    
    @Autowired
    DeviceRepository deviceRepository;
    
    @Autowired
    SoftwareRepository softwareRepository;
    
    @Autowired
    LifecycleEventRepository lifecycleEventRepository;
    
    @Autowired
    ModelMapper modelMapper;
    
    @Autowired
    UserRepository userRepository;
    
    
    

    @Override
    @Transactional
    public DeviceDTO addDevice(DeviceDTO deviceDTO) {
        Device device = modelMapper.map(deviceDTO, Device.class);
        Device savedDevice = deviceRepository.save(device);
        return modelMapper.map(savedDevice, DeviceDTO.class);
    }

    @Override
    @Transactional
    public DeviceDTO updateDevice(DeviceDTO deviceDTO) {
        Device deviceToUpdate = deviceRepository.findById(deviceDTO.getDeviceId())
                .orElseThrow(() -> new RuntimeException("Device not found with id: " + deviceDTO.getDeviceId()));

        modelMapper.map(deviceDTO, deviceToUpdate);

        // Ensure lifecycle event association is correctly set
        if (deviceToUpdate.getLifecycleEvent() != null) {
            deviceToUpdate.getLifecycleEvent().setDevice(deviceToUpdate);
        }

        deviceRepository.save(deviceToUpdate);

        return modelMapper.map(deviceToUpdate, DeviceDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public DeviceDTO getDeviceById(Integer deviceId) {
        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
        return optionalDevice.map(device -> modelMapper.map(device, DeviceDTO.class)).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DeviceDTO> getAllDevices() {
        List<Device> devices = (List<Device>) deviceRepository.findAll();
        return devices.stream()
                .map(device -> modelMapper.map(device, DeviceDTO.class))
                .collect(Collectors.toList());
    }

//    @Override
    
//    public void deleteDevice(Integer deviceId) {
//        deviceRepository.deleteById(deviceId);
//    }
    
    @Override
    @Transactional
    public void deleteDevice(Integer deviceId)  {
        Optional<Device> device = deviceRepository.findById(deviceId);
        if (device.isPresent()) {
        	deviceRepository.deleteById(deviceId);
           
        } 
    }
    
    

    @Override
    @Transactional
    public DeviceDTO addSoftwareToDevice(Integer deviceId, SoftwareDTO softwareDTO) {
        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
        if (optionalDevice.isPresent()) {
            Device device = optionalDevice.get();
            Software software = modelMapper.map(softwareDTO, Software.class);
            software.setDevice(device);
            Software savedSoftware = softwareRepository.save(software);
            device.getSoftwareList().add(savedSoftware);
            deviceRepository.save(device);
            return modelMapper.map(device, DeviceDTO.class);
        } else {
            throw new RuntimeException("Device not found with id: " + deviceId);
        }
    }

    @Override
    @Transactional
    public DeviceDTO addLifecycleEventToDevice(Integer deviceId, LifecycleEventDTO lifecycleEventDTO) {
        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
        if (optionalDevice.isPresent()) {
            Device device = optionalDevice.get();
            LifecycleEvent lifecycleEvent = modelMapper.map(lifecycleEventDTO, LifecycleEvent.class);
            lifecycleEvent.setDevice(device);
            LifecycleEvent savedLifecycleEvent = lifecycleEventRepository.save(lifecycleEvent);
            device.setLifecycleEvent(savedLifecycleEvent);
            deviceRepository.save(device);
            return modelMapper.map(device, DeviceDTO.class);
        } else {
            throw new RuntimeException("Device not found with id: " + deviceId);
        }
    }

    
    
    // tech support
    
    @Override
    @Transactional
    public String logFault(LogFaultRequestDTO logFaultRequest) {
        List<Device> devices = deviceRepository.findByDeviceName(logFaultRequest.getDeviceName());
        if (!devices.isEmpty()) {
            StringBuilder result = new StringBuilder();
            for (Device device : devices) {
                // Get the lifecycle event or create a new one if it doesn't exist
                LifecycleEvent lifecycleEvent = device.getLifecycleEvent();
                if (lifecycleEvent == null) {
                    lifecycleEvent = new LifecycleEvent();
                    lifecycleEvent.setDevice(device);
                    device.setLifecycleEvent(lifecycleEvent);
                }

                // Update the lifecycle event with fault details
                lifecycleEvent.setDescription(logFaultRequest.getDescription());

                // Convert String date to LocalDate
                LocalDate date = LocalDate.parse(logFaultRequest.getDate());
                lifecycleEvent.setEventDate(date);

                lifecycleEvent.setCategory(logFaultRequest.getCategory());
                lifecycleEvent.setEventType("Audit");

                // Save the device to persist the changes
                deviceRepository.save(device);

                // Append result for each device
                result.append("Fault logged successfully for device: ")
                      .append(device.getDeviceName())
                      .append("\n");
            }
            return result.toString();
        } else {
            throw new RuntimeException("No devices found with name: " + logFaultRequest.getDeviceName());
        }
    }

    @Override
    @Transactional
    public String updateFaultLog(UpdateFaultLogRequestDTO updateFaultLogRequest) {
        List<Device> devices = deviceRepository.findByDeviceName(updateFaultLogRequest.getDeviceName());
        if (!devices.isEmpty()) {
            StringBuilder result = new StringBuilder();
            for (Device device : devices) {
                // Ensure there is a lifecycle event associated with the device
                LifecycleEvent lifecycleEvent = device.getLifecycleEvent();
                if (lifecycleEvent == null) {
                    throw new RuntimeException("No fault log found for Device with name: " + updateFaultLogRequest.getDeviceName());
                }

                // Update the lifecycle event details
                lifecycleEvent.setDescription(updateFaultLogRequest.getRepairDetails());
                lifecycleEvent.setCategory(updateFaultLogRequest.getCategory());
                lifecycleEvent.setEventType(updateFaultLogRequest.getEventType());

                // Save the device to persist the changes
                deviceRepository.save(device);

                // Append result for each device
                result.append("Fault log updated successfully for device: ")
                      .append(device.getDeviceName())
                      .append("\n");
            }
            return result.toString();
        } else {
            throw new RuntimeException("No devices found with name: " + updateFaultLogRequest.getDeviceName());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<SoftwareDTO> viewEndOfSupportDates() {
        List<SoftwareDTO> softwareDTOList = ((Collection<Device>) deviceRepository.findAll()).stream()
                .flatMap(device -> device.getSoftwareList().stream()) // Flatten to get all software
                .filter(software -> software.getSupportEndDate() != null) // Filter out software without end dates
                .sorted(Comparator.comparing(Software::getSupportEndDate)) // Sort by end date
                .map(software -> modelMapper.map(software, SoftwareDTO.class)) // Map to SoftwareDTO
                .collect(Collectors.toList()); // Collect into a list

        return softwareDTOList;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<LifecycleEventDTO> getAllLifecycleEvents() {
        List<LifecycleEvent> lifecycleEvents = (List<LifecycleEvent>) lifecycleEventRepository.findAll();

        return lifecycleEvents.stream()
                .map(lifecycleEvent -> modelMapper.map(lifecycleEvent, LifecycleEventDTO.class))
                .collect(Collectors.toList());
    }


    @Override
	public String updateRole(Integer userId, Role role) throws UserNotFoundException {
		
		Optional<User> user= userRepository.findById(userId);
		if(user.isPresent())
		{
		  user.get().setRole(role);
		  userRepository.save(user.get());
		  return "Role Updated Successfully!!!";
		  
		}
		else {
			throw new UserNotFoundException("User with "+userId+" not found");
		}
	} 
   

}