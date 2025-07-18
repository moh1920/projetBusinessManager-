package BuissnesManager.BuissnesManager.repository;

import BuissnesManager.BuissnesManager.entity.Tache;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TacheRepo extends JpaRepository<Tache,Long> {
    List<Tache> findAllByProjetId(Long idProjet);
}
