package Managmentbuisness.sayariMohamed.services.keyclaok;

import Managmentbuisness.sayariMohamed.user.UserRegistrationRecord;
import lombok.AllArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class KeycloakUserApi {

    private final KeycloakUserServiceImp keycloakUserServiceImp ;

    @PostMapping
    public UserRegistrationRecord createUser(@RequestBody UserRegistrationRecord userRegistrationRecord){
        return keycloakUserServiceImp.createUser(userRegistrationRecord);
    }


    @GetMapping
    public UserRepresentation getUserById(Principal principal){
        return keycloakUserServiceImp.getUserById(principal.getName());
    }

    @GetMapping("/getAllUsers")
    public List<UserRepresentation> getAllUsers(){
        return keycloakUserServiceImp.getAllUsers();
    }

    @DeleteMapping("/{userId}")
    public void deletedUserByIdd(@PathVariable String userId){
        keycloakUserServiceImp.deleteUserById(userId);
    }



}
