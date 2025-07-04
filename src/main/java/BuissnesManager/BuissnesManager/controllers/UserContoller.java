package BuissnesManager.BuissnesManager.controllers;

import BuissnesManager.BuissnesManager.dto.UserRequest;
import BuissnesManager.BuissnesManager.entity.User;
import BuissnesManager.BuissnesManager.entity.UserDTO;
import BuissnesManager.BuissnesManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/users")
@RestController
public class UserContoller {


    @Autowired
    private UserService userService ;
    @GetMapping("/test")
    public ResponseEntity<?> testToken() {
        return ResponseEntity.ok("Token valide");
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRequest request,@RequestParam Long idEntreprise,@RequestParam Long idEquipe) {
        try {
            User createdUser = userService.createUserWithEntrepriseAndEquipe(request, idEntreprise, idEquipe);
            return ResponseEntity.status(HttpStatus.OK).body(createdUser);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/getAllUsers")
    public  ResponseEntity<?> getAllUsers(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/getAllUsersDTo")
    public  ResponseEntity<?> getAllUsersDTO(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsersDTO());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getUsersById/{id}")
    public  ResponseEntity<?> getAllUserById(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id) {
        try {
            userService.updateUser(userDTO, id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur : " + e.getMessage());
        }
    }


}
