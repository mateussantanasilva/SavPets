package com.fatec.scc.model.client;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Esta classe abstrai a programação de consultas para acesso ao banco de dados.
 * O nome dos metodos para consulta têm duas partes separadas pela palavra-chave
 * By. A primeira parte é o “find” seguido de By. A segunda parte é o nome do
 * atribudo na tabela por exemplo Cpf - findByCpf
 * 
 * @author
 */
@Repository
public interface MaintainClientRepository extends JpaRepository<Client, Long> {
	Optional<Client> findByCpf(String cpf);
	List<Client> findAllByFirstNameIgnoreCaseContaining(String firstName);
	boolean existsByCpf(String cpf);
}