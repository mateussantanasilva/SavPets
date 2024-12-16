package com.fatec.scc.services.medicine;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.medicine.Medicine;
import com.fatec.scc.model.provider.Provider;

public interface MaintainMedicine {

	List<Medicine> searchAll();
	
	List<Provider> searchAllF();
	
	Optional<Medicine> searchById(Long id);

	Optional<Medicine> searchByName(String name);

	Optional<Medicine> save(Medicine medicine);

	void delete(Long id);

	Optional<Medicine> updates(Long id, Medicine medicine);
}
