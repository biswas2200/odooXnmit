package com.odoo.odoo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(scanBasePackages = "com.odoo")
@EnableJpaAuditing
public class OdooApplication {
	public static void main(String[] args) {
		SpringApplication.run(OdooApplication.class, args);
	}
}