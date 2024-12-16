package com.fatec.scc.services.employee;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.scc.model.departament.Departament;
import com.fatec.scc.model.departament.MaintainDepartamentRepository;
import com.fatec.scc.model.employee.Employee;
import com.fatec.scc.model.employee.MaintainEmployeeRepository;
import com.fatec.scc.model.occupation.MaintainOccupationRepository;
import com.fatec.scc.model.occupation.Occupation;

@Service
public class MaintainEmployeeI implements MaintainEmployee {
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainEmployeeRepository repository;
	@Autowired
	MaintainDepartamentRepository repositoryD;
	@Autowired
	MaintainOccupationRepository repositoryO;
	private static final String LOG_MESSAGE = ">>>>>> servico consultaTodos chamado";

	public List<Employee> searchAll() {
		logger.info(LOG_MESSAGE);
		return repository.findAll();
	}

	@Override
	public Optional<Employee> searchByCpf(String cpf) {
		logger.info(">>>>>> servico consultaPorCpf chamado");
		return repository.findByCpf(cpf);
	}

	@Override
	public Optional<Employee> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}
	
	@Override
	public Optional<Employee> save(Employee employee) {
		logger.info(">>>>>> servico save chamado ");
		return Optional.ofNullable(repository.save(employee));
	}

	@Override
	public void delete(Long id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}

	@Override
	public Optional<Employee> updates(Long id, Employee employee) {
		logger.info(">>>>>> 1.servico atualiza informações de funcionario chamado");
		Employee modifiedEmployee = new Employee(employee.getName(), employee.getSurname(), employee.getEmail(),
				employee.getPassword(), employee.getRepeatPassword(), employee.getCpf(), employee.getCep(),
				employee.getAddress(), employee.getLocationNumber(), employee.getComplement(),
				employee.getAccountNumber(), employee.getDepartament(), employee.getOccupation());
		Employee modifiedEmployee2 = this.repository.findById(id).get();

		modifiedEmployee.setId(id);

		if (employee.getCpf() == null) {
			employee.setCpf(modifiedEmployee2.getCpf());
		}

		modifiedEmployee.setCpf(employee.getCpf());
		return Optional.ofNullable(repository.save(modifiedEmployee));
	}

	@Override
	public List<Departament> searchAllDepartaments() {
		logger.info(LOG_MESSAGE);
		return repositoryD.findAll();
	}

	@Override
	public List<Occupation> searchAllOccupations() {
		logger.info(LOG_MESSAGE);
		return repositoryO.findAll();
	}

	@Override
	public boolean existsByEmail(String email) {
		logger.info(">>>>>> servico verifica se existe cadastro chamado");
		if (repository.existsByEmail(email)) {
			return true;
		}
		return false;
	}

	@Override
	public boolean existsByCpf(String cpf) {
		logger.info(">>>>>> servico verifica se existe cadastro chamado");
		if (repository.existsByCpf(cpf)) {
			return true;
		}
		return false;
	}

	@Override
	public Optional<Employee> searchByEmail(String email) {
		logger.info(">>>>>> servico consultaPorEmail chamado");
		return repository.findByEmail(email);
	}
	
	@Override
	public Optional<Employee> updates(String email, String senha) {
		logger.info(">>>>>> servico atualiza senha de cadastro chamado");
		Optional<Employee> auxiliaryRegister = repository.findByEmail(email);
		Employee modifiedRegister = new Employee(auxiliaryRegister.get().getName(), auxiliaryRegister.get().getSurname(), auxiliaryRegister.get().getEmail(),
				auxiliaryRegister.get().getPassword(), auxiliaryRegister.get().getRepeatPassword(), auxiliaryRegister.get().getCpf(), auxiliaryRegister.get().getCep(),
				auxiliaryRegister.get().getAddress(), auxiliaryRegister.get().getLocationNumber(), auxiliaryRegister.get().getComplement(),
				auxiliaryRegister.get().getAccountNumber(), auxiliaryRegister.get().getDepartament(), auxiliaryRegister.get().getOccupation());
		modifiedRegister.setId(auxiliaryRegister.get().getId());
		modifiedRegister.setPassword(senha);
		modifiedRegister.setRepeatPassword(senha);
		return Optional.ofNullable(repository.save(modifiedRegister));
	}
}