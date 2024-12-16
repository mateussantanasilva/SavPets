package com.fatec.scc.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.fatec.scc.model.register.Register;

public interface MaintainRegister {
	List<Register> searchAll();

	@Valid Optional<Register> searchByEmail(String email);

	@Valid Optional<Register> searchById(Long id);

	Optional<Register> save(Register register);

	void delete(Long id);

	Optional<Register> updates(Long id, Register register);

	Optional<Register> updates(String email, String senha);
	
	Boolean existsByEmail(String email);
	
	Boolean verify(String email, String senha);
}
