package Managmentbuisness.sayariMohamed.services.keyclaok;

import Managmentbuisness.sayariMohamed.user.UserRegistrationRecord;
import org.keycloak.representations.idm.UserRepresentation;

public interface KeycloakUserService {

    UserRegistrationRecord createUser(UserRegistrationRecord userRegistrationRecord);
    UserRepresentation getUserById(String userId);

    void deleteUserById(String userId);






}
