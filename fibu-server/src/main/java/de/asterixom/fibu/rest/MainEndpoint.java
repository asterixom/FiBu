package de.asterixom.fibu.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import de.asterixom.fibu.rest.model.HelloWorldData;

@RestController
public class MainEndpoint {

	@GetMapping("/hello")
	public ResponseEntity<HelloWorldData> helloWorld(){
		return ResponseEntity.ok(HelloWorldData.builder().build());
	}
	
}
