package com.fatec.scc.model.occupation;

import java.util.List; 

import java.util.Optional; 

import org.springframework.data.jpa.repository.JpaRepository; 

import org.springframework.stereotype.Repository; 

  

/** 

* Esta classe abstrai a programação de consultas para acesso ao banco de dados. 

* O nome dos metodos para consulta têm duas partes separadas pela palavra-chave 

* By. A primeira parte é o “find” seguido de By. A segunda parte é o nome do 

* atributo na tabela por exemplo nome - findByNome 

*  

* @author 

*/ 

@Repository 

public interface MaintainOccupationRepository extends JpaRepository<Occupation, Long> { 

	Optional<Occupation> findByName(String name); 

  

	Optional<Occupation> findByDescription(String description); 

  

	List<Occupation> findAllByNameIgnoreCaseContaining(String name); 

} 