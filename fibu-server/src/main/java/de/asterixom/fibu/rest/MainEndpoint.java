package de.asterixom.fibu.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainEndpoint {

	@GetMapping("/hello")
	public ResponseEntity<String> helloWorld(){
		return ResponseEntity.ok("Hello World!");
	}
	
}
