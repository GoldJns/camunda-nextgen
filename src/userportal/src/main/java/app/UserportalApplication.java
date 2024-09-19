package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages={"controller", "service", "repository", "config"})
@EnableJpaRepositories(basePackages = "repository") 
@EntityScan(basePackages = "model")
public class UserportalApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserportalApplication.class, args);
	}

}
