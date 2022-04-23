package de.asterixom.fibu.rest.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class Konto {

	Integer id;
	
	@NotNull
	@Size(max = 64)
	String name;
	
	@NotNull
	@Size(max = 512)
	String beschreibung;
}
