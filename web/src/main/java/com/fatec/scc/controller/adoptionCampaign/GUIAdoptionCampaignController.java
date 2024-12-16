package com.fatec.scc.controller.adoptionCampaign;

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

import com.fatec.scc.model.adoptionCampaign.AdoptionCampaign;
import com.fatec.scc.model.adoptionCampaign.AdoptionCampaignDTO;
import com.fatec.scc.services.adoptionCampaign.MaintainAdoptionCampaign;

@Controller
@RequestMapping
public class GUIAdoptionCampaignController {
	Logger logger = LogManager.getLogger(GUIAdoptionCampaignController.class);
	@Autowired
	MaintainAdoptionCampaign service;

	@GetMapping("/campanhas-adocao")
	public ModelAndView showAdoptionCampaign(AdoptionCampaignDTO campaign) {
		ModelAndView modelAndView = new ModelAndView("adoptionCampaign/adoptionCampaign");
		modelAndView.addObject("campanhasAdocao", service.searchAll());

		return modelAndView;
	}

	@GetMapping("/criar-campanha-adocao")
    public ModelAndView showCreateAdoptionCampaign(AdoptionCampaignDTO campaign) {
		ModelAndView modelAndView = new ModelAndView("adoptionCampaign/createAdoptionCampaign");
		modelAndView.addObject("campanha", campaign);
		
		return modelAndView;
    }

    @PostMapping("/criar-campanha-adocao")
	public RedirectView createAdoptionCampaign(@Valid AdoptionCampaignDTO adoptionCampaignDTO, BindingResult result) {
    	if (result.hasErrors()) {
			logger.error(result.getFieldError());
			return new RedirectView("/criar-campanha-adocao?status=Erro&text=Revise_os_campos_do_registro!");
		}

		if (!service.save(adoptionCampaignDTO.returnAdoptionCampaign()).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("adoptionCampaign/createAdoptionCampaign");
			modelAndView.addObject("message", "Dados invalidos");
		}
		
		return new RedirectView("/campanhas-adocao?status=Cadastrado");
	}

	@GetMapping("/atualizar-campanha-adocao/{id}")
    public ModelAndView showUpdateAdoptionCampaign(@PathVariable("id") String id) {
		ModelAndView modelAndView = new ModelAndView("adoptionCampaign/updateAdoptionCampaign");
		modelAndView.addObject("campanha", service.searchById(id).get());
		
		return modelAndView;
    }


	@PostMapping("/atualizar-campanha-adocao/{id}")
	public RedirectView updateAdoptionCampaign(@PathVariable("id") String id, @Valid AdoptionCampaign adoptionCampaign, BindingResult result) {
		if (result.hasErrors()) {
			adoptionCampaign.setId(id);
			
			return new RedirectView("/atualizar-campanha-adoacao/{id}?status=Erro&text=Revise_os_campos_do_registro!");
		}
		
		service.updates(id, adoptionCampaign);
		
		return new RedirectView("/campanhas-adocao?status=Atualizado");
	}

	@GetMapping("/deletar-campanha-adocao/{id}")
	public RedirectView deleteAdoptionCampaign(@PathVariable("id") String id) {
		service.delete(id);
		return new RedirectView("/campanhas-adocao");
}
}
