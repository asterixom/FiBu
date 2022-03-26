package de.asterixom.fibu;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class FibuSecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		http.authorizeRequests()
//			.antMatchers("/").permitAll()
			.antMatchers("/h2-console/**").permitAll();
		// @formatter:on

		http.csrf().disable();
		http.headers().frameOptions().disable();
	}
}
