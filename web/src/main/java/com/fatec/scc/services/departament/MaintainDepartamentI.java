package com.fatec.scc.services.departament;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.scc.model.departament.Departament;
import com.fatec.scc.model.departament.MaintainDepartamentRepository;

/**
 * A classe MaintainDepartamentI implementa o padrao Service. Service é um
 * padrao que
 * basicamente encapsula o processo de obtencao de serviços(objetos). O Service
 * cria uma camada de abstracao neste processo. Ao inves da classe dependente
 * instanciar suas dependencias diretamente, eles são solicitados a partir de um
 * objeto centralizado que atua como localizador de serviços.
 * 
 * Implementação concreta da interface MaintainDepartament
 */

@Service
public class MaintainDepartamentI implements MaintainDepartament {
    @Autowired
    MaintainDepartamentRepository repository;

    public List<Departament> searchAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Departament> searchById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Departament> searchByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public Optional<Departament> searchByInitials(String initials) {
        return repository.findByInitials(initials);
    }

    @Override
    public Optional<Departament> save(Departament Departament) {
        return Optional.ofNullable(repository.save(Departament));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Departament> updates(Long id, Departament Departament) {

        Departament modifiedDepartament = new Departament(Departament.getName(), Departament.getInitials());
        modifiedDepartament.setId(id);

        return Optional.ofNullable(repository.save(modifiedDepartament));
    }
}
