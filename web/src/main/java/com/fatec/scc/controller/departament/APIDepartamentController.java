package com.fatec.scc.controller.departament;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fatec.scc.model.departament.Departament;
import com.fatec.scc.model.departament.DepartamentDTO;
import com.fatec.scc.services.departament.MaintainDepartamentI;

// Classe que trata as requisicoes HTTP enviadas pelo usuario do serviço

@RestController
@RequestMapping("/api/v1/departamentos")
public class APIDepartamentController {
	@Autowired
	MaintainDepartamentI maintainDepartament;
	Departament departament;

    // @CrossOrigin desabilita o cors do spring security
    @CrossOrigin
	@GetMapping
	public ResponseEntity<List<Departament>> FindAll() {
		return ResponseEntity.status(HttpStatus.OK).body(maintainDepartament.searchAll());
	}

    @CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Object> searchById(@PathVariable Long id) {

		Optional<Departament> departamentFound = maintainDepartament.searchById(id);

		if (departamentFound.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(departamentFound.get());
		}

		return departamentIsEmpty(departamentFound);
	}


	@CrossOrigin
	@PostMapping
	public ResponseEntity<Object> saveDepartament(@RequestBody @Valid DepartamentDTO departamentDTO, BindingResult result) {
        
		departament = new Departament();

		if (result.hasErrors()) 
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		
		if (maintainDepartament.searchByName(departamentDTO.getName()).isPresent()) 
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Departamento já cadastrado");
		
		try {
			departament.setInitials(departamentDTO.getInitials());

            return ResponseEntity.status(HttpStatus.CREATED)
                .body(maintainDepartament.save(departamentDTO.returnDepartament()));
            
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
    @CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<Object> updates(
        @PathVariable long id, 
        @RequestBody @Valid DepartamentDTO departamentDTO, 
        BindingResult result) {

		if (result.hasErrors())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");

		Optional<Departament> departamentToUpdate = maintainDepartament.searchById(id);
		departamentIsEmpty(departamentToUpdate);

		if (departamentToUpdate.isPresent()) {
			departamentToUpdate = maintainDepartament.updates(id, departamentDTO.returnDepartament());
			return ResponseEntity.status(HttpStatus.OK).body(departamentToUpdate.get());
		} else {
			return departamentIsEmpty(departamentToUpdate);
		}
	}

		@CrossOrigin
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {

			Optional<Departament> departamentToDelete = maintainDepartament.searchById(id);
			 departamentIsEmpty(departamentToDelete);

			if (departamentToDelete.isPresent()) {
				maintainDepartament.delete(departamentToDelete.get().getId());
				return ResponseEntity.status(HttpStatus.OK).body("Categoria excluída");
			}
			return departamentIsEmpty(departamentToDelete);
		}





	public ResponseEntity<Object> departamentIsEmpty(Optional<Departament> departament) {
		if (departament.isEmpty()) 
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		
		return ResponseEntity.status(HttpStatus.OK).body("Departamento encontrado.");
	}
}