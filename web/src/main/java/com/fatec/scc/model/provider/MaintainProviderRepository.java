package com.fatec.scc.model.provider;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface MaintainProviderRepository extends JpaRepository<Provider, Long> {
	Optional<Provider> findByCnpj(String cnpj);
	
	List<Provider> findAllByNameIgnoreCaseContaining(String name);
	
	boolean existsByCnpj(String cnpj);
}