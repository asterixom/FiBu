package de.asterixom.fibu.rest;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import de.asterixom.fibu.properties.FiBuProperties;
import de.asterixom.fibu.rest.model.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/files")
public class FileEndpoint {

	private final FiBuProperties properties;
	private Path rootPath;
	
	
	@PostConstruct
	private void setup() {
		rootPath = Path.of(properties.getPath());
		if(!rootPath.toFile().exists()) rootPath.toFile().mkdirs();
	}

	@PutMapping("/")
	public ResponseEntity<File> upload(@RequestParam("file") MultipartFile file){
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
			File resultFile = File.builder()//
				.uuid(uuid)//
				.filename(origName)//
				.name(fileName)//
				.contenttype(file.getContentType())//
				.filetype(fileType)//
				.build();
			Files.copy(file.getInputStream(), rootPath.resolve(uuid+(fileType.length()>0?"."+fileType:"")));
			return ResponseEntity.ok(resultFile);
		} catch (IOException e) {
			log.error(e);
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping("/{filename:.+}")
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
