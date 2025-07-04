package BuissnesManager.BuissnesManager.service;

import BuissnesManager.BuissnesManager.entity.Module;
import BuissnesManager.BuissnesManager.entity.ModuleTittle;
import BuissnesManager.BuissnesManager.entity.Role;
import BuissnesManager.BuissnesManager.repository.ModuleRepo;
import BuissnesManager.BuissnesManager.repository.ModuleTittleRepo;
import BuissnesManager.BuissnesManager.repository.PermissionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ModuleService {

    @Autowired
    private ModuleRepo moduleRepo ;
    @Autowired
    private PermissionRepo permissionRepo;

    @Autowired
    private ModuleTittleRepo moduleTittleRepo;
    public List<ModuleTittle> getAllModuleTitlle(){
        return moduleTittleRepo.findAll();
    }
    public List<Module> getAllModule(){
        return moduleRepo.findAll();
    }

    public Module getByIdModule(Long idModule){
        return moduleRepo.findById(idModule).get();
    }


    public List<Module> getModuleTittleByRole(Long idRole){
        return permissionRepo.getModuleByIdRole(idRole);
    }

    public Set<ModuleTittle> getAllModuleTittleByIdRole(Long idRole){
        List<Module> modules = permissionRepo.getModuleByIdRole(idRole);
        Set<ModuleTittle> moduleTittles = new HashSet<>();

        for (Module module : modules){
            moduleTittles.add(moduleTittleRepo.findByModules(module));
        }
       return moduleTittles;
    }

    public void upadateStatusModuleByRole(Long idRoleUser){
        List<Module> moduleList = moduleRepo.findAll();
        List<Module> modulesAffecteByRole = permissionRepo.getModuleByIdRole(idRoleUser);

        for (Module module : moduleList){
            for (Module m : modulesAffecteByRole){
                if (m.equals(module)){
                    module.setStatus(false);
                    moduleRepo.save(module);
                }else {
                    module.setStatus(true);
                    moduleRepo.save(module);
                }
            }
        }


    }


}
