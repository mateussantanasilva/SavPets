package com.fatec.scc.services.adoption;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.adoption.Adoption;
import com.fatec.scc.model.animalReport.AnimalReport;
import com.fatec.scc.model.client.Client;
import com.fatec.scc.model.employee.Employee;

public interface MaintainAdoption {

	List<Adoption> searchAll();
	
	List<Employee> searchAllEmployee();
	
	List<Client> searchAllClient();

	List<AnimalReport> searchAllAnimalReport();
	
	Optional<Adoption> searchById(Long id);
	
	Optional <Adoption> save (Adoption adoption);
	
	Optional<Adoption> updates(Long id,Adoption adoption);

	boolean existsByAnimalReport(Long animalReport);

	Optional<AnimalReport> findAnimal(Long animalReport);

}
