package com.fatec.scc.controller.client;

import javax.validation.Valid;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fatec.scc.model.client.Client;
import com.fatec.scc.services.client.MaintainClient;

import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping
public class GUIClienteController {
	Logger logger = LogManager.getLogger(GUIClienteController.class);
	@Autowired
	MaintainClient service;

	@GetMapping("/clientes")
	public ModelAndView showAllClients() {
		logger.info(">>>>>> controller consulta todos chamado");
		ModelAndView modelAndView = new ModelAndView("client/client");
		modelAndView.addObject("clientes", service.searchAll());
		return modelAndView;
	}

	// Requisição GET que irá mostrar a página de criação de cliente
	@GetMapping("/criar-cliente")
	public ModelAndView showCreateClient(Client client) {
		ModelAndView mv = new ModelAndView("client/createClient");
		mv.addObject("cliente", client);
		return mv;
	}

	// Requisição POST que irá criar um novo Cliente
	@PostMapping("/criar-cliente")
	public RedirectView createClient(@Valid Client client, BindingResult result) {
		if (service.existsByCpf(client.getCpf())) {
			return new RedirectView("/criar-cliente?status=Erro&text=CPF_em_uso!");
		}
		
		if (result.hasErrors()) {
			return new RedirectView("/criar-cliente?status=Erro&text=Revise_os_campos_do_registro!");
		}

		if (!service.save(client).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("client/createClient");
			modelAndView.addObject("message", "Dados inválidos");
		}

		return new RedirectView("/clientes?status=Cadastrado");
	}

	// Requisição GET que irá renderizar a página de Atualização de Cliente
	@GetMapping("/atualizar-cliente/{id}")
	public ModelAndView showUpdateClient(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("client/updateClient");
		modelAndView.addObject("cliente", service.searchById(id).get());

		return modelAndView;
	}

	// Requisição POST que irá atualizar um cliente
	@PostMapping("/atualizar-cliente/{id}")
	public RedirectView updateClient(@PathVariable("id") Long id, @Valid Client client, BindingResult result) {
		if (result.hasErrors()) {
			client.setId(id);

			return new RedirectView("/atualizar-cliente/{id}?status=Erro&text=Revise_os_campos_do_registro!");
		}
		service.updates(id, client);

		return new RedirectView("/clientes?status=Atualizado");
	}

	// Requisição GET que irá renderizar a página para deletar um cliente
	@GetMapping("/deletar-cliente/{id}")
	public RedirectView deleteClient(@PathVariable("id") Long id) {
		service.delete(id);
		return new RedirectView("/clientes");
	}
}