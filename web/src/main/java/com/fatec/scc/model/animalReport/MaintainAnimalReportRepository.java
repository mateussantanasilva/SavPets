package com.fatec.scc.model.animalReport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository

public interface MaintainAnimalReportRepository extends JpaRepository<AnimalReport, Long> {
	

	Optional<AnimalReport> findByAnimalName(String animalName);
	
	Optional<AnimalReport> findByArrivalDate(String arrivalDate);
	
	Optional<AnimalReport> findByDescription(String description);
	
	Optional<AnimalReport> findByLocal(String local);
	
	List<AnimalReport> findByMedicine(String medicine);
	
	List<AnimalReport> findByAnimalCategory(String animalCategory);
	
	boolean existsByAnimalNameAndArrivalDateAndDescriptionAndLocalAndMedicineAndAnimalCategory(String animalName,String arrivalDate,String description,String local,String medicine,String animalCategory);
	
	
	}
