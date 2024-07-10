package com.training.licenselifecycletracker.service;

import java.util.Optional;

import com.training.licenselifecycletracker.entities.ERole;
import com.training.licenselifecycletracker.entities.Role;
import com.training.licenselifecycletracker.entities.User;
import com.training.licenselifecycletracker.exceptions.UserNotFoundException;

public interface UserService {
	
	//Create
		public User addUser(User User)throws UserNotFoundException;
		//Retrieve
		public User getUserById(Integer UserId)throws UserNotFoundException ;
		
		//Delete
		public String deleteUserById(Integer UserId)throws UserNotFoundException;
		
		//Update
		public User updateUser(User User)throws UserNotFoundException;
		
		public Boolean existsByUsername(String username);
		
		 //void updateUser(User updatedUser) throws UserNotFoundException;

		public User addUserEntity(User user);
		 
		public String updateRole(Integer userId, Role role) throws UserNotFoundException;
	 
		public Optional<User> findByUsername(String username);
	 
		//public Boolean existsByUsername(String username);
	 
		public Optional<User> findByRole(ERole role);

		
		
}
