package com.fatec.scc.controller.occupation;

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

import com.fatec.scc.model.occupation.Occupation;

import com.fatec.scc.model.occupation.OccupationDTO;
import com.fatec.scc.services.occupation.MaintainOccupationI;

@RestController

@RequestMapping("/api/v1/cargos")

/*
 * 
 * Trata as requisicoes HTTP enviadas pelo usuario do servico
 * 
 */

public class APIOccupationController {

	@Autowired
	MaintainOccupationI maintainOccupation;
	Occupation occupation;

	Logger logger = LogManager.getLogger(this.getClass());

	@CrossOrigin // desabilita o cors do spring security

	@PostMapping

	public ResponseEntity<Object> saveOccupation(

			@RequestBody @Valid OccupationDTO occupationDTO,

			BindingResult result) {

		occupation = new Occupation();

		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller validação da entrada: dados inválidos - {}", result.getFieldError());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}

		if (maintainOccupation.searchByName(occupationDTO.getName()).isPresent()) {
			logger.info(">>>>>> apicontroller consultapornome cargo ja cadastrado");
			return ResponseEntity.status(HttpStatus.CONFLICT).body("cargo já cadastrado");
		}

		try {

			occupation.setDescription(occupationDTO.getDescription());

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

		}

		try {

			return ResponseEntity.status(HttpStatus.CREATED)

					.body(maintainOccupation.save(occupationDTO.returnOneOccupation()));

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro não esperado ");

		}

	}

	@CrossOrigin // desabilita o cors do spring security

	@GetMapping

	public ResponseEntity<List<Occupation>> FindAll() {

		return ResponseEntity.status(HttpStatus.OK).body(maintainOccupation.searchAll());

	}

	@CrossOrigin // desabilita o cors do spring security

	@DeleteMapping("/{id}")

	public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {

		Optional<Occupation> occupationDelete = maintainOccupation.searchById(id);

		occupationIsEmpty(occupationDelete);

		if (occupationDelete.isPresent()) {
			maintainOccupation.delete(occupationDelete.get().getId());
			return ResponseEntity.status(HttpStatus.OK).body("Cargo excluído");
		} else {
			return  occupationIsEmpty(occupationDelete);
		}
	}

	@CrossOrigin // desabilita o cors do spring security

	@PutMapping("/{id}")

	public ResponseEntity<Object> updates(@PathVariable long id,

			@RequestBody @Valid OccupationDTO occupationDTO, BindingResult result) {

		if (result.hasErrors()) {

			logger.info(">>>>>> apicontroller atualiza informações do cargo chamado dados invalidos");

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");

		}

		Optional<Occupation> c = maintainOccupation.searchById(id);

		occupationIsEmpty(c);

		Optional<Occupation> occupationUpdate = maintainOccupation.updates(id,

				occupationDTO.returnOneOccupation());

		if (occupationUpdate.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(occupationUpdate.get());
		} else {
			return occupationIsEmpty(c);
		}
	}

	@CrossOrigin // desabilita o cors do spring security

	@GetMapping("/{id}")

	public ResponseEntity<Object> searchById(@PathVariable Long id) {

		logger.info(">>>>>> apicontroller consulta por id chamado");

		Optional<Occupation> occupationFound = maintainOccupation.searchById(id);

		occupationIsEmpty(occupationFound);

		if (occupationFound.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(occupationFound.get());
		} else {
			return occupationIsEmpty(occupationFound);
		}
	}


	public ResponseEntity<Object> occupationIsEmpty (Optional<Occupation> occupation) {
		if (occupation.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(occupation.get());
	}

}