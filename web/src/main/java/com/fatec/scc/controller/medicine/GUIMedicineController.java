package com.fatec.scc.controller.medicine;

import javax.validation.Valid;

import com.fatec.scc.model.medicine.Medicine;
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

import com.fatec.scc.services.provider.MaintainProvider;
import com.fatec.scc.services.medicine.MaintainMedicine;
@Controller
@RequestMapping
public class GUIMedicineController {
	 Logger logger = LogManager.getLogger(GUIMedicineController.class);
		@Autowired
		MaintainMedicine service;
		MaintainProvider service2;
		/* É necessário adicionar o objeto no modelAndView 
		 * para que possa utilizar os dados dele no frontend, 
		 * exemplo: na view de clientes, fazer um loop de todos os dados armazenados de clientes
		*/

		@GetMapping("/medicamentos")
		public ModelAndView showMedicine(Medicine medicine) {
			ModelAndView modelAndView = new ModelAndView("medicine/medicine");
			modelAndView.addObject("medicamentos", service.searchAll());

			return modelAndView;
		}

		@GetMapping("/criar-medicamento")
	    public ModelAndView showCreateMedicine(Medicine medicine) {
			ModelAndView modelAndView = new ModelAndView("medicine/createMedicine");
			modelAndView.addObject("fornecedores", service.searchAllF());
			modelAndView.addObject("medicamento", medicine);
			
			return modelAndView;
	    }
		@PostMapping("/criar-medicamento")
		public RedirectView createMedicine(@Valid Medicine medicine, BindingResult result) {
			if (result.hasErrors()) {
				return new RedirectView("/criar-medicamento?status=Erro&text=Revise_os_campos_do_registro!");
			}
			if (!service.save(medicine).isPresent()) {
				ModelAndView modelAndView = new ModelAndView("medicine/createMedicine");
				modelAndView.addObject("message", "Dados invalidos");
			}
			return new RedirectView("/medicamentos?status=Cadastrado"); 
		}
		
		
		
		@GetMapping("/atualizar-medicamento/{id}")
	    public ModelAndView showUpdateMedicine(@PathVariable("id") Long id) {
			ModelAndView modelAndView = new ModelAndView("medicine/updateMedicine");
			modelAndView.addObject("medicamento", service.searchById(id).get());
			modelAndView.addObject("fornecedores", service.searchAllF());

			return modelAndView;
	    }

		@PostMapping("/atualizar-medicamento/{id}")
		public RedirectView updateMedicine(@PathVariable("id") Long id, @Valid Medicine medicine, BindingResult result) {
			if (result.hasErrors()) {
				medicine.setId(id);
				
				return new RedirectView("/atualizar-medicamento/{id}?status=Erro&text=Revise_os_campos_do_registro!");
			}
			service.updates(id, medicine);
					
			return new RedirectView("/medicamentos?status=Atualizado");
		}
		@GetMapping("/deletar-medicamento/{id}")
		public RedirectView deleteMedicine(@PathVariable("id") Long id) {
			service.delete(id);
			return new RedirectView("/medicamentos");
		}
}	
