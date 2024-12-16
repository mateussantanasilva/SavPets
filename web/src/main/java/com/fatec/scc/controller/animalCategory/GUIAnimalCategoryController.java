package com.fatec.scc.controller.animalCategory;

import javax.validation.Valid;

import com.fatec.scc.model.animalCategory.AnimalCategory;
import com.fatec.scc.model.animalCategory.AnimalCategoryDTO;

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

import com.fatec.scc.services.animalCategory.MaintainAnimalCategory;

@Controller
@RequestMapping
public class GUIAnimalCategoryController {
    Logger logger = LogManager.getLogger(GUIAnimalCategoryController.class);
	@Autowired
	MaintainAnimalCategory service;

	/* É necessário adicionar o objeto no modelAndView 
	 * para que possa utilizar os dados dele no frontend, 
	 * exemplo: na view de clientes, fazer um loop de todos os dados armazenados de clientes
	*/

	@GetMapping("/categorias-animais")
	public ModelAndView showAnimalCategory(AnimalCategory animalCategory) {
		ModelAndView modelAndView = new ModelAndView("animalCategory/animalCategory");
		modelAndView.addObject("categoriasAnimais", service.searchAll());

		return modelAndView;
	}

	@GetMapping("/criar-categoria-animal")
    public ModelAndView showCreateAnimalCategory(AnimalCategory animalCategory) {
		ModelAndView modelAndView = new ModelAndView("animalCategory/createAnimalCategory");
		modelAndView.addObject("categoriaAnimal", animalCategory);

		return modelAndView;
    }

    @PostMapping("/criar-categoria-animal")
	public RedirectView createAnimalCategory(@Valid AnimalCategoryDTO animalCategory, BindingResult result) {
		if (service.existsByNameAndRaceAndGenderAndSizeAndCoatColor(animalCategory.getName(), animalCategory.getRace(), animalCategory.getGender(), animalCategory.getSize(),
				animalCategory.getCoatColor())) {
			return new RedirectView("/criar-categoria-animal?status=Erro&text=Animal_existente!");
		}
    	
    	if (result.hasErrors()) {
			return new RedirectView("/criar-categoria-animal?status=Erro&text=Revise_os_campos_do_registro!");
		}

		if (!service.save(animalCategory.retornaUmaCategoriaAnimal()).isPresent()) {
			ModelAndView modelAndView = new ModelAndView("animalCategory/createAnimalCategory");
			modelAndView.addObject("message", "Dados invalidos");
		}
		
		return new RedirectView("/categorias-animais?status=Cadastrado");
	}

	@GetMapping("/atualizar-categoria-animal/{id}")
    public ModelAndView showUpdateAnimalCategory(@PathVariable("id") Long id) {
		ModelAndView modelAndView = new ModelAndView("animalCategory/updateAnimalCategory");
		modelAndView.addObject("categoriaAnimal", service.searchById(id).get());

		return modelAndView;
    }

	@PostMapping("/atualizar-categoria-animal/{id}")
	public RedirectView updateAnimalCategory(@PathVariable("id") Long id, @Valid AnimalCategory animalCategory, BindingResult result) {
		if (service.existsByNameAndRaceAndGenderAndSizeAndCoatColor(animalCategory.getName(), animalCategory.getRace(), animalCategory.getGender(), animalCategory.getSize(),
				animalCategory.getCoatColor())) {
			return new RedirectView("/atualizar-categoria-animal/{id}?status=Erro&text=Animal_existente!");
		}
		
		if (result.hasErrors()) {
			animalCategory.setId(id);
			
			return new RedirectView("/atualizar-categoria-animal/{id}?status=Erro&text=Revise_os_campos_do_registro!");
		}
		service.updates(id, animalCategory);
				
		return new RedirectView("/categorias-animais?status=Atualizado");
	}

	@GetMapping("/deletar-categoria-animal/{id}")
	public RedirectView deleteAnimalCategory(@PathVariable("id") Long id) {
		service.delete(id);
		return new RedirectView("/categorias-animais");
	}
}