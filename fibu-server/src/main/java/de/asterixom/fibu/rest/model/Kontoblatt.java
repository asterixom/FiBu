package de.asterixom.fibu.rest.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

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
	
	@NotNull
	@Builder.Default
	BigDecimal summe = BigDecimal.ZERO;
	
	@NotNull
	@Builder.Default
	BigDecimal einnahmen = BigDecimal.ZERO;
	
	@NotNull
	@Builder.Default
	BigDecimal ausgaben = BigDecimal.ZERO;
	
	@NotNull
	@Builder.Default
	BigDecimal alterSaldo = BigDecimal.ZERO;
	
	public void addToSum(BigDecimal betrag) {
		summe = summe.add(betrag);
		if(betrag.signum()>0) {
			einnahmen = einnahmen.add(betrag);
		}
		if(betrag.signum()<0) {
			ausgaben = ausgaben.add(betrag);
		}
	}
}
