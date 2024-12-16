package com.fatec.scc.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.scc.model.register.Register;
import com.fatec.scc.model.register.RegisterDTO;
import com.fatec.scc.services.Email;
import com.fatec.scc.services.MaintainRegisterI;

@RestController
@RequestMapping("/api/v1/cadastros")
public class APIHomeController {
	@Autowired
	MaintainRegisterI maintainRegisterI;
	Register register;
	@Autowired
	Email email;

	// @CrossOrigin desabilita o cors do spring security
	@CrossOrigin
	@GetMapping
	public ResponseEntity<List<Register>> FindAll() {
		return ResponseEntity.status(HttpStatus.OK).body(maintainRegisterI.searchAll());
	}

	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Object> searchById(@PathVariable Long id) {

		Optional<Register> registerFound = maintainRegisterI.searchById(id);

		registerIsEmpty(registerFound);

		if (registerFound.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(registerFound.get());
		}
		return registerIsEmpty(registerFound);
	}



	@CrossOrigin
	@PostMapping
	public ResponseEntity<Object> saveRegister(@RequestBody @Valid RegisterDTO registerDTO, BindingResult result) {

		register = new Register();

		if (result.hasErrors())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");

		if (maintainRegisterI.searchByEmail(registerDTO.getEmail()).isPresent())
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Departamento já cadastrado");

		try {
			register.setEmail(registerDTO.getEmail());

			return ResponseEntity.status(HttpStatus.CREATED)
					.body(maintainRegisterI.save(registerDTO.returnRegister()));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<Object> updates(
			@PathVariable long id,
			@RequestBody @Valid RegisterDTO registerDTO,
			BindingResult result) {

		if (result.hasErrors())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");

		Optional<Register> departament = maintainRegisterI.searchById(id);

		if (!departament.isEmpty()) {
			departament = maintainRegisterI.updates(id, registerDTO.returnRegister());

			if (departament.isPresent()) {
				return ResponseEntity.status(HttpStatus.OK).body(departament.get());
			}
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
	}


	@CrossOrigin
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {

		Optional<Register> registerDelete = maintainRegisterI.searchById(id);

		if (!registerDelete.isEmpty()) {
			maintainRegisterI.delete(registerDelete.get().getId());

			return ResponseEntity.status(HttpStatus.OK).body("Categoria excluida");
		}

		return registerIsEmpty(registerDelete);
	}

	public ResponseEntity<Object> registerIsEmpty(Optional<Register> register) {
		if (register.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(register.get());
	}

	@CrossOrigin
	@PostMapping("/enviar-email")
	public void sendEmail(
			@RequestParam("name") String name,
			@RequestParam("clientEmail") String clientEmail,
			@RequestParam("subject") String subject,
			@RequestParam("content") String content) {

		try {
			email.sendEmail(name, clientEmail, subject, content);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
