package de.asterixom.fibu.rest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.websocket.server.PathParam;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import de.asterixom.fibu.converter.ModelMapper;
import de.asterixom.fibu.data.BelegRepository;
import de.asterixom.fibu.data.BuchungsRepository;
import de.asterixom.fibu.data.KontenRepository;
import de.asterixom.fibu.data.model.BelegEntity;
import de.asterixom.fibu.data.model.BuchungsEntity;
import de.asterixom.fibu.data.model.KontoEntity;
import de.asterixom.fibu.properties.FiBuProperties;
import de.asterixom.fibu.rest.model.Beleg;
import de.asterixom.fibu.rest.model.Buchung;
import de.asterixom.fibu.rest.model.Konto;
import de.asterixom.fibu.rest.model.Kontoblatt;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
@Validated
public class ApiEndpoint {

	private final BuchungsRepository buchungsRepository;
	private final KontenRepository kontenRepository;
	private final BelegRepository belegRepository;
	private final FiBuProperties properties;
	private final ModelMapper mapper;

	@GetMapping("/buchungen")
	public ResponseEntity<List<Buchung>> buchungen() {
		List<Buchung> buchungen = buchungsRepository.findAll()
				.stream()
				.map(mapper::fromEntity)
				.collect(Collectors.toList());
		return ResponseEntity.ok(buchungen);
	}
	
	@GetMapping("/buchungen/{from}/{to}")
	public ResponseEntity<List<Buchung>> buchungen(@PathVariable("from") @DateTimeFormat(pattern = "yyyy-MM-dd") @NotNull LocalDate from, @PathVariable("to") @DateTimeFormat(pattern = "yyyy-MM-dd") @NotNull LocalDate to) {
		List<Buchung> buchungen = buchungsRepository.findAllByDatumBetween(from,to)
				.stream()
				.map(mapper::fromEntity)
				.collect(Collectors.toList());
		return ResponseEntity.ok(buchungen);
	}

	@GetMapping("/kontoblaetter")
	public ResponseEntity<Collection<Kontoblatt>> kontoblaetter(){
		Map<Konto,Kontoblatt> kontoblaetter = new HashMap<>();
		kontenRepository.findAll().stream().map(mapper::fromEntity).forEach(k -> kontoblaetter.put(k, new Kontoblatt(k)));
		buchungsRepository.findAll().stream().map(mapper::fromEntity).forEach(buchung -> {
			kontoblaetter.get(buchung.getHauptkonto()).getBuchungen().add(buchung);
			if(buchung.getGegenkonto()!=null) kontoblaetter.get(buchung.getGegenkonto()).getBuchungen().add(buchung);
		});
		return ResponseEntity.ok(kontoblaetter.values());
	}
	
	@GetMapping("/kontoblaetter/{from}/{to}")
	public ResponseEntity<Collection<Kontoblatt>> kontoblaetter(@PathVariable("from") @DateTimeFormat(pattern = "yyyy-MM-dd") @NotNull LocalDate from, @PathVariable("to") @DateTimeFormat(pattern = "yyyy-MM-dd") @NotNull LocalDate to){
		Map<Konto,Kontoblatt> kontoblaetter = new HashMap<>();
		kontenRepository.findAll().stream().map(mapper::fromEntity).forEach(k -> kontoblaetter.put(k, new Kontoblatt(k)));
		kontoblaetter.forEach((k,v)->{
			BigDecimal sum = buchungsRepository.getSumBeforeDatumByKonto(from, mapper.toEntity(k));
			v.setAlterSaldo(sum!=null?sum:BigDecimal.ZERO);
		});
		buchungsRepository.findAllByDatumBetween(from,to).stream().map(mapper::fromEntity).forEach(buchung -> {
			kontoblaetter.get(buchung.getHauptkonto()).getBuchungen().add(buchung);
			kontoblaetter.get(buchung.getHauptkonto()).addToSum(buchung.getBetrag());
			if(buchung.getGegenkonto()!=null) {
				kontoblaetter.get(buchung.getGegenkonto()).getBuchungen().add(buchung);
				kontoblaetter.get(buchung.getGegenkonto()).addToSum(buchung.getBetrag().negate());
			}
		});
		return ResponseEntity.ok(kontoblaetter.values());
	}

	@GetMapping("/buchungen/{id}")
	public ResponseEntity<Buchung> buchung(@PathVariable("id") @NotNull String id) {
		log.debug("Called /buchung/" + id);
		return ResponseEntity.of(buchungsRepository.findById(Integer.valueOf(id)).map(mapper::fromEntity));
	}

	@PutMapping("/buchungen")
	public ResponseEntity<Buchung> buchung(@RequestBody @NotNull @Valid Buchung buchung) {
		BuchungsEntity buchungsEntity = null;
		// Wenn eine Buchungsnummer übergeben wird:
		if (buchung.getBuchungsnummer() != null) {
			Optional<BuchungsEntity> vorhandeneBuchung = buchungsRepository.findById(buchung.getBuchungsnummer());
			// Bei ungültiger Nummer wird ein Fehler geworfen
			if (vorhandeneBuchung.isEmpty()) {
				throw new HttpClientErrorException(HttpStatus.NOT_FOUND,
						"Buchung Nummer " + buchung.getBuchungsnummer()
								+ " konnte nicht gefunden werden! Update fehlgeschlagen!");
			}
			// Bei gültiger Nummer wird der vorhandene Eintrag aktualisiert
			buchungsEntity = mapper.updateEntity(buchung, vorhandeneBuchung.get());
			// Wenn keine Buchungsnummer übergeben wird - neue Buchung anlegen
		} else {
			buchungsEntity = mapper.toEntity(buchung);
		}

		// Hauptkonto prüfen
		Optional<KontoEntity> hauptkonto = kontenRepository.findById(buchung.getHauptkonto().getId());
		// Wenn das übergebene Hauptkonto nicht existiert, wird ein Fehler geworfen.
		if (hauptkonto.isEmpty()) {
			throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Angegebenes Hauptkonto ist nicht vorhanden!");
		}
		// Bei gültigem Hauptkonto wird dieses mit der Buchung verknüpft (ersetzt)
		buchungsEntity.setHauptkonto(hauptkonto.get());

		// Gegenkonto prüfen
		Optional<KontoEntity> gegenkonto = kontenRepository.findById(buchung.getGegenkonto().getId());
		// Wenn das übergebene Gegenkonto nicht existiert, wird ein Fehler geworfen.
		if (gegenkonto.isEmpty()) {
			throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Angegebenes Gegenkonto ist nicht vorhanden!");
		}
		// Bei gültigem Gegenkonto wird dieses mit der Buchung verknüpft (ersetzt)
		buchungsEntity.setGegenkonto(gegenkonto.get());

		for (Beleg beleg : buchung.getBelege()) {
			Optional<BelegEntity> b = belegRepository.findByUuid(beleg.getUuid());
			if (b.isPresent()) {
				b.get().setBuchung(buchungsEntity);
				belegRepository.save(b.get());
			}
		}

		// Buchung speichern und Ergebnis zurückgeben
		buchungsEntity = buchungsRepository.save(buchungsEntity);
		return ResponseEntity.ok(mapper.fromEntity(buchungsEntity));
	}

	@GetMapping("/konten")
	public ResponseEntity<List<Konto>> konto() {
		return ResponseEntity
				.ok(kontenRepository.findAll().stream().map(mapper::fromEntity).collect(Collectors.toList()));
	}

	@GetMapping("/konten/standardGegenkonto")
	public ResponseEntity<Konto> standardGegenkonto() {
		return ResponseEntity.of(kontenRepository.findById(properties.getStandardGegenkonto()).map(mapper::fromEntity));
	}
}
