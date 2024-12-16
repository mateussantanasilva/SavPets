package com.fatec.scc.model.employee;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MaintainEmployeeRepository extends JpaRepository<Employee, Long> {

	Optional<Employee> findByCpf(String cpf);

	boolean existsByEmail(String email);

	boolean existsByCpf(String cpf);

	Optional<Employee> findByEmail(String email);

}