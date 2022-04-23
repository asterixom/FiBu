package de.asterixom.fibu.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import de.asterixom.fibu.data.model.KontoEntity;

@Repository
public interface KontenRepository extends CrudRepository<KontoEntity, Integer>{

	List<KontoEntity> findAll();
}
