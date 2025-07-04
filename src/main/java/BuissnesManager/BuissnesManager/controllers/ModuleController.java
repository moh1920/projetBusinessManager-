package BuissnesManager.BuissnesManager.controllers;

import BuissnesManager.BuissnesManager.entity.Module;
import BuissnesManager.BuissnesManager.entity.ModuleTittle;
import BuissnesManager.BuissnesManager.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("module")
public class ModuleController {

    @Autowired
    private ModuleService moduleService ;

    @GetMapping("getAllModulesTittle")
    public ResponseEntity<?> getAllModulesTittle() {
        List<ModuleTittle> modules = moduleService.getAllModuleTitlle();
        return ResponseEntity.ok(modules);
    }

    @GetMapping("getAllModule")
    public ResponseEntity<?> getAllModules() {
        List<Module> modules = moduleService.getAllModule();
        return ResponseEntity.ok(modules);
    }

    @GetMapping("getModule/{id}")
    public ResponseEntity<Module> getModuleById(@PathVariable Long id) {
        try {
            Module module = moduleService.getByIdModule(id);
            return ResponseEntity.ok(module);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("getModuleByRole/{idRole}")
    public ResponseEntity<?> getModuleByRole(@PathVariable Long idRole) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(moduleService.getModuleTittleByRole(idRole));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("getModuleTittleByRole/{idRole}")
    public ResponseEntity<?> getModuleTittleByRole(@PathVariable Long idRole) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(moduleService.getAllModuleTittleByIdRole(idRole));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/update-status/{roleId}")
    public ResponseEntity<String> updateStatusByRole(@PathVariable("roleId") Long roleId) {
        try {
            moduleService.upadateStatusModuleByRole(roleId);
            return ResponseEntity.ok("Status des modules mis à jour avec succès pour le rôle " + roleId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du statut des modules.");
        }
    }




}
