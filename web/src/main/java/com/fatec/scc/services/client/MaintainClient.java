package com.fatec.scc.services.client;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.Endereco;
import com.fatec.scc.model.client.Client;

public interface MaintainClient {
	List<Client> searchAll();

	Optional<Client> searchByCpf(String cpf);

	Optional<Client> searchById(Long id);

	Optional<Client> save(Client client);

	void delete(Long id);

	Optional<Client> updates(Long id, Client client);

	Endereco obtainAddress(String cep);

	boolean existsByCpf(String cpf);
}