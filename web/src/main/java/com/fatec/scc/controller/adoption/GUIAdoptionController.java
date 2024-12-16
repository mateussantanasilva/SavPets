package com.fatec.scc.controller.adoption;

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
import org.springframework.web.servlet.view.RedirectView;

import com.fatec.scc.model.adoption.Adoption;
import com.fatec.scc.services.adoption.MaintainAdoption;
@Controller
@RequestMapping
public class GUIAdoptionController {
	Logger logger = LogManager.getLogger(GUIAdoptionController.class);
	@Autowired
	MaintainAdoption service;

	@GetMapping("/adocoes")
	public ModelAndView showAdoption(Adoption adoption) {
		ModelAndView modelAndView = new ModelAndView("adoption/adoption");
		modelAndView.addObject("adocoes", service.searchAll());

		return modelAndView;
	}

	@GetMapping("/criar-adocao")
	public ModelAndView showCreateAdoption(Adoption adoption) {
		ModelAndView modelAndView = new ModelAndView("adoption/createAdoption");
		modelAndView.addObject("funcionarios", service.searchAllEmployee());
		modelAndView.addObject("clientes", service.searchAllClient());
		modelAndView.addObject("relatorioAnimal", service.searchAllAnimalReport());
		modelAndView.addObject("adocao", adoption);
		//relatorioAnimal.ge
		return modelAndView;
    }

    @PostMapping("/criar-adocao")
	public RedirectView createAdoption(@Valid Adoption adoption, BindingResult result) {
    	adoption.setAnimalName(service.findAnimal(adoption.getAnimalReport()).get().getAnimalName());
    	
    	if (service.existsByAnimalReport(adoption.getAnimalReport())) {
			return new RedirectView("/criar-adocao?status=Erro&text=Animal_adotado!");
		}
    	
		if (result.hasErrors()) {
			return new RedirectView("/criar-adocao?status=Erro&text=Revise_os_campos_do_registro!");
		}

		if (!service.save(adoption).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("adoption/createAdoption");
			modelAndView.addObject("message", "Dados invalidos");
		}

		return new RedirectView("/adocoes?status=Cadastrado");
	}

	@GetMapping("/atualizar-adocao/{id}")
    public ModelAndView showUpdateAdoption(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("adoption/updateAdoption");
		modelAndView.addObject("adocao", service.searchById(id).get());
		modelAndView.addObject("funcionarios", service.searchAllEmployee());
		modelAndView.addObject("clientes", service.searchAllClient());
		modelAndView.addObject("relatorioAnimal", service.searchAllAnimalReport());
		
		return modelAndView;
    }

	@PostMapping("/atualizar-adocao/{id}")
	public RedirectView updateAdoption(@PathVariable("id") Long id, @Valid Adoption adoption, BindingResult result) {
		adoption.setAnimalName(service.findAnimal(adoption.getAnimalReport()).get().getAnimalName());
		
		if (service.existsByAnimalReport(adoption.getAnimalReport()) && !adoption.getAnimalReport().equals(service.searchById(id).get().getAnimalReport())) {
			return new RedirectView("/atualizar-adocao/{id}?status=Erro&text=Animal_adotado!");
		}
		
		if (result.hasErrors()) {
			adoption.setId(id);
			
			return new RedirectView("/atualizar-adocao/{id}?status=Erro&text=Revise_os_campos_do_registro!");
		}
		service.updates(id, adoption);
				
		return new RedirectView("/adocoes?status=Atualizado");
	}

}
