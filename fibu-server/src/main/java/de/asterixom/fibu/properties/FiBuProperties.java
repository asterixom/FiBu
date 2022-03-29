package de.asterixom.fibu.properties;

import javax.validation.constraints.NotBlank;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.extern.log4j.Log4j2;

@ConfigurationProperties("fibu")
@Data
@Component
public class FiBuProperties {
	
	@NotBlank
	private String path = "./files";
	
}
