package com.fatec.scc.model.animalCategory;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Esta classe abstrai a programação de consultas para acesso ao banco de dados.
 * O nome dos metodos para consulta têm duas partes separadas pela palavra-chave
 * By. A primeira parte é o “find” seguido de By. A segunda parte é o nome do
 * atributo na tabela por exemplo Cpf - findByCpf
 * 
 * @author
 */
@Repository
public interface MaintainAnimalCategoryRepository extends JpaRepository<AnimalCategory, Long> {
	Optional<AnimalCategory> findByName(String name);

	Optional<AnimalCategory> findByRace(String race);
	
	Optional<AnimalCategory> findByGender(String gender);
	
	Optional<AnimalCategory> findBySize(String size);
	
	Optional<AnimalCategory> findByCoatColor(String coatColor);
	
	List<AnimalCategory> findAllByNameIgnoreCaseContaining(String name);

	boolean existsByNameAndRaceAndGenderAndSizeAndCoatColor(String name, String race, String gender, String size,
			String coatColor);
}
