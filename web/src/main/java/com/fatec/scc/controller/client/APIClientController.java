package com.fatec.scc.controller.client;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.scc.model.Endereco;
import com.fatec.scc.model.client.Client;
import com.fatec.scc.model.client.ClientDTO;
import com.fatec.scc.services.client.MaintainClientI;

@RestController
@RequestMapping("/api/v1/clientes")
/*
 * Trata as requisicoes HTTP enviadas pelo usuario do servico
 */
public class APIClientController {
	@Autowired
	MaintainClientI mantemCliente;
	Client client;
	Logger logger = LogManager.getLogger(this.getClass());

	@CrossOrigin // desabilita o cors do spring security
	@PostMapping
	public ResponseEntity<Object> saveClient(@RequestBody @Valid ClientDTO clientDTO, BindingResult result) {
		client = new Client();
		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller validação da entrada: dados inválidos - {}", result.getFieldError());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		if (mantemCliente.searchByCpf(clientDTO.getCpf()).isPresent()) {
			logger.info(">>>>>> apicontroller consultaporcpf cpf ja cadastrado");
			return ResponseEntity.status(HttpStatus.CONFLICT).body("CPF já cadastrado");
		}
		Optional<Endereco> endereco = Optional.ofNullable(mantemCliente.obtainAddress(clientDTO.getCep()));
		logger.info(">>>>>> apicontroller obtem endereco => {}", clientDTO.getCep());

		if (endereco.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CEP invalido");
		}
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(mantemCliente.save(clientDTO.returnClient()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro não esperado ");
		}
	}

	@CrossOrigin // desabilita o cors do spring security
	@GetMapping
	public ResponseEntity<List<Client>> FindAll() {
		return ResponseEntity.status(HttpStatus.OK).body(mantemCliente.searchAll());
	}

	@CrossOrigin // desabilita o cors do spring security
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {
		Optional<Client> cliente = mantemCliente.searchById(id);
		clientIsEmpty(cliente);

		if (cliente.isPresent()) {
			mantemCliente.delete(cliente.get().getId());
			return ResponseEntity.status(HttpStatus.OK).body("Cliente excluído");
		} else {
			return clientIsEmpty(cliente);
		}
	}




	@CrossOrigin // desabilita o cors do spring security
	@PutMapping("/{id}")
	public ResponseEntity<Object> updates(@PathVariable long id, @RequestBody @Valid ClientDTO clientDTO,
			BindingResult result) {
		logger.info(">>>>>> api atualiza informações de cliente chamado");
		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller atualiza informações de cliente chamado dados invalidos");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		Optional<Client> c = mantemCliente.searchById(id);
		clientIsEmpty(c);

		Optional<Endereco> e = Optional.ofNullable(mantemCliente.obtainAddress(clientDTO.getCep()));
		if (e.isPresent()) {
			Optional<Client> cliente = mantemCliente.updates(id, clientDTO.returnClient());
			if (cliente.isPresent()) {
				return ResponseEntity.status(HttpStatus.OK).body(cliente.get());
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar cliente.");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao atualizar");
	}


	@CrossOrigin // desabilita o cors do spring security
	@GetMapping("/{id}")
	public ResponseEntity<Object> searchById(@PathVariable Long id) {
		logger.info(">>>>>> apicontroller consulta por id chamado");
		Optional<Client> cliente = mantemCliente.searchById(id);

		if (cliente.isPresent()) {
			mantemCliente.delete(cliente.get().getId());
			return ResponseEntity.status(HttpStatus.OK).body("Cliente excluído");
		} else {
			return clientIsEmpty(cliente);
		}
	}


	public ResponseEntity<Object> clientIsEmpty (Optional<Client> client) {
		if (client.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(client.get());
	}
}