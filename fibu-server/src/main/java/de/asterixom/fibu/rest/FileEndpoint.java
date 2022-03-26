package de.asterixom.fibu.rest;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;

import javax.annotation.PostConstruct;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import de.asterixom.fibu.properties.FiBuProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
public class FileEndpoint {

	private final FiBuProperties properties;
	private Path rootPath;
	
	
	@PostConstruct
	private void setup() {
		rootPath = Path.of(properties.getPath());
		if(!rootPath.toFile().exists()) rootPath.toFile().mkdirs();
	}

	@PutMapping("/files")
	public ResponseEntity<Void> upload(@RequestParam("file") MultipartFile file){
		try {
			Files.copy(file.getInputStream(), rootPath.resolve(file.getOriginalFilename()));
		} catch (IOException e) {
			log.error(e);
			return ResponseEntity.internalServerError().build();
		}
		return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).build();
	}
	
	@GetMapping("/files/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		try {
		      Path file = Path.of(properties.getPath(), filename);
		      Resource resource = new UrlResource(file.toUri());
		      if (resource.exists() || resource.isReadable()) {
		    	 return ResponseEntity.ok()
			      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
		      } else {
		        throw new RuntimeException("Could not read the file!");
		      }
	    } catch (MalformedURLException e) {
	      throw new RuntimeException("Error: " + e.getMessage());
	    }
	}
}
