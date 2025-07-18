package BuissnesManager.BuissnesManager.service;

import BuissnesManager.BuissnesManager.entity.Tache;
import BuissnesManager.BuissnesManager.repository.CategorieTacheRepo;
import BuissnesManager.BuissnesManager.repository.ProjetRepo;
import BuissnesManager.BuissnesManager.repository.TacheRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TacheService {

    @Autowired
    private TacheRepo tacheRepo;

    @Autowired
    private CategorieTacheRepo categorieTacheRepo ;
    @Autowired
    private ProjetRepo projetRepo ;

    public Tache createTache(Tache tache,Long idCategorieTache ,Long idProjet) {
        tache.setCategorieTache(categorieTacheRepo.findById(idCategorieTache).get());
        tache.setProjet(projetRepo.findById(idProjet).get());
        return tacheRepo.save(tache);
    }

    public List<Tache> getAllTaches() {
        return tacheRepo.findAll();
    }

    public Optional<Tache> getTacheById(Long id) {
        return tacheRepo.findById(id);
    }

    public Tache updateTache(Long id, Tache updatedTache) {
        return tacheRepo.findById(id).map(tache -> {
            tache.setTitre(updatedTache.getTitre());
            tache.setDescription(updatedTache.getDescription());
            tache.setDateDebut(updatedTache.getDateDebut());
            tache.setDateFin(updatedTache.getDateFin());
            tache.setStatut(updatedTache.getStatut());
            tache.setPriorite(updatedTache.getPriorite());
            tache.setProjet(updatedTache.getProjet());
            tache.setCategorieTache(updatedTache.getCategorieTache());
            return tacheRepo.save(tache);
        }).orElseThrow(() -> new RuntimeException("Tâche non trouvée avec l'id : " + id));
    }

    public void deleteTache(Long id) {
        if (!tacheRepo.existsById(id)) {
            throw new RuntimeException("Tâche non trouvée avec l'id : " + id);
        }
        tacheRepo.deleteById(id);
    }
    public List<Tache> getAllTachesByProjet(Long idProjet){
        return tacheRepo.findAllByProjetId(idProjet);
    }
}
