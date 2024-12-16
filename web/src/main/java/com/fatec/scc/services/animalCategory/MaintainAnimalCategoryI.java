package com.fatec.scc.services.animalCategory;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.animalCategory.AnimalCategory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fatec.scc.model.animalCategory.MaintainAnimalCategoryRepository;

/**
 * A classe mantem categoriaAnimal implementa o padrao Service. Service é um padrao que
 * basicamente encapsula o processo de obtencao de serviços(objetos). O Service
 * cria uma camada de abstracao neste processo. Ao inves da classe dependente
 * instanciar suas dependencias diretamente, eles são solicitados a partir de um
 * objeto centralizado que atua como localizador de serviços.
 * 
 * Implementação concreta da interface MantemCategoriaAnimal
 * 
 * @author
 *
 */
@Service
public class MaintainAnimalCategoryI implements MaintainAnimalCategory {
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainAnimalCategoryRepository repository;

	public List<AnimalCategory> searchAll() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repository.findAll();
	}

	@Override
	public Optional<AnimalCategory> searchByName (String nome) {
		logger.info(">>>>>> servico consultaPorNome chamado");
		return repository.findByName(nome);
	}

	@Override
	public Optional<AnimalCategory> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}
	@Override
	public Optional<AnimalCategory> searchByRace (String race) {
		logger.info(">>>>>> servico consultaPorRaca chamado");
		return repository.findByRace(race);
	}
	@Override
	public Optional<AnimalCategory> searchByGender (String gender) {
		logger.info(">>>>>> servico consultaPorSexo chamado");
		return repository.findByGender(gender);
	}
	@Override
	public Optional<AnimalCategory> searchBySize (String size) {
		logger.info(">>>>>> servico consultaPorPorte chamado");
		return repository.findBySize(size);
	}
	@Override
	public Optional<AnimalCategory> searchByCoatColor (String coatColor) {
		logger.info(">>>>>> servico consultaPorCorPelagem chamado");
		return repository.findByCoatColor(coatColor);
	}

	@Override
	public Optional<AnimalCategory> save(AnimalCategory animalCategory) {
		logger.info(">>>>>> servico save chamado ");
		return Optional.ofNullable(repository.save(animalCategory));
	}

	@Override
	public void delete(Long id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}

	// Verificar: 
	@Override
	public Optional<AnimalCategory> updates (Long id, AnimalCategory animalCategory) {
		logger.info(">>>>>> 1.servico atualiza informações de cliente chamado");
		
		AnimalCategory animalCategoryModificado = new AnimalCategory(animalCategory.getName(), animalCategory.getRace(), animalCategory.getGender(),
				animalCategory.getSize(), animalCategory.getCoatColor());
		animalCategoryModificado.setId(id);
		
		logger.info(">>>>>> 2. servico atualiza informacoes de cliente cep valido para o id => %id", animalCategoryModificado.getId());
		return Optional.ofNullable(repository.save(animalCategoryModificado));
	}

	@Override
	public boolean existsByNameAndRaceAndGenderAndSizeAndCoatColor(String name, String race, String gender, String size,
			String coatColor) {
		if (repository.existsByNameAndRaceAndGenderAndSizeAndCoatColor(name, race, gender, size, coatColor)) {
			return true;
		}
		return false;
	}
}