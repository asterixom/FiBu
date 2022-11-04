package de.asterixom.fibu.converter;

import java.util.Set;
import java.util.stream.Collectors;

import de.asterixom.fibu.data.model.BelegEntity;
import de.asterixom.fibu.data.model.BuchungsEntity;
import de.asterixom.fibu.data.model.KontoEntity;
import de.asterixom.fibu.rest.model.Beleg;
import de.asterixom.fibu.rest.model.Buchung;
import de.asterixom.fibu.rest.model.Konto;

public abstract class ModelConverter {

	public static Buchung convert(BuchungsEntity entity) {
		if (entity == null)
			return null;
		return Buchung.builder()
				.buchungsnummer(entity.getBuchungsnummer())
				.datum(entity.getDatum())
				.name(entity.getName())
				.beschreibung(entity.getBeschreibung())
				.betrag(entity.getBetrag())
				.hauptkonto(convert(entity.getHauptkonto()))
				.gegenkonto(convert(entity.getGegenkonto()))
				.belege(convertToBeleg(entity.getBelege()))
				.build();
	}

	public static BuchungsEntity convert(Buchung buchung) {
		if (buchung == null)
			return null;
		return BuchungsEntity.builder()
				.buchungsnummer(buchung.getBuchungsnummer())
				.datum(buchung.getDatum())
				.name(buchung.getName())
				.beschreibung(buchung.getBeschreibung())
				.betrag(buchung.getBetrag())
				.hauptkonto(convert(buchung.getHauptkonto()))
				.gegenkonto(convert(buchung.getGegenkonto()))
				.belege(convertToEntity(buchung.getBelege()))
				.build();
	}

	public static KontoEntity convert(Konto konto) {
		if (konto == null)
			return null;
		return KontoEntity.builder()
				.id(konto.getId())
				.name(konto.getName())
				.beschreibung(konto.getBeschreibung())
				.build();
	}

	public static Konto convert(KontoEntity konto) {
		if (konto == null)
			return null;
		return Konto.builder()
				.id(konto.getId())
				.name(konto.getName())
				.beschreibung(konto.getBeschreibung())
				.build();
	}
	
	public static Set<Beleg> convertToBeleg(Set<BelegEntity> belege){
		return belege.parallelStream().map(ModelConverter::convert).collect(Collectors.toSet());
	}
	
	public static Set<BelegEntity> convertToEntity(Set<Beleg> belege){
		return belege.parallelStream().map(ModelConverter::convert).collect(Collectors.toSet());
	}

	public static Beleg convert(BelegEntity beleg) {
		if (beleg == null)
			return null;
		return Beleg.builder()
				.belegnummer(beleg.getBelegnummer())
				.beschreibung(beleg.getBeschreibung())
				.contenttype(beleg.getContenttype())
				.filename(beleg.getFilename())
				.filetype(beleg.getFiletype())
				.name(beleg.getName())
				.uuid(beleg.getUuid())
				.build();
	}
	
	public static BelegEntity convert(Beleg beleg) {
		if (beleg == null)
			return null;
		return BelegEntity.builder()
				.belegnummer(beleg.getBelegnummer())
				.beschreibung(beleg.getBeschreibung())
				.contenttype(beleg.getContenttype())
				.filename(beleg.getFilename())
				.filetype(beleg.getFiletype())
				.name(beleg.getName())
				.uuid(beleg.getUuid())
				.build();
	}

	public static BuchungsEntity update(BuchungsEntity buchung, Buchung with) {
		if (buchung == null)
			return null;
		if (with == null)
			return buchung;
		return buchung.toBuilder()
				.datum(with.getDatum())
				.name(with.getName())
				.beschreibung(with.getBeschreibung())
				.betrag(with.getBetrag())
				.hauptkonto(convert(with.getHauptkonto()))
				.belege(convertToEntity(with.getBelege()))
				.build();
	}

	public static Buchung update(Buchung buchung, BuchungsEntity with) {
		if (buchung == null)
			return null;
		if (with == null)
			return buchung;
		return buchung.toBuilder()
				.datum(with.getDatum())
				.name(with.getName())
				.beschreibung(with.getBeschreibung())
				.betrag(with.getBetrag())
				.hauptkonto(convert(with.getHauptkonto()))
				.belege(convertToBeleg(with.getBelege()))
				.build();
	}

	public static KontoEntity update(KontoEntity konto, Konto with) {
		if (konto == null)
			return null;
		if (with == null)
			return konto;
		return konto.toBuilder()
				.name(with.getName())
				.beschreibung(with.getBeschreibung())
				.build();
	}

	public static Konto update(Konto konto, KontoEntity with) {
		if (konto == null)
			return null;
		if (with == null)
			return konto;
		return konto.toBuilder()
				.name(with.getName())
				.beschreibung(with.getBeschreibung())
				.build();
	}

}
