package de.asterixom.fibu.rest.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class Konto {

	@NotNull
	Integer id;
	
	@NotBlank
	@Size(max = 64)
	String name;
	
	@Size(max = 512)
	String beschreibung;
}
