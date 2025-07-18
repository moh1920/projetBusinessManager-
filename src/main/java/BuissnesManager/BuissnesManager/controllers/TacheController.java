package BuissnesManager.BuissnesManager.controllers;

import BuissnesManager.BuissnesManager.entity.Tache;
import BuissnesManager.BuissnesManager.service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/taches")
public class TacheController {

    @Autowired
    private TacheService tacheService;

    @PostMapping("addTache/{idCategorieTache}/{idProjet}")
    public ResponseEntity<?> createTache(@RequestBody Tache tache,@PathVariable Long idCategorieTache , @PathVariable Long idProjet) {
        return ResponseEntity.ok(tacheService.createTache(tache, idCategorieTache, idProjet));
    }

    @GetMapping("getAll")
    public ResponseEntity<?> getAllTaches() {
        return ResponseEntity.ok(tacheService.getAllTaches());
    }

    @GetMapping("getById/{id}")
    public ResponseEntity<?> getTacheById(@PathVariable Long id) {
        return tacheService.getTacheById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateTache(@PathVariable Long id, @RequestBody Tache tache) {
        try {
            return ResponseEntity.ok(tacheService.updateTache(id, tache));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteTache(@PathVariable Long id) {
        try {
            tacheService.deleteTache(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("getAllTacheByProjet/{idProjet}")
    public ResponseEntity<?> getAllTacheByProjet(@PathVariable Long idProjet) {
        return ResponseEntity.status(HttpStatus.OK).body(tacheService.getAllTachesByProjet(idProjet)) ;

    }
}
