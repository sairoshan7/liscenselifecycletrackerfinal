package com.training.licenselifecycletracker.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
import com.training.licenselifecycletracker.exceptions.DeviceNotFoundException;
import com.training.licenselifecycletracker.exceptions.RequestLogNotFoundException;
import com.training.licenselifecycletracker.repositories.DeviceRepository;
import com.training.licenselifecycletracker.repositories.LifecycleEventRepository;
import com.training.licenselifecycletracker.repositories.RequestLogRepository;

import jakarta.transaction.Transactional;

@Service
public class TechnicalSupportServiceImpl implements TechnicalService {

    @Autowired
    private RequestLogRepository requestLogRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private LifecycleEventRepository lifecycleEventRepository;

    @Override
    public List<RequestLog> getAllRequestLogs() {
        return (List<RequestLog>) requestLogRepository.findAll();
    }

    @Override
    public DeviceDTO updateDeviceDates(HardwareUpdateDTO hardwareupdatedto) throws DeviceNotFoundException {
        Device deviceToUpdate = deviceRepository.findById(hardwareupdatedto.getDeviceId())
                .orElseThrow(() -> new DeviceNotFoundException("Device not found with id: " + hardwareupdatedto.getDeviceId()));

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

        LifecycleEvent lifecycle = lifecycleEventRepository.findByDevice_DeviceId(hardwareupdatedto.getDeviceId());
        if (lifecycle != null) {
            lifecycle.setDescription("Replaced the device");
            lifecycle.setEventType("Active");
            lifecycle.setEventDate(LocalDate.now());
            lifecycleEventRepository.save(lifecycle);
        }

        return modelMapper.map(deviceToUpdate, DeviceDTO.class);
    }

    @Override
    @Transactional
    public DeviceDTO updateSoftwareDates(SoftwareUpdateDTO softwareUpdateDTO) throws DeviceNotFoundException {
        // Find the device by software ID
        Device deviceToUpdate = deviceRepository.findBySoftwareList_SoftwareId(softwareUpdateDTO.getSoftwareId())
                .orElseThrow(() -> new DeviceNotFoundException("Device not found with software id: " + softwareUpdateDTO.getSoftwareId()));

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

    @Override
    public boolean deleteRequestLogById(Integer id) throws RequestLogNotFoundException {
        Optional<RequestLog> requestLogOptional = requestLogRepository.findById(id);

        if (requestLogOptional.isPresent()) {
            requestLogRepository.deleteById(id);
            return true; // Deletion successful
        } else {
            throw new RequestLogNotFoundException("Request log not found with id: " + id);
        }
    }
}
