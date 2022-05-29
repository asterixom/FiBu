package de.asterixom.fibu.rest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import de.asterixom.fibu.converter.ModelConverter;
import de.asterixom.fibu.data.BuchungsRepository;
import de.asterixom.fibu.data.KontenRepository;
import de.asterixom.fibu.data.model.BuchungsEntity;
import de.asterixom.fibu.data.model.KontoEntity;
import de.asterixom.fibu.rest.model.Buchung;
import de.asterixom.fibu.rest.model.HelloWorldData;
import de.asterixom.fibu.rest.model.Konto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Log4j2
public class ApiEndpoint {

	private final BuchungsRepository buchungsRepository;
	private final KontenRepository kontenRepository;
	
	@GetMapping("/hello")
	public ResponseEntity<HelloWorldData> helloWorld(){
		return ResponseEntity.ok(HelloWorldData.builder().build());
	}
	
	
	@GetMapping("/buchungen")
	public ResponseEntity<List<Buchung>> buchungen(){
		List<Buchung> buchungen = buchungsRepository.findAll().stream().map(ModelConverter::convert).collect(Collectors.toList());
		return ResponseEntity.ok(buchungen);
	}
	
	@GetMapping("/buchungen/{id}")
	public ResponseEntity<Buchung> buchung(@PathVariable("id") @NotNull String id){
		log.debug("Called /buchung/"+id);
		return ResponseEntity.of(buchungsRepository.findById(Integer.valueOf(id)).map(ModelConverter::convert));
	}
	
	@PutMapping("/buchungen")
	public ResponseEntity<Buchung> buchung(@RequestBody @NotNull @Valid Buchung buchung){
		BuchungsEntity buchungsEntity = null;
		// Wenn eine Buchungsnummer übergeben wird:
		if(buchung.getBuchungsnummer() != null) {
			Optional<BuchungsEntity> vorhandeneBuchung = buchungsRepository.findById(buchung.getBuchungsnummer());
			// Bei ungültiger Nummer wird ein Fehler geworfen
			if(vorhandeneBuchung.isEmpty()) {
				throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Buchung Nummer "+buchung.getBuchungsnummer()+" konnte nicht gefunden werden! Update fehlgeschlagen!");
			}
			// Bei gültiger Nummer wird der vorhandene Eintrag aktualisiert
			buchungsEntity = ModelConverter.update(vorhandeneBuchung.get(),buchung);
		// Wenn keine Buchungsnummer übergeben wird - neue Buchung anlegen
		} else {
			buchungsEntity = ModelConverter.convert(buchung);
		}
		// Wenn ein Hauptkonto übergeben wird
		if(buchung.getHauptkonto() != null) {
			Optional<KontoEntity> konto = kontenRepository.findById(buchung.getHauptkonto().getId());
			// Wenn das übergebene Hauptkonto nicht existiert, wird ein Fehler geworfen.
			if(konto.isEmpty()) {
				throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Angegebenes Hauptkonto ist nicht vorhanden!");
			}
			// Bei gültigem Hauptkonto wird dieses mit der Buchung verknüpft (ersetzt)
			buchungsEntity.setHauptkonto(konto.get());
		}
		// Buchung speichern und Ergebnis zurückgeben
		buchungsEntity = buchungsRepository.save(buchungsEntity);
		return ResponseEntity.ok(ModelConverter.convert(buchungsEntity));
	}
	
	@GetMapping("konten")
	public ResponseEntity<List<Konto>> konto(){
		return ResponseEntity.ok(kontenRepository.findAll().stream().map(ModelConverter::convert).collect(Collectors.toList()));
	}
}
