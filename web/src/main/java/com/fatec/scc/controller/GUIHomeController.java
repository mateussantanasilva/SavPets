package com.fatec.scc.controller;

import javax.validation.Valid;

import com.fatec.scc.services.adoptionCampaign.MaintainAdoptionCampaign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.fatec.scc.model.employee.Employee;
import com.fatec.scc.services.MaintainRegister;
import com.fatec.scc.services.employee.MaintainEmployee;

@Controller
@RequestMapping
public class GUIHomeController {
	String username;
	String occupation;
	Long userId;
	
	@Autowired
	MaintainRegister service;
	@Autowired
	MaintainEmployee serviceE;
	@Autowired
	MaintainAdoptionCampaign serviceCampaign;

	private static final String CADASTRO = "cadastro";

	@GetMapping("/")
	public ModelAndView showIndex() {
		ModelAndView mv = new ModelAndView("index");
		return mv;
	}

	@GetMapping("/campanhas")
	public ModelAndView showCampaigns() {
		ModelAndView mv = new ModelAndView("campaigns");
		mv.addObject("campanhas", serviceCampaign.searchAll());

		return mv;
	}

	@GetMapping("/time")
	public ModelAndView showDevelopers() {
		ModelAndView mv = new ModelAndView("developers");
		return mv;
	}
	
	@GetMapping("/guia")
	public ModelAndView showGuide() {
		ModelAndView mv = new ModelAndView("accessibility");
		return mv;
	}

	@GetMapping("/login")
	public ModelAndView showLogin(Employee employee) {
		ModelAndView mv = new ModelAndView("login");
		mv.addObject(CADASTRO, employee);
		return mv;
	}
	
	@PostMapping("/login")
	public RedirectView verifyCadastro(@Valid Employee employee, BindingResult result) {
		if (result.hasErrors()) {
			return new RedirectView("/login?status=Erro&text=Revise_os_campos_de_login!");
		}
		
		if (!service.existsByEmail(employee.getEmail())) {
			return new RedirectView("/cadastrar?status=Erro&text=Cadastre-se_para_acessar_o_sistema!");
		}
		
		if (service.verify(employee.getEmail(), employee.getPassword())) {
			username = service.searchByEmail(employee.getEmail()).get().getName();
			occupation = serviceE.searchByEmail(employee.getEmail()).get().getOccupation();
			userId = serviceE.searchByEmail(employee.getEmail()).get().getId();
			return new RedirectView("/painel");
		}

		return new RedirectView("/login?status=Erro&text=Credenciais_invalidas!");
	}
	
	@GetMapping("/cadastrar")
	public ModelAndView showISignUp(Employee employee) {
		ModelAndView mv = new ModelAndView("signup");
		mv.addObject(CADASTRO, employee);
		return mv;
	}
	
	@PostMapping("/criar-cadastro")
	public RedirectView createCadastro(@Valid Employee employee, BindingResult result) {
		if (service.existsByEmail(employee.getEmail())) {
			return new RedirectView("/cadastrar?status=Erro&text=Email_em_uso!");
		}
		
		if (!employee.getPassword().equals(employee.getRepeatPassword())) {
			return new RedirectView("/cadastrar?status=Erro&text=Senhas_diferentes!");
		}
		
		if (result.hasErrors()) {
			return new RedirectView("/cadastrar?status=Erro&text=Revise_os_campos!");
		}

		if (!service.save(employee).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("signup");
			modelAndView.addObject("message", "Dados inválidos");
		}
		
		username = employee.getName();
		occupation = "";
		userId = serviceE.searchByEmail(employee.getEmail()).get().getId();
		
		return new RedirectView("/painel?status=Cadastrado");
	}
	
	@GetMapping("/alterar-senha")
	public ModelAndView showUpdateCadastro(Employee employee) {
		ModelAndView mv = new ModelAndView("changePassword");
		mv.addObject(CADASTRO, employee);
		return mv;
	}
	
	@PostMapping("/alterar-senha")
	public RedirectView updateCadastro(@Valid Employee employee, BindingResult result) {
		if (!service.existsByEmail(employee.getEmail())) {
			return new RedirectView("/cadastrar?status=Erro&text=Credenciais_sem_cadastro!");
		}
		
		if (!employee.getPassword().equals(employee.getRepeatPassword())) {
			return new RedirectView("/alterar-senha?status=Erro&text=Senhas_diferentes!");
		}
		
		if (result.hasErrors()) {
			return new RedirectView("/alterar-senha?status=Erro&text=Revise_os_campos!");
		}
		serviceE.updates(employee.getEmail(), employee.getPassword());

		return new RedirectView("/login?status=Atualizado");
	}

	@GetMapping("/painel")
	public ModelAndView showPanel() {
		ModelAndView mv = new ModelAndView("panel");
		mv.addObject("username", username);
		mv.addObject("userOccupation", occupation);
		mv.addObject("userId", userId);
		return mv;
	}
	
	@GetMapping("/error")
	public ModelAndView showError() {
		return new ModelAndView("error");
	}
}
