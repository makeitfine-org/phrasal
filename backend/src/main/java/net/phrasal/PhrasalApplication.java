package net.phrasal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PhrasalApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhrasalApplication.class, args);
    }
}
