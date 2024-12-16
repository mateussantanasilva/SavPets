package com.fatec.scc.services.medicine;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.medicine.Medicine;
import com.fatec.scc.model.provider.Provider;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.scc.model.provider.MaintainProviderRepository;
import com.fatec.scc.model.medicine.MaintainMedicineRepository;

@Service

public class MaintainMedicineI implements MaintainMedicine {
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainMedicineRepository repository;
	@Autowired
	MaintainProviderRepository repositoryF;

	public List<Medicine> searchAll() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repository.findAll();
	}
	public List<Provider> searchAllF() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repositoryF.findAll();
	}
	@Override
	public Optional<Medicine> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}

	public Optional<Medicine> searchByName(String name) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findByName(name);
	}

	@Override
	public Optional<Medicine> save(Medicine medicine) {
		logger.info(">>>>>> servico save chamado ");
		return Optional.ofNullable(repository.save(medicine));
	}

	@Override
	public void delete(Long id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}

	@Override
	public Optional<Medicine> updates(Long id, Medicine medicine) {
		logger.info(">>>>>> 1.servico atualiza informações de cliente chamado");

		Medicine modifiedMedicine = this.repository.findById(id).get();
		medicine.setId(id);	
		
		logger.info(">>>>>> 2. servico atualiza informacoes de medicamento valido para o id => %id", modifiedMedicine.getId());
		return Optional.ofNullable(repository.save(medicine));
	}
	
}
