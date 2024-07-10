package com.training.licenselifecycletracker.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.training.licenselifecycletracker.entities.Device;

@Repository
public interface DeviceRepository extends CrudRepository<Device, Integer> {
	
	public List<Device> findByDeviceName(String deviceName);
	public List<Device> findByStatus(String status);
	public List<Device> findByDeviceType(String deviceType);
	public List<Device> findByPurchaseDate(LocalDate purchaseDate);
	//public List<Device> findByExpirationDate(LocalDate expirationDate);
	public List<Device> findByEndOfSupportDate(LocalDate endOfSupportDate);
	
	List<Device> findByUserUserId(Integer userId);
	Optional<Device> findBySoftwareList_SoftwareId(Integer softwareId);
	
	
	

}
