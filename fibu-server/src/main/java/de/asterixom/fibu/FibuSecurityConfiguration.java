package de.asterixom.fibu;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class FibuSecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		http
			.authorizeRequests()
				.antMatchers("/**").authenticated()
				.antMatchers("/h2/**").permitAll()
			.and()
				.httpBasic()
//			.and()
//				.formLogin()
			.and()
				.headers().frameOptions().disable()
			.and()
				.csrf().disable();
		
		// @formatter:on

		http.cors().disable();
		http.headers().frameOptions().disable();
	}
}
