package Managmentbuisness.sayariMohamed.security;

import Managmentbuisness.sayariMohamed.user.UserSyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserSyncService userSyncService;

    @GetMapping("/hello")
    public String hello(@AuthenticationPrincipal Jwt jwt) {
        userSyncService.syncUser(jwt);
        return "Bonjour " + jwt.getClaim("preferred_username");
    }

}
