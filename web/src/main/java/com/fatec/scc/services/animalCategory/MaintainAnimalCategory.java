package com.fatec.scc.services.animalCategory;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.animalCategory.AnimalCategory;

//	Funciona como CRUD

public interface MaintainAnimalCategory {
	List<AnimalCategory> searchAll();

	Optional<AnimalCategory> searchByName(String name);

	Optional<AnimalCategory> searchById(Long id);
	
	Optional<AnimalCategory> searchByRace(String race);
	
	Optional<AnimalCategory> searchByGender(String gender);
	
	Optional<AnimalCategory> searchBySize(String size);
	
	Optional<AnimalCategory> searchByCoatColor(String coatColor);

	Optional<AnimalCategory> save(AnimalCategory animalCategory);

	void delete(Long id);

	Optional<AnimalCategory> updates(Long id, AnimalCategory animalCategory);

	boolean existsByNameAndRaceAndGenderAndSizeAndCoatColor(String name, String race, String gender, String size,
			String coatColor);
}