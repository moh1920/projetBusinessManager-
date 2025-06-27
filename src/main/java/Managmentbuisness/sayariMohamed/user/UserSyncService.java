package Managmentbuisness.sayariMohamed.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class UserSyncService {

    private final UserRepo userRepository;

    public void syncUser(Jwt jwt) {
        String userId = jwt.getSubject();
        String username = jwt.getClaim("preferred_username");
        String email = jwt.getClaim("email");

        if (!userRepository.existsById(userId)) {
            User user = new User();
            user.setId(userId);
            user.setUsername(username);
            user.setEmail(email);

            Map<String, Object> realmAccess = (Map<String, Object>) jwt.getClaim("realm_access");
            List<String> roles = (List<String>) realmAccess.get("roles");


            if (roles.contains(RoleUser.USER.name())) {
                user.setRoleUser(RoleUser.USER);
            } else if (roles.contains(RoleUser.ADMIN.name())) {
                user.setRoleUser(RoleUser.ADMIN);
            } else if (roles.contains(RoleUser.CLIENT.name())) {
                user.setRoleUser(RoleUser.CLIENT);
            } else if (roles.contains(RoleUser.RH.name())) {
                user.setRoleUser(RoleUser.RH);
            }



            userRepository.save(user);
        }
    }
}
