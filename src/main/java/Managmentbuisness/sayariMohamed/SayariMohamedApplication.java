package Managmentbuisness.sayariMohamed;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.OAuthFlow;
import io.swagger.v3.oas.annotations.security.OAuthFlows;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@SecurityScheme(
		name = "keycloak"
		,type = SecuritySchemeType.OAUTH2,
		bearerFormat = "JWT",
		scheme = "bearer",
		in = SecuritySchemeIn.HEADER,
		flows = @OAuthFlows(
				password = @OAuthFlow(
						authorizationUrl = "http://localhost:9090/realms/speedyGo/protocol/openid-connect/auth",
						tokenUrl = "http://localhost:9090/realms/speedyGo/protocol/openid-connect/token"
				)
		)
)
public class SayariMohamedApplication {

	public static void main(String[] args) {
		SpringApplication.run(SayariMohamedApplication.class, args);
	}

}
