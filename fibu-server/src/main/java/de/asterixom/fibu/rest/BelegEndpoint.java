package de.asterixom.fibu.rest;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import de.asterixom.fibu.converter.ModelConverter;
import de.asterixom.fibu.data.BelegRepository;
import de.asterixom.fibu.data.model.BelegEntity;
import de.asterixom.fibu.rest.model.Beleg;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/beleg")
public class BelegEndpoint {

	private final BelegRepository belegRepo;

	@PutMapping("/")
	public ResponseEntity<Beleg> upload(@RequestParam("file") MultipartFile file){
		try {
			String fileName = "", fileType = "", uuid = UUID.randomUUID().toString();
			String origName = file.getOriginalFilename();
			int dotPos = origName.lastIndexOf('.');
			if(dotPos > 0) {
				fileName=origName.substring(0, dotPos);
			}else{
				fileName=origName;
			}
			if(dotPos > 0 && dotPos < origName.length()-1) {
				fileType=origName.substring(dotPos+1);
			}
			BelegEntity beleg = BelegEntity.builder()//
				.uuid(uuid)//
				.filename(origName)//
				.name(fileName)//
				.contenttype(file.getContentType())//
				.filetype(fileType)//
				.daten(file.getInputStream().readAllBytes())
				.build();
			Beleg resultFile = ModelConverter.convert(belegRepo.save(beleg));
			return ResponseEntity.ok(resultFile);
		} catch (IOException e) {
			log.error(e);
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping("/{uuid:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String uuid) {
		Optional<BelegEntity> beleg = belegRepo.findByUuid(uuid);
		if(beleg.isEmpty())
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok()
			      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + beleg.get().getFilename()+"."+beleg.get().getFiletype() + "\"").body(new ByteArrayResource(beleg.get().getDaten()));
	}
	
	@DeleteMapping("/{uuid:.+}")
	public ResponseEntity<Void> deleteFile(@PathVariable String uuid) {
		Optional<BelegEntity> beleg = belegRepo.findByUuid(uuid);
		if(beleg.isEmpty())
			return ResponseEntity.notFound().build();
		belegRepo.delete(beleg.get());
		return ResponseEntity.ok().build();
	}
}
