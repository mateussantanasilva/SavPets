package com.fatec.scc.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.scc.model.register.MaintainRegisterRepository;
import com.fatec.scc.model.register.Register;

@Service
public class MaintainRegisterI implements MaintainRegister {
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainRegisterRepository repository;

	@Override
	public List<Register> searchAll() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repository.findAll();
	}
	
	@Override
	public @Valid Optional<Register> searchByEmail(String email) {
		logger.info(">>>>>> servico consultaPorEmail chamado");
		return repository.findByEmail(email);
	}
	
	@Override
	public Optional<Register> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}
	
	@Override
	public Optional<Register> save(Register register) {
	 logger.info(">>>>>> servico save chamado ");
	 return Optional.ofNullable(repository.save(register));
	}
	
	@Override
	public void delete(Long id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}
	
	@Override
	public Optional<Register> updates(Long id, Register register) {
		logger.info(">>>>>> servico atualiza informações de cadastro chamado");
		Register modifiedRegister = new Register(register.getName(), register.getSurname(), register.getEmail(), register.getPassword(), register.getRepeatPassword());
		modifiedRegister.setId(id);
		return Optional.ofNullable(repository.save(modifiedRegister));
	}

	@Override
	public Optional<Register> updates(String email, String senha) {
		logger.info(">>>>>> servico atualiza senha de cadastro chamado");
		Optional<Register> auxiliaryRegister = repository.findByEmail(email);
		Register modifiedRegister = new Register(auxiliaryRegister.get().getName(), auxiliaryRegister.get().getSurname(), auxiliaryRegister.get().getEmail(), auxiliaryRegister.get().getPassword(), auxiliaryRegister.get().getRepeatPassword());
		modifiedRegister.setId(auxiliaryRegister.get().getId());
		modifiedRegister.setPassword(senha);
		modifiedRegister.setRepeatPassword(senha);
		return Optional.ofNullable(repository.save(modifiedRegister));
	}

	@Override
	public Boolean existsByEmail(String email) {
		logger.info(">>>>>> servico verifica se existe cadastro chamado");
		if (repository.existsByEmail(email)) {
			return true;
		}
		return false;
	}
	
	@Override
	public Boolean verify(String email, String senha) {
		logger.info(">>>>>> servico verifica se cadastro chamado e valido");
		Optional<Register> auxiliaryRegister = repository.findByEmail(email);
		if (email.equals(auxiliaryRegister.get().getEmail()) && senha.equals(auxiliaryRegister.get().getPassword())) {
			return true;
		}
		return false;
	}
}

