package de.asterixom.fibu.data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import de.asterixom.fibu.data.model.BuchungsEntity;
import de.asterixom.fibu.data.model.KontoEntity;

@Repository
public interface BuchungsRepository extends CrudRepository<BuchungsEntity, Integer>{
	
	List<BuchungsEntity> findAll();
	
	
	List<BuchungsEntity> findAllByDatumBetween(LocalDate datumStart, LocalDate datumEnd);
	
	List<BuchungsEntity> findAllByDatumBefore(LocalDate datum);
	
	@Query("SELECT SUM(CASE buchung.hauptkonto WHEN :konto THEN buchung.betrag ELSE -buchung.betrag END) FROM BuchungsEntity buchung WHERE buchung.datum < :datum AND ( buchung.hauptkonto = :konto OR buchung.gegenkonto = :konto )")
	BigDecimal getSumBeforeDatumByKonto(@Param("datum") LocalDate datum, @Param("konto") KontoEntity konto);
}
