package com.training.licenselifecycletracker.service;

import java.util.Optional;

import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.Role;
 
 
public interface RoleService {
	
	public Optional<Role> findRoleByName(ERole role);
	public Optional<Role> findRoleById(Integer id);
 
}