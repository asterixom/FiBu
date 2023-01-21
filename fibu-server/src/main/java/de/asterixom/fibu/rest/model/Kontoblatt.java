package de.asterixom.fibu.rest.model;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder(toBuilder = true)
@RequiredArgsConstructor
@AllArgsConstructor
public class Kontoblatt {

	@NotNull
	final Konto konto;
	
	@NotNull
	@Builder.Default
	List<Buchung> buchungen = new ArrayList<>();
}
