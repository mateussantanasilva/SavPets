package com.fatec.scc.controller.animalCategory;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fatec.scc.model.animalCategory.AnimalCategory;
import com.fatec.scc.model.animalCategory.AnimalCategoryDTO;
import com.fatec.scc.services.animalCategory.MaintainAnimalCategoryI;

@RestController
@RequestMapping("/api/v1/categorias-animais")
/*
 * Trata as requisicoes HTTP enviadas pelo usuario do servico
 */
public class APIAnimalCategoryController {
	@Autowired
	MaintainAnimalCategoryI mantemCategoriaAnimal;
	AnimalCategory animalCategory;
	Logger logger = LogManager.getLogger(this.getClass());

	@CrossOrigin // desabilita o cors do spring security
	@PostMapping
	public ResponseEntity<Object> saveAnimalCategory(
			@RequestBody @Valid AnimalCategoryDTO animalCategoryDTO,
			BindingResult result) {
		animalCategory = new AnimalCategory();

		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller validação da entrada: dados inválidos - {}", result.getFieldError());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		if (mantemCategoriaAnimal.searchByName(animalCategoryDTO.getName()).isPresent()) {
			logger.info(">>>>>> apicontroller consultapornome categoria ja cadastrado");
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Categoria já cadastrada");
		}
		try {
			animalCategory.setRace(animalCategoryDTO.getRace());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		try {
			animalCategory.setGender(animalCategoryDTO.getGender());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		try {
			animalCategory.setSize(animalCategoryDTO.getSize());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		try {
			animalCategory.setCoatColor(animalCategoryDTO.getCoatColor());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(mantemCategoriaAnimal.save(animalCategoryDTO.retornaUmaCategoriaAnimal()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro não esperado ");
		}
	}

	@CrossOrigin // desabilita o cors do spring security
	@GetMapping
	public ResponseEntity<List<AnimalCategory>> FindAll() {
		return ResponseEntity.status(HttpStatus.OK).body(mantemCategoriaAnimal.searchAll());
	}

	@CrossOrigin // desabilita o cors do spring security
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {
		Optional<AnimalCategory> categoriaAnimal = mantemCategoriaAnimal.searchById(id);

		if (categoriaAnimal.isPresent()) {
			mantemCategoriaAnimal.delete(categoriaAnimal.get().getId());
			return ResponseEntity.status(HttpStatus.OK).body("Categoria excluída");
		} else {
			return animalCategoryIsEmpty(categoriaAnimal);

		}

	}




	@CrossOrigin // desabilita o cors do spring security
	@PutMapping("/{id}")
	public ResponseEntity<Object> updates(@PathVariable long id,
										  @RequestBody @Valid AnimalCategoryDTO animalCategoryDTO, BindingResult result) {
		logger.info(">>>>>> api atualiza informações da categoria do animal chamada");
		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller atualiza informações de categoria chamado dados invalidos");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		Optional<AnimalCategory> c = mantemCategoriaAnimal.searchById(id);
		animalCategoryIsEmpty(c);



		Optional<AnimalCategory> categoriaAnimal = mantemCategoriaAnimal.updates(id,
				animalCategoryDTO.retornaUmaCategoriaAnimal());
		if (categoriaAnimal.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(categoriaAnimal.get());
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar categoria do animal.");
		}
	}

	@CrossOrigin // desabilita o cors do spring security
	@GetMapping("/{id}")
	public ResponseEntity<Object> searchById(@PathVariable Long id) {
		logger.info(">>>>>> apicontroller consulta por id chamado");
		Optional<AnimalCategory> categoriaAnimal = mantemCategoriaAnimal.searchById(id);

		if (categoriaAnimal.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(categoriaAnimal.get());
		}
		return animalCategoryIsEmpty(categoriaAnimal);
	}

	public ResponseEntity<Object> animalCategoryIsEmpty (Optional<AnimalCategory> animalCategory) {
		if (animalCategory.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(animalCategory.get());
	}
}