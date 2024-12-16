package com.fatec.scc.model.register;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface MaintainRegisterRepository extends JpaRepository<Register, Long> {
	Optional<Register> findByEmail(String email);

	boolean existsByEmail(String email);
}
