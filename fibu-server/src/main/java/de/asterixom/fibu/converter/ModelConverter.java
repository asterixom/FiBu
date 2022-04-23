package de.asterixom.fibu.converter;

import de.asterixom.fibu.data.model.BuchungsEntity;
import de.asterixom.fibu.data.model.KontoEntity;
import de.asterixom.fibu.rest.model.Buchung;
import de.asterixom.fibu.rest.model.Konto;

public abstract class ModelConverter {

	public static Buchung convert(BuchungsEntity entity) {
		if(entity == null) return null;
		return Buchung.builder() //
			.buchungsnummer(entity.getBuchungsnummer()) //
			.datum(entity.getDatum()) //
			.name(entity.getName()) //
			.beschreibung(entity.getBeschreibung()) //
			.betrag(entity.getBetrag()) //
			.hauptkonto(convert(entity.getHauptkonto())) //
			.build();
	}
	
	public static BuchungsEntity convert(Buchung buchung) {
		if(buchung == null) return null;
		return BuchungsEntity.builder() //
			.buchungsnummer(buchung.getBuchungsnummer()) //
			.datum(buchung.getDatum()) //
			.name(buchung.getName()) //
			.beschreibung(buchung.getBeschreibung()) //
			.betrag(buchung.getBetrag()) //
			.hauptkonto(convert(buchung.getHauptkonto())) //
			.build();
	}
	
	public static KontoEntity convert(Konto konto) {
		if(konto == null) return null;
		return KontoEntity.builder() //
			.id(konto.getId()) //
			.name(konto.getName()) //
			.beschreibung(konto.getBeschreibung()) //
			.build();
	}
	
	public static Konto convert(KontoEntity konto) {
		if(konto == null) return null;
		return Konto.builder() //
			.id(konto.getId()) //
			.name(konto.getName()) //
			.beschreibung(konto.getBeschreibung()) //
			.build();
	}
	
	public static BuchungsEntity update(BuchungsEntity buchung, Buchung with) {
		if(buchung == null) return null;
		if(with == null) return buchung;
		return buchung.toBuilder() //
			.datum(with.getDatum()) //
			.name(with.getName()) //
			.beschreibung(with.getBeschreibung()) //
			.betrag(with.getBetrag()) //
			.hauptkonto(convert(with.getHauptkonto())) //
			.build();
	}
	
	public static Buchung update(Buchung buchung, BuchungsEntity with) {
		if(buchung == null) return null;
		if(with == null) return buchung;
		return buchung.toBuilder() //
			.datum(with.getDatum()) //
			.name(with.getName()) //
			.beschreibung(with.getBeschreibung()) //
			.betrag(with.getBetrag()) //
			.hauptkonto(convert(with.getHauptkonto())) //
			.build();
	}
	
	public static KontoEntity update(KontoEntity konto, Konto with) {
		if(konto == null) return null;
		if(with == null) return konto;
		return konto.toBuilder() //
			.name(with.getName()) //
			.beschreibung(with.getBeschreibung()) //
			.build();
	}
	
	public static Konto update(Konto konto, KontoEntity with) {
		if(konto == null) return null;
		if(with == null) return konto;
		return konto.toBuilder() //
			.name(with.getName()) //
			.beschreibung(with.getBeschreibung()) //
			.build();
	}
}
