package com.training.licenselifecycletracker.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Integer> {
  Optional<Role> findByRoleName(ERole name);
}
