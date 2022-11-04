package de.asterixom.fibu.properties;

import javax.validation.constraints.NotBlank;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@ConfigurationProperties("fibu")
@Data
@Component
public class FiBuProperties {
	
	@NotBlank
	private int standardGegenkonto;
}
