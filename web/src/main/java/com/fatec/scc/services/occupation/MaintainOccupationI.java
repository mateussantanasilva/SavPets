package com.fatec.scc.services.occupation;

import java.util.List;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;

import org.apache.logging.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.fatec.scc.model.occupation.Occupation;

import com.fatec.scc.model.occupation.MaintainOccupationRepository;

/**
 * 
 * A classe implementa o padrao Service. Service é um padrao que
 * 
 * basicamente encapsula o processo de obtencao de serviços(objetos). O Service
 * 
 * cria uma camada de abstracao neste processo. Ao inves da classe dependente
 * 
 * instanciar suas dependencias diretamente, eles são solicitados a partir de um
 * 
 * objeto centralizado que atua como localizador de serviços.
 * 
 * 
 * 
 * Implementação concreta da interface MaintainOccupation
 * 
 * 
 * 
 * @author
 * 
 * 
 * 
 */

@Service

public class MaintainOccupationI implements MaintainOccupation {

	Logger logger = LogManager.getLogger(this.getClass());

	@Autowired

	MaintainOccupationRepository repository;

	public List<Occupation> searchAll() {

		logger.info(">>>>>> servico consultaTodos chamado");

		return repository.findAll();

	}

	@Override

	public Optional<Occupation> searchByName(String name) {

		logger.info(">>>>>> servico consultaPorNome chamado");

		return repository.findByName(name);

	}

	@Override

	public Optional<Occupation> searchById(Long id) {

		logger.info(">>>>>> servico consultaPorId chamado");

		return repository.findById(id);

	}

	@Override

	public Optional<Occupation> searchByDescription(String description) {

		logger.info(">>>>>> servico consultaPorDescrição chamada");

		return repository.findByDescription(description);

	}

	@Override

	public Optional<Occupation> save(Occupation occupation) {

		logger.info(">>>>>> servico save chamado ");

		return Optional.ofNullable(repository.save(occupation));

	}

	@Override

	public void delete(Long id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}

	// Verificar:

	@Override

	public Optional<Occupation> updates(Long id, Occupation occupation) {

		logger.info(">>>>>> 1.servico atualiza informações de cliente chamado");
		Occupation occupationModified = new Occupation(occupation.getName(), occupation.getDescription());
		occupationModified.setId(id);
		logger.info(">>>>>> 2. servico atualiza informacoes => %id", occupationModified.getId());

		return Optional.ofNullable(repository.save(occupationModified));

	}

}