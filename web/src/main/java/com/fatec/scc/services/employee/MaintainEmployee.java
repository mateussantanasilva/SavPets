package com.fatec.scc.services.employee;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.departament.Departament;
import com.fatec.scc.model.employee.Employee;
import com.fatec.scc.model.occupation.Occupation;

public interface MaintainEmployee {

	Optional<Employee> searchByCpf(String cpf);

	Optional<Employee> searchById(Long id);

	Optional<Employee> save(Employee employee);

	void delete(Long id);

	Optional<Employee> updates(Long id, Employee employee);

	Object searchAll();

	List<Departament> searchAllDepartaments();

	List<Occupation> searchAllOccupations();

	boolean existsByEmail(String email);

	boolean existsByCpf(String email);

	Optional<Employee> searchByEmail(String email);

	Optional<Employee> updates(String email, String password);

}
