package Managmentbuisness.sayariMohamed.services.keyclaok;

import Managmentbuisness.sayariMohamed.user.UserRegistrationRecord;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CertificateRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class KeycloakUserServiceImp implements KeycloakUserService{

    @Value("${keycloak.realm}")
    private String realm;

    private Keycloak keycloak ;

    public KeycloakUserServiceImp(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    @Override
    public UserRegistrationRecord createUser(UserRegistrationRecord userRegistrationRecord) {
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(userRegistrationRecord.username());
        user.setLastName(userRegistrationRecord.lastName());
        user.setEmail(userRegistrationRecord.email());
        user.setFirstName(userRegistrationRecord.firstName());


        user.setEmailVerified(false);


        CredentialRepresentation credentialRepresentation=new CredentialRepresentation();

        credentialRepresentation.setValue(userRegistrationRecord.password());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);


        List<CredentialRepresentation> list = new ArrayList<>();
        list.add(credentialRepresentation);
        user.setCredentials(list);
        UsersResource usersResource = getUsersResource();


        Response response = usersResource.create(user);


        if (Objects.equals(201, response.getStatus())) {
            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            UserResource userResource = usersResource.get(userId);

            // Vérifie que le rôle est fourni
            if (userRegistrationRecord.roleUser() != null) {
                String roleName = userRegistrationRecord.roleUser().name();
                RealmResource realmResource = keycloak.realm(realm);
                userResource.roles()
                        .realmLevel()
                        .add(List.of(realmResource.roles().get(roleName).toRepresentation()));
                log.info("Utilisateur créé avec succès et rôle '{}' assigné à {}", roleName, userRegistrationRecord.username());
            } else {
                log.warn("Aucun rôle fourni pour l'utilisateur : {}, aucun rôle assigné.", userRegistrationRecord.username());
            }

            return userRegistrationRecord;
        }

        return null ;


    }

    private UsersResource getUsersResource() {
        RealmResource realm1 = keycloak.realm(realm);
        return realm1.users();
    }

    @Override
    public UserRepresentation getUserById(String userId) {
        return getUsersResource().get(userId).toRepresentation();
    }
    public  List<UserRepresentation> getAllUsers(){
        return getUsersResource().list() ;
    }

    @Override
    public void deleteUserById(String userId) {
          getUsersResource().delete(userId);
    }




}
