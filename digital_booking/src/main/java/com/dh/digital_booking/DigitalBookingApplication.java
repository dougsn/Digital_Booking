package com.dh.digital_booking;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.apache.log4j.BasicConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@SecurityScheme(name = "Bearer Authentication" , scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "bearer")
@OpenAPIDefinition(
		info = @Info(
				title = "API REST Digital Booking",
				version = "4.0.0",
				description = "API REST da Digital Booking",
				contact = @Contact(
						name = "Digital Booking",
						url = "https://digitalbooking.projetos.app.br/home/"
				)
		)
)
public class DigitalBookingApplication {
	public static void main(String[] args) {
		BasicConfigurator.configure();

		SpringApplication.run(DigitalBookingApplication.class, args);
	}

}
