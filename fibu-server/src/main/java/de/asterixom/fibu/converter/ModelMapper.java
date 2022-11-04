package de.asterixom.fibu.converter;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import de.asterixom.fibu.data.model.BelegEntity;
import de.asterixom.fibu.data.model.BuchungsEntity;
import de.asterixom.fibu.data.model.KontoEntity;
import de.asterixom.fibu.rest.model.Beleg;
import de.asterixom.fibu.rest.model.Buchung;
import de.asterixom.fibu.rest.model.Konto;

@Mapper
public interface ModelMapper {

	ModelMapper MAPPER = Mappers.getMapper(ModelMapper.class);
	
	BelegEntity toEntity(Beleg beleg);
	
	@InheritInverseConfiguration(name="toEntity")
	Beleg fromEntity(BelegEntity beleg);
	
	BuchungsEntity toEntity(Buchung buchung);
	
	@InheritInverseConfiguration(name="toEntity")
	Buchung fromEntity(BuchungsEntity buchung);
	
	KontoEntity toEntity(Konto konto);
	
	@InheritInverseConfiguration(name="toEntity")
	Konto fromEntity(KontoEntity konto);
	
	KontoEntity updateEntity(Konto konto, @MappingTarget KontoEntity entity);
	
	BuchungsEntity updateEntity(Buchung buchung, @MappingTarget BuchungsEntity entity);
}
