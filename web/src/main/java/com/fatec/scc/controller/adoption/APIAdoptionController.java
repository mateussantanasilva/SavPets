package com.fatec.scc.controller.adoption;

import java.util.Optional;
import javax.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fatec.scc.model.adoption.Adoption;
import com.fatec.scc.model.adoption.AdoptionDTO;
import com.fatec.scc.services.adoption.MaintainAdoptionI;

@RestController
@RequestMapping("/api/v1/adocao")
public class APIAdoptionController {
	@Autowired
	MaintainAdoptionI maintainAdoption;
	Adoption adoption;
	Logger logger = LogManager.getLogger(this.getClass());

	@CrossOrigin // desabilita o cors do spring security
	@PostMapping
	public ResponseEntity<Object> saveAnimalReport(
			@RequestBody @Valid AdoptionDTO adoptionDTO,
			BindingResult result) {
		adoption = new Adoption();

		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller validação da entrada: dados inválidos - {}", result.getFieldError());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(maintainAdoption.save(adoptionDTO.retornoUmaAdocao()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro não esperado ");
		}
	}

	@CrossOrigin // desabilita o cors do spring security
	@GetMapping
	public ResponseEntity<Object> FindAll() {
		return ResponseEntity.status(HttpStatus.OK).body(maintainAdoption.searchAll());
	}

	@CrossOrigin // desabilita o cors do spring security
	@PutMapping("/{id}")
	public ResponseEntity<Object> updates(@PathVariable long id,
										  @RequestBody @Valid AdoptionDTO adoptionDTO, BindingResult result) {
		logger.info(">>>>>> api atualiza informações do relatorio do animal chamada");
		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller atualiza informações de realtorio chamado dados invalidos");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		Optional<Adoption> r = maintainAdoption.searchById(id);
		if (r.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		}

		Optional<Adoption> relatorioAnimal = maintainAdoption.updates(id,
				adoptionDTO.retornoUmaAdocao());
		if (relatorioAnimal.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(relatorioAnimal.get());
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar adoção.");
		}
	}




	@CrossOrigin // desabilita o cors do spring security
	@GetMapping("/{id}")
	public ResponseEntity<Object> searchById(@PathVariable Long id) {
		logger.info(">>>>>> apicontroller consulta por id chamado");
		Optional<Adoption> relatorioAnimal = maintainAdoption.searchById(id);
		if (relatorioAnimal.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(relatorioAnimal.get());
	}
}
