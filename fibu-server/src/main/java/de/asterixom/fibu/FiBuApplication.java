package de.asterixom.fibu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

@SpringBootApplication
public class FiBuApplication {

	public static void main(String[] args) {
		SpringApplication.run(FiBuApplication.class, args);
	}
}
