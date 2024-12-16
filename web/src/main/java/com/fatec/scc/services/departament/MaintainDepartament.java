package com.fatec.scc.services.departament;

import java.util.List;
import java.util.Optional;
import com.fatec.scc.model.departament.Departament;

public interface MaintainDepartament {
    List<Departament> searchAll();

    Optional<Departament> searchById(Long id);

    Optional<Departament> searchByName(String name);

    Optional<Departament> searchByInitials(String initials);

    Optional<Departament> save(Departament Departament);

    void delete(Long id);

    Optional<Departament> updates(Long id, Departament Departament);
}
