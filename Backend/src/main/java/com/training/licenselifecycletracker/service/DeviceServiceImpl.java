package com.training.licenselifecycletracker.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.LifecycleEventDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
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
    public DeviceDTO updateDevice(DeviceDTO deviceDTO) throws DeviceNotFoundException {
        Device deviceToUpdate = deviceRepository.findById(deviceDTO.getDeviceId())
                .orElseThrow(() -> new DeviceNotFoundException("Device not found with id: " + deviceDTO.getDeviceId()));

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
    public DeviceDTO getDeviceById(Integer deviceId) throws DeviceNotFoundException {
        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
        return optionalDevice.map(device -> modelMapper.map(device, DeviceDTO.class))
                .orElseThrow(() -> new DeviceNotFoundException("Device not found with id: " + deviceId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DeviceDTO> getAllDevices() {
        List<Device> devices = (List<Device>) deviceRepository.findAll();
        return devices.stream()
                .map(device -> modelMapper.map(device, DeviceDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteDevice(Integer deviceId) throws DeviceNotFoundException {
        Optional<Device> device = deviceRepository.findById(deviceId);
        if (device.isPresent()) {
            deviceRepository.deleteById(deviceId);
        } else {
            throw new DeviceNotFoundException("Device not found with id: " + deviceId);
        }
    }

    @Override
    @Transactional
    public DeviceDTO addSoftwareToDevice(Integer deviceId, SoftwareDTO softwareDTO) throws DeviceNotFoundException {
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
            throw new DeviceNotFoundException("Device not found with id: " + deviceId);
        }
    }

    @Override
    @Transactional
    public DeviceDTO addLifecycleEventToDevice(Integer deviceId, LifecycleEventDTO lifecycleEventDTO) throws DeviceNotFoundException {
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
            throw new DeviceNotFoundException("Device not found with id: " + deviceId);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<SoftwareDTO> viewEndOfSupportDates() {
        List<SoftwareDTO> softwareDTOList = ((List<Device>) deviceRepository.findAll()).stream()
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
    @Transactional
    public String updateRole(Integer userId, Role role) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            user.get().setRole(role);
            userRepository.save(user.get());
            return "Role Updated Successfully!!!";
        } else {
            throw new UserNotFoundException("User with id " + userId + " not found");
        }
    }

    // Add other methods and integrate exception handling as needed

}
