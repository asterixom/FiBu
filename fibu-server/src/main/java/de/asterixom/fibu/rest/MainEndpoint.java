package de.asterixom.fibu.rest;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Order(Ordered.LOWEST_PRECEDENCE)
public class MainEndpoint {

	@GetMapping(value = { "/login" })
	public String forward404() {
		return "index.html";
	}
	
}
 