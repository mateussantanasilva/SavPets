package com.fatec.scc.controller.animalReport;

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
import com.fatec.scc.model.animalReport.*;
import com.fatec.scc.services.animalReport.MaintainAnimalReport;

@Controller
@RequestMapping

public class GUIAnimalReportController {
	Logger logger = LogManager.getLogger(GUIAnimalReportController.class);
	@Autowired
	MaintainAnimalReport service;

	@GetMapping("/relatorios-animais")
	public ModelAndView showAnimalReport(AnimalReport relatorio) {
		ModelAndView modelAndView = new ModelAndView("animalReport/animalReport");
		modelAndView.addObject("relatorios", service.searchAll());

		return modelAndView;
	}

	@GetMapping("/criar-relatorio-animal")
    public ModelAndView showCreateAnimalReport(AnimalReport animalReport) {
		ModelAndView modelAndView = new ModelAndView("animalReport/createAnimalReport");
		modelAndView.addObject("medicamentos", service.searchAllMedicines());
		modelAndView.addObject("categoriasAnimais", service.searchAllCategories());
		modelAndView.addObject("relatorioAnimal", animalReport);
		//relatorioAnimal.ge
		return modelAndView;
    }

    @PostMapping("/criar-relatorio-animal")
	public RedirectView createAnimalReport(@Valid AnimalReport animalReport, BindingResult result) {
		if (result.hasErrors()) {
			return new RedirectView("/criar-relatorio-animal?status=Erro&text=Revise_os_campos_do_registro!");
		}

		if (!service.save(animalReport).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("animalCategory/createAnimalCategory");
			modelAndView.addObject("message", "Dados invalidos");
		}

		return new RedirectView("/relatorios-animais?status=Cadastrado");
	}

	@GetMapping("/atualizar-relatorio-animal/{id}")
    public ModelAndView showUpdateAnimalReport(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("animalReport/updateAnimalReport");
		modelAndView.addObject("relatorioAnimal", service.searchById(id).get());
		modelAndView.addObject("medicamentos", service.searchAllMedicines());
		modelAndView.addObject("categoriasAnimais", service.searchAllCategories());

		return modelAndView;
    }

	@PostMapping("/atualizar-relatorio-animal/{id}")
	public RedirectView updateAnimalReport(@PathVariable("id") Long id, @Valid AnimalReport animalReport, BindingResult result) {
		if (result.hasErrors()) {
			animalReport.setId(id);
			
			return new RedirectView("/atualizar-relatorio-animal/{id}?status=Erro&text=Revise_os_campos_do_registro!");
		}
		service.updates(id, animalReport);
				
		return new RedirectView("/relatorios-animais?status=Atualizado");
	}
}