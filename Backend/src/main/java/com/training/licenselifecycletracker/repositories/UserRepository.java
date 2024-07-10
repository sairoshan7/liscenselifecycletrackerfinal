package com.training.licenselifecycletracker.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.User;
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	public User findByUsername(String username);
	
	public Boolean existsByEmail(String email);
	
	public Boolean existsByUsername(String username);
	
	public Optional<User> findByRole(ERole role);
	

	
	
}