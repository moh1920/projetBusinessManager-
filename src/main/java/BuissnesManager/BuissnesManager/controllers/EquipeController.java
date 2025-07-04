package BuissnesManager.BuissnesManager.controllers;

import BuissnesManager.BuissnesManager.entity.Equipe;
import BuissnesManager.BuissnesManager.entity.Role;
import BuissnesManager.BuissnesManager.service.EquipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("equipe")
@RestController
public class EquipeController {
    @Autowired
    private EquipeService equipeService ;

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Equipe equipe) {
        try {
            return ResponseEntity.ok(equipeService.createEquipe(equipe));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erreur : " + e.getMessage());
        }
    }
    @GetMapping("getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(equipeService.getAll());
    }

}
