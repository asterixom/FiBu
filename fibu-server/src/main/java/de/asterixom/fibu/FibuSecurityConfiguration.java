package de.asterixom.fibu;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;

@Configuration
public class FibuSecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		http
			.authorizeRequests()
				.antMatchers("/api/**").authenticated()
				.antMatchers("/files/**").authenticated()
				.antMatchers("/**").permitAll()
			.and()
				.httpBasic().authenticationEntryPoint(new Http403ForbiddenEntryPoint())
			.and()
				.logout().logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(200);
                })
//			.and()
//				.formLogin()
			.and()
				.headers().frameOptions().disable()
			.and()
				.csrf().disable()
				.cors().disable();
		// @formatter:on
	}
}
