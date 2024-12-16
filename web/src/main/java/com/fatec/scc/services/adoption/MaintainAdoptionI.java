package com.fatec.scc.services.adoption;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.scc.model.adoption.Adoption;
import com.fatec.scc.model.adoption.MaintainAdoptionRepository;
import com.fatec.scc.model.animalReport.AnimalReport;
import com.fatec.scc.model.animalReport.MaintainAnimalReportRepository;
import com.fatec.scc.model.client.Client;
import com.fatec.scc.model.client.MaintainClientRepository;
import com.fatec.scc.model.employee.Employee;
import com.fatec.scc.model.employee.MaintainEmployeeRepository;

@Service
public class MaintainAdoptionI implements MaintainAdoption {
	
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainEmployeeRepository repositoryE;
	@Autowired
	MaintainClientRepository repositoryC;
	@Autowired
	MaintainAnimalReportRepository repositoryA;
	@Autowired
	MaintainAdoptionRepository repository;


	private static final String LOG_MESSAGE = ">>>>>> servico consultaTodos chamado";




	public List<Adoption> searchAll() {
		logger.info(LOG_MESSAGE);
		return repository.findAll();
	}
	public List<Employee> searchAllEmployee() {
		logger.info(LOG_MESSAGE);
		return repositoryE.findAll();
	}
	public List<Client> searchAllClient() {
		logger.info(LOG_MESSAGE);
		return repositoryC.findAll();
	}
	public List<AnimalReport> searchAllAnimalReport() {
		logger.info(LOG_MESSAGE);
		return repositoryA.findAll();
	}
	
	@Override
	public Optional<Adoption> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}

	@Override
	public Optional<Adoption> save(Adoption adoption) {
		logger.info(">>>>>> servico save chamado ");
		return Optional.ofNullable(repository.save(adoption));
	}



	@Override
	public Optional<Adoption> updates(Long id, Adoption adoption) {
		logger.info(">>>>>> 1.servico atualiza informações de cliente chamado");
		
		Adoption relatorioModificado = this.repository.findById(id).get();
		adoption.setId(id);
		
		
		logger.info(">>>>>> 2. servico atualiza informacoes de medicamento valido para o id => %id", relatorioModificado.getId());
		return Optional.ofNullable(repository.save(adoption));
	}

	@Override
	public 	boolean existsByAnimalReport(Long animalReport) {
		if (repository.existsByAnimalReport(animalReport)) {
			return true;
		}
		return false;
	}
	@Override
	public Optional<AnimalReport> findAnimal(Long animalReport) {
		return repositoryA.findById(animalReport);
	}
 
	
}