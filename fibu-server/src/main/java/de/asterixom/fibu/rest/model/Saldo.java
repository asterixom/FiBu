package de.asterixom.fibu.rest.model;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder(toBuilder = true)
@RequiredArgsConstructor
@AllArgsConstructor
public class Saldo {

	@NotNull
	final Konto konto;
	
	Double vortrag;
	Double haben;
	Double soll;
}
