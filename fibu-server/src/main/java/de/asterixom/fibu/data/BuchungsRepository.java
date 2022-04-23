package de.asterixom.fibu.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import de.asterixom.fibu.data.model.BuchungsEntity;

@Repository
public interface BuchungsRepository extends CrudRepository<BuchungsEntity, Integer>{
	List<BuchungsEntity> findAll();
}
