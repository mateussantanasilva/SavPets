package com.fatec.scc.controller.occupation;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.fatec.scc.model.occupation.Occupation;
import com.fatec.scc.services.occupation.MaintainOccupation;

@Controller

@RequestMapping

public class GUIOccupationController {

	@Autowired

	MaintainOccupation service;

	/*
	 * É necessário adicionar o objeto no modelAndView
	 * 
	 * para que possa utilizar os dados dele no frontend,
	 * 
	 * exemplo: na view de clientes, fazer um loop de todos os dados armazenados de
	 * clientes
	 * 
	 */

	@GetMapping("/cargos")

	public ModelAndView showOccupation() {

		ModelAndView modelAndView = new ModelAndView("occupation/occupation");

		modelAndView.addObject("occupations", service.searchAll());

		return modelAndView;

	}

	@GetMapping("/criar-cargo")

	public ModelAndView showCreateOccupation(Occupation occupation) {

		ModelAndView modelAndView = new ModelAndView("occupation/createOccupation");

		modelAndView.addObject("occupation", occupation);

		return modelAndView;

	}

	@PostMapping("/criar-cargo")

	public RedirectView createOccupation(@Valid Occupation occupation, BindingResult result) {

		if (result.hasErrors()) {

			return new RedirectView("/criar-cargo?status=Erro&text=Revise_os_campos_do_registro!");

		}

		if (service.save(occupation).isPresent()) {

			ModelAndView modelAndView = new ModelAndView("occupation/createOccupation");

			modelAndView.addObject("message", "Dados invalidos");

		}

		return new RedirectView("/cargos?status=Cadastrado");

	}

	@GetMapping("/atualizar-cargo/{id}")
	public ModelAndView showUpdateOccupation(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("occupation/updateOccupation");
		modelAndView.addObject("occupation", service.searchById(id).get());

		return modelAndView;
	}

	@PostMapping("/atualizar-cargo/{id}")
	public RedirectView updateOccupation(@PathVariable("id") Long id, @Valid Occupation occupation,
			BindingResult result) {
		if (result.hasErrors()) {
			occupation.setId(id);

			return new RedirectView("/atualizar-cargo/{id}?status=Erro&text=Revise_os_campos_do_registro!");
		}
		service.updates(id, occupation);

		return new RedirectView("/cargos?status=Atualizado");
	}

	@GetMapping("/deletar-cargo/{id}")

	public RedirectView deleteOccupation(@PathVariable("id") Long id) {

		service.delete(id);

		return new RedirectView("/cargos");

	}

}