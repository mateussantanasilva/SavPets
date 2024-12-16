package com.fatec.scc.model.adoption;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintainAdoptionRepository extends JpaRepository<Adoption,Long> {
	
	Optional <Adoption> findByAdoptionDate(String adoptionDate);
	
	List<Adoption> findByAnimalReport(String animalReport);
	
	List<Adoption> findByClient(String client);
	
	List<Adoption> findByEmployee(String employee);
	
	Optional<Adoption> findByReport(String report);
	
	Boolean existsByAnimalReport(Long animalReport);
}
