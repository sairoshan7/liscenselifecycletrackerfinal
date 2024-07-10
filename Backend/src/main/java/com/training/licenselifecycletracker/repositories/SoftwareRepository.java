package com.training.licenselifecycletracker.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.training.licenselifecycletracker.entities.Software;

@Repository
public interface SoftwareRepository extends CrudRepository<Software, Integer> {
	public Software findBySoftwareName(String softwareName);
	public List<Software> findByStatus(String status);
	public List<Software> findByLicenseKey(String licenseKey);
	public List<Software> findByPurchaseDate(LocalDate purchaseDate);
	public List<Software> findByExpirationDate(LocalDate expirationDate);
	public List<Software> findBySupportEndDate(LocalDate supportEndDate);
	public List<Software> findByExpirationDateBefore(LocalDate date);
	
	public List<Software> findByDeviceDeviceName(String deviceName);
	
	
	
}