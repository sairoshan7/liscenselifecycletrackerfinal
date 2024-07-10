package com.training.licenselifecycletracker.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.training.licenselifecycletracker.entities.Device;
import com.training.licenselifecycletracker.entities.RequestLog;

@Repository
public interface RequestLogRepository extends CrudRepository<RequestLog, Integer> {

}
