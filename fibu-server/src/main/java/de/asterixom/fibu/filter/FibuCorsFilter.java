package de.asterixom.fibu.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class FibuCorsFilter extends HttpFilter {

	@Override
	public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		String origin = request.getHeader("Origin");
		if(origin != null) {
			response.addHeader("Access-Control-Allow-Origin", origin);
			response.addHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
			response.addHeader("Access-Control-Allow-Headers", "authorization,content-type");
			response.addHeader("Access-Control-Allow-Credentials", "true");
			response.addHeader("Access-Control-Max-Age", "3600");
			if("OPTIONS".equals(request.getMethod())) {
				response.setStatus(200);
				return;
			}
		}
		
		chain.doFilter(request, response);
	}

}
