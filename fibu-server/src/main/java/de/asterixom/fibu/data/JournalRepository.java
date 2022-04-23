package de.asterixom.fibu.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import de.asterixom.fibu.data.model.JournalEntity;

@Repository
public interface JournalRepository extends CrudRepository<JournalEntity, Integer>{
	
}
