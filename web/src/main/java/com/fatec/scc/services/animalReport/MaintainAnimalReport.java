package com.fatec.scc.services.animalReport;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.animalReport.AnimalReport;
import com.fatec.scc.model.animalCategory.AnimalCategory;
import com.fatec.scc.model.medicine.Medicine;

public interface MaintainAnimalReport {

	List<AnimalReport> searchAll();
	
	List<Medicine> searchAllMedicines();
	
	List<AnimalCategory> searchAllCategories();
	
	Optional<AnimalReport> searchById(Long id);

	Optional<AnimalReport> save(AnimalReport animalReport);

	Optional<AnimalReport> updates(Long id, AnimalReport animalReport);
}
