package BuissnesManager.BuissnesManager.service;

import BuissnesManager.BuissnesManager.entity.Equipe;
import BuissnesManager.BuissnesManager.repository.EquipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipeService {

    @Autowired
    private EquipeRepo equipeRepo ;

    public Equipe createEquipe(Equipe equipe){
        return equipeRepo.save(equipe);
    }
    public List<Equipe> getAll(){
        return equipeRepo.findAll();
    }
}
