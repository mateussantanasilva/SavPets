package com.fatec.scc.services.client;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.client.Client;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import com.fatec.scc.model.Endereco;
import com.fatec.scc.model.client.MaintainClientRepository;

/**
 * A classe mantem cliente implementa o padrao Service. Servce eh um padrao que
 * basicamente encapsula o processo de obtencao de serviços(objetos). O Service
 * cria uma camada de abstracao neste processo. Ao inves da classe dependente
 * instanciar suas dependencias diretamente, eles são solicitados a partir de um
 * objeto centralizado que atua como localizador de serviços.
 * 
 * @author
 *
 */
@Service
public class MaintainClientI implements MaintainClient {
	// Código que está comentado será implementado futuramente com a API "ViaCEP"
	
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainClientRepository repository;

	public List<Client> searchAll() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repository.findAll();
	}

	@Override
	public Optional<Client> searchByCpf(String cpf) {
		logger.info(">>>>>> servico consultaPorCpf chamado");
		return repository.findByCpf(cpf);
	}

	@Override
	public Optional<Client> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}

	
	@Override 
	public Optional<Client> save(Client client) {
	 logger.info(">>>>>> servico save chamado ");
	 String endereco = client.getAddress();
	 client.setAddress(endereco);
	 return Optional.ofNullable(repository.save(client));
	}


	@Override
	public void delete(Long id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}

	@Override
	public Optional<Client> updates(Long id, Client client) {
		logger.info(">>>>>> 1.servico atualiza informações de funcionario chamado");
		Client clientMod = this.repository.findById(id).get();
		client.setId(id);
		
		if (client.getFirstName() == null) {
			client.setFirstName(clientMod.getFirstName());
		}
		
		if (client.getLastName() == null) {
			client.setLastName(clientMod.getLastName());
		}
		
		if (client.getCpf() == null) {
			client.setCpf(clientMod.getCpf());
		}
		if(client.getTelephone() == null) {
			client.setTelephone(clientMod.getTelephone());
		}
		if (client.getCep() == null) {
			client.setCep(clientMod.getCep());
		}
		if (client.getAddress() == null) {
			client.setAddress(clientMod.getAddress());
		}
		if (client.getLocationNumber() == null) {
			client.setLocationNumber(clientMod.getLocationNumber());
		}
		if (client.getComplement() == null) {
			client.setComplement(clientMod.getComplement());
		}
		
		logger.info(">>>>>> 2. servico atualiza informacoes de cliente cep valido para o id => %d", clientMod.getId());
		return Optional.ofNullable(repository.save(client));
	}

	public Endereco obtainAddress(String cep) {
		RestTemplate template = new RestTemplate();
		String url = "https://viacep.com.br/ws/{cep}/json/";
		logger.info(">>>>>> servico consultaCep - %d", cep);
		ResponseEntity<Endereco> resposta = null;
		try {
			resposta = template.getForEntity(url, Endereco.class, cep);
			return resposta.getBody();
		} catch (ResourceAccessException e) {
			logger.info(">>>>>> consulta CEP erro não esperado ");
			return null;
		} catch (HttpClientErrorException e) {
			logger.info(">>>>>> consulta CEP inválido erro HttpClientErrorException => %message", e.getMessage());
			return null;
		}
	}

	@Override
	public boolean existsByCpf(String cpf) {
		logger.info(">>>>>> servico verifica se existe cadastro chamado");
		if (repository.existsByCpf(cpf)) {
			return true;
		}
		return false;
	}
}