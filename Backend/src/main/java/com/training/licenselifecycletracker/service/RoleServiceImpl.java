package com.training.licenselifecycletracker.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.repositories.RoleRepository;


 
 
@Service
public class RoleServiceImpl implements RoleService {
 
	@Autowired
	RoleRepository repo;
	@Override
	public Optional<Role> findRoleByName(ERole role) {
		Optional<Role> r= repo.findByRoleName(role);
		return r;
	}
	@Override
	public Optional<Role> findRoleById(Integer id) {
		Optional<Role> role= repo.findById(id);
		return role;
	}
	
 
}