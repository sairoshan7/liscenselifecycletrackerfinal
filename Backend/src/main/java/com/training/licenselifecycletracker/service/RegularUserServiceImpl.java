package com.training.licenselifecycletracker.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.training.licenselifecycletracker.dto.DeviceDTO;
import com.training.licenselifecycletracker.dto.ReplaceDTO;
import com.training.licenselifecycletracker.dto.SoftwareDTO;
import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.LifecycleEvent;
import com.training.licenselifecycletracker.entities.RequestLog;
import com.training.licenselifecycletracker.entities.Software;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
import com.training.licenselifecycletracker.repositories.RequestLogRepository;
import com.training.licenselifecycletracker.repositories.SoftwareRepository;
import com.training.licenselifecycletracker.repositories.UserRepository;

@Service
public class RegularUserServiceImpl implements RegularUserService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private SoftwareRepository softwareRepository;

    @Autowired
    private LifecycleEventRepository lifecycleEventRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RequestLogRepository requestrepo;

    @Override
    @Transactional(readOnly = true)
    public List<DeviceDTO> getDevicesByUserId(Integer userId) {
        List<Device> devices = deviceRepository.findByUserUserId(userId);
        return devices.stream()
                .map(device -> modelMapper.map(device, DeviceDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SoftwareDTO> getSoftwareByDeviceName(String deviceName) {
        List<Software> softwareList = softwareRepository.findByDeviceDeviceName(deviceName);
        return softwareList.stream()
                .map(software -> modelMapper.map(software, SoftwareDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public String requestRenew(SoftwareDTO softwareDTO) {
        RequestLog requestLog = new RequestLog();

        requestLog.setType("Renew");
        requestLog.setAssetid(softwareDTO.getSoftwareId());
        requestLog.setItem(softwareDTO.getSoftwareName());
        requestLog.setDetails(softwareDTO.getVersion());
        requestLog.setRequestDate(LocalDate.now());

        requestrepo.save(requestLog);

        return "Renewal Request sent successfully";
    }

    @Override
    public String requestReplacement(ReplaceDTO replaceDTO) {
        RequestLog requestLog = new RequestLog();

        requestLog.setType("Replace");
        requestLog.setAssetid(replaceDTO.getDeviceId());
        requestLog.setItem(replaceDTO.getDeviceName());
        requestLog.setDetails(replaceDTO.getDeviceType());
        requestLog.setRequestDate(LocalDate.now());

        requestrepo.save(requestLog);

        LifecycleEvent lifecycle = lifecycleEventRepository.findByDevice_DeviceId(replaceDTO.getDeviceId());
        if (lifecycle != null) {
            lifecycle.setEventDate(LocalDate.now());
            lifecycle.setEventType("Audit");
            lifecycle.setDescription("On process for Replacement");
            lifecycleEventRepository.save(lifecycle);
        }

        Optional<Device> device = deviceRepository.findById(replaceDTO.getDeviceId());
        if (device.isPresent()) {
            Device deviceToUpdate = device.get();
            deviceToUpdate.setStatus("Unavailable");
            deviceRepository.save(deviceToUpdate);
        }

        return "Replacement Request sent successfully";
    }

    @Override
    public List<Device> searchDevices(String deviceName, String status, String deviceType) throws DeviceNotFoundException {
        if (deviceName != null) {
            List<Device> devices = deviceRepository.findByDeviceName(deviceName);
            if (devices.isEmpty()) {
                throw new DeviceNotFoundException("No devices found with name: " + deviceName);
            }
            return devices;
        } else if (status != null) {
            List<Device> devices = deviceRepository.findByStatus(status);
            if (devices.isEmpty()) {
                throw new DeviceNotFoundException("No devices found with status: " + status);
            }
            return devices;
        } else if (deviceType != null) {
            List<Device> devices = deviceRepository.findByDeviceType(deviceType);
            if (devices.isEmpty()) {
                throw new DeviceNotFoundException("No devices found with type: " + deviceType);
            }
            return devices;
        } else {
            List<Device> devices = (List<Device>) deviceRepository.findAll();
            if (devices.isEmpty()) {
                throw new DeviceNotFoundException("No devices found");
            }
            return devices;
        }
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }
}
