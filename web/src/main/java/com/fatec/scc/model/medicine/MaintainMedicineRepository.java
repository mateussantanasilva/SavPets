package com.fatec.scc.model.medicine;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaintainMedicineRepository extends JpaRepository<Medicine, Long>{

    Optional<Medicine> findByName(String name);
}
