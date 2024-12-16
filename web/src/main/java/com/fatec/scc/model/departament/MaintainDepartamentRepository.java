package com.fatec.scc.model.departament;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// Esta classe abstrai a programação de consultas para acesso ao banco de dados.

public interface MaintainDepartamentRepository extends JpaRepository<Departament, Long> {
	Optional<Departament> findByName(String name);

	Optional<Departament> findByInitials(String initials);
	
	List<Departament> findAllByNameIgnoreCaseContaining(String name);
}
