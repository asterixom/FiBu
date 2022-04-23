package de.asterixom.fibu.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import de.asterixom.fibu.data.model.BelegmappingEntity;

@Repository
public interface BelegMappingRepository extends CrudRepository<BelegmappingEntity, BelegmappingEntity>{
	
}
