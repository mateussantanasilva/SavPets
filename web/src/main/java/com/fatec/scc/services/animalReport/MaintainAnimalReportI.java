package com.fatec.scc.services.animalReport;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.animalCategory.AnimalCategory;
import com.fatec.scc.model.animalReport.AnimalReport;
import com.fatec.scc.model.medicine.Medicine;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fatec.scc.model.animalCategory.MaintainAnimalCategoryRepository;
import com.fatec.scc.model.medicine.MaintainMedicineRepository;
import com.fatec.scc.model.animalReport.MaintainAnimalReportRepository;

@Service
public class MaintainAnimalReportI implements MaintainAnimalReport {
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainMedicineRepository repositoryM;
	@Autowired
	MaintainAnimalCategoryRepository repositoryC;
	@Autowired
	MaintainAnimalReportRepository repository;
	
	public List<AnimalReport> searchAll() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repository.findAll();
	}
	public List<Medicine> searchAllMedicines() {
		logger.info(">>>>>> servico consultaTodos chamados");
		return repositoryM.findAll();
	}
	public List<AnimalCategory> searchAllCategories() {
		logger.info(">>>>>> servico consultarTodos chamados");
		return repositoryC.findAll();
	}
	@Override
	public Optional<AnimalReport> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}

	@Override
	public Optional<AnimalReport> save(AnimalReport animalReport) {
		logger.info(">>>>>> servico save chamado ");
		return Optional.ofNullable(repository.save(animalReport));
	}

	@Override
	public Optional<AnimalReport> updates(Long id, AnimalReport animalReport) {
		logger.info(">>>>>> 1.servico atualiza informações de cliente chamado");
		
		AnimalReport relatorioModificado = this.repository.findById(id).get();
		animalReport.setId(id);

		logger.info(">>>>>> 2. servico atualiza informacoes de medicamento valido para o id => %id", relatorioModificado.getId());
		return Optional.ofNullable(repository.save(animalReport));
	}
}
