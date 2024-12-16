package com.fatec.scc.controller.departament;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.fatec.scc.model.departament.Departament;
import com.fatec.scc.services.departament.MaintainDepartament;

@Controller
@RequestMapping
public class GUIDepartamentController {
	@Autowired
	MaintainDepartament service;

	/* É necessário adicionar o objeto no modelAndView 
	 * para que possa utilizar os dados dele no frontend, 
	 * exemplo: na view de clientes, fazer um loop de todos os dados armazenados de clientes
	*/

	@GetMapping("/departamentos")
	public ModelAndView showDepartament() {
		ModelAndView modelAndView = new ModelAndView("departament/departament");
		modelAndView.addObject("departaments", service.searchAll());

		return modelAndView;
	}

	@GetMapping("/criar-departamento")
    public ModelAndView showCreateDepartament(Departament departament) {
		ModelAndView modelAndView = new ModelAndView("departament/createDepartament");
		modelAndView.addObject("departament", departament);
		
		return modelAndView;
    }

	@PostMapping("/criar-departamento")
	public RedirectView createDepartament(@Valid Departament departament, BindingResult result) {
		if (result.hasErrors()) {
			return new RedirectView("/criar-departamento?status=Erro&text=Revise_os_campos_do_registro!");
		}

		if (!service.save(departament).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("departament/createDepartament");
			modelAndView.addObject("message", "Dados invalidos");
		}

		return new RedirectView("/departamentos?status=Cadastrado");
	}

	@GetMapping("/atualizar-departamento/{id}")
    public ModelAndView showUpdateDepartament(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("departament/updateDepartament");
		modelAndView.addObject("departament", service.searchById(id).get());
		
		return modelAndView;
    }

	@PostMapping("/atualizar-departamento/{id}")
	public RedirectView updateDepartament(@PathVariable("id") Long id, @Valid Departament departament, BindingResult result) {
		if (result.hasErrors()) {
			departament.setId(id);
			
			return new RedirectView("/atualizar-departamento/{id}?status=Erro&text=Revise_os_campos_do_registro!");
		}
		service.updates(id, departament);
				
		return new RedirectView("/departamentos?status=Atualizado");
	}

	@GetMapping("/deletar-departamento/{id}")
	public RedirectView deleteDepartament(@PathVariable("id") Long id) {
		service.delete(id);
		
		return new RedirectView("/departamentos");
	}
}