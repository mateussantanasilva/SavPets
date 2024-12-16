package com.fatec.scc.controller.employee;

import javax.validation.Valid;

import com.fatec.scc.model.employee.Employee;
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
import org.springframework.web.servlet.view.RedirectView;
import com.fatec.scc.services.employee.MaintainEmployee;

@Controller
@RequestMapping
public class GUIEmployeeController {
	Logger logger = LogManager.getLogger(GUIEmployeeController.class);
	@Autowired
	MaintainEmployee service;

	private static final String FUNCIONARIO = "funcionario";



	@GetMapping("/funcionarios")
	public ModelAndView showEmployees(Employee employee) {
		ModelAndView modelAndView = new ModelAndView("employee/employee");
		modelAndView.addObject("funcionarios", service.searchAll());

		return modelAndView;
	}

	@GetMapping("/criar-funcionario")
	public ModelAndView showCreateEmployee(Employee employee) {
		ModelAndView modelAndView = new ModelAndView("employee/createEmployee");
		modelAndView.addObject(FUNCIONARIO, employee);
		modelAndView.addObject("departamentos", service.searchAllDepartaments());
		modelAndView.addObject("cargos", service.searchAllOccupations());

		return modelAndView;
	}

	@PostMapping("/criar-funcionario")
	public RedirectView createEmployee(@Valid Employee employee, BindingResult result) {
		if (service.existsByEmail(employee.getEmail())) {
			return new RedirectView("/criar-funcionario?status=Erro&text=Email_em_uso!");
		}

		if (service.existsByCpf(employee.getCpf())) {
			return new RedirectView("/criar-funcionario?status=Erro&text=CPF_em_uso!");
		}

		if (result.hasErrors()) {
			return new RedirectView("/criar-funcionario");
		}
		if (!service.save(employee).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("employee/createEmployee");
			modelAndView.addObject("message", "Dados invalidos");
		}
		return new RedirectView("/funcionarios?status=Cadastrado");
	}

	@GetMapping("/atualizar-funcionario/{id}")
	public ModelAndView showUpdateEmployee(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("employee/updateEmployee");
		modelAndView.addObject(FUNCIONARIO, service.searchById(id).get());
		modelAndView.addObject("departamentos", service.searchAllDepartaments());
		modelAndView.addObject("cargos", service.searchAllOccupations());

		return modelAndView;
	}

	@PostMapping("/atualizar-funcionario/{id}")
	public RedirectView updateEmployee(@PathVariable("id") Long id, @Valid Employee employee, BindingResult result) {
		employee.setPassword(service.searchById(id).get().getPassword());
		employee.setRepeatPassword(service.searchById(id).get().getRepeatPassword());
		
		if (!employee.getEmail().equals(service.searchById(id).get().getEmail())
				&& service.existsByEmail(employee.getEmail())) {
			return new RedirectView("/atualizar-funcionario/{id}?status=Erro&text=Email_em_uso!");
		}

		if (result.hasErrors()) {
			employee.setId(id);

			return new RedirectView("/atualizar-funcionario/{id}");
		}
		service.updates(id, employee);

		return new RedirectView("/funcionarios?status=Atualizado");
	}

	@GetMapping("/deletar-funcionario/{id}")
	public RedirectView deleteEmployee(@PathVariable("id") Long id) {
		service.delete(id);
		return new RedirectView("/funcionarios");
	}

	// MÉTODOS PARA ALTERAÇÃO DOS DADOS DO FUNCIONÁRIO LOGADO

	@GetMapping("/atualizar-cadastro/{id}")
	public ModelAndView showUpdateEmployeeRegister(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("employee/updateEmployeeRegister");
		modelAndView.addObject(FUNCIONARIO, service.searchById(id).get());

		return modelAndView;
	}

	@PostMapping("/atualizar-cadastro/{id}")
	public RedirectView updateEmployeeRegister(@PathVariable("id") Long id, @Valid Employee employee,
			BindingResult result) {
		employee.setOccupation(service.searchById(id).get().getOccupation());
		employee.setDepartament(service.searchById(id).get().getDepartament());
		
		if (employee.getPassword() == null) {
			employee.setPassword(service.searchById(id).get().getPassword());
			employee.setRepeatPassword(service.searchById(id).get().getRepeatPassword());
		}
		
		if (!employee.getEmail().equals(service.searchById(id).get().getEmail())
				&& service.existsByEmail(employee.getEmail())) {
			return new RedirectView("/atualizar-cadastro/{id}?status=Erro&text=Email_em_uso!");
		}

		if (result.hasErrors()) {
			employee.setId(id);

			return new RedirectView("/atualizar-cadastro/{id}");
		}

		service.updates(id, employee);

		return new RedirectView("/painel?status=Atualizado");
	}
}
