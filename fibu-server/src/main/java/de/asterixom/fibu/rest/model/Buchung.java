package de.asterixom.fibu.rest.model;

import java.time.LocalDate;
import java.util.Set;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class Buchung {

	Integer buchungsnummer;
	
	@NotNull
	LocalDate datum;
	
	@NotNull
	@Size(max = 64)
	String name;
	
	@Size(max = 512)
	String beschreibung;
	
	@NotNull
	Double betrag;
	
	@NotNull
	@Valid
	Konto hauptkonto;
	
	@Valid
	Konto gegenkonto;
	
	Set<Beleg> belege;
}
