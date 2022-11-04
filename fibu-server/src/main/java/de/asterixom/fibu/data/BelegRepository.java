package de.asterixom.fibu.data;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import de.asterixom.fibu.data.model.BelegEntity;

@Repository
public interface BelegRepository extends CrudRepository<BelegEntity, Integer>{

	Optional<BelegEntity> findByUuid(String uuid);
	
}
