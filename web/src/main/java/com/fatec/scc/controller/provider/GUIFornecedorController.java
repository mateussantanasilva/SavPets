package com.fatec.scc.controller.provider;


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
import com.fatec.scc.model.provider.Provider;
import com.fatec.scc.services.provider.MaintainProvider;
@Controller
@RequestMapping
public class GUIFornecedorController {
	 Logger logger = LogManager.getLogger(GUIFornecedorController.class);
		@Autowired
		MaintainProvider service;

		/* É necessário adicionar o objeto no modelAndView 
		 * para que possa utilizar os dados dele no frontend, 
		 * exemplo: na view de clientes, fazer um loop de todos os dados armazenados de clientes
		*/

		@GetMapping("/fornecedores")
		public ModelAndView showProviders(Provider provider) {
			ModelAndView modelAndView = new ModelAndView("provider/provider");
			modelAndView.addObject("fornecedores", service.searchAll());

			return modelAndView;
		}

		@GetMapping("/criar-fornecedor")
	    public ModelAndView showCreateProvider(Provider provider) {
			ModelAndView modelAndView = new ModelAndView("provider/createProvider");
			modelAndView.addObject("fornecedor", provider);
			
			return modelAndView;
	    }
		
		@PostMapping("/criar-fornecedor")
		public RedirectView createProvider(@Valid Provider provider, BindingResult result) {
			if (service.existsByCnpj(provider.getCnpj())) {
				return new RedirectView("/criar-fornecedor?status=Erro&text=CNPJ_em_uso!");
			}
			
			if (result.hasErrors()) {
				return new RedirectView("/criar-fornecedor?status=Erro&text=Revise_os_campos_do_registro!");
			}
			if (!service.save(provider).isPresent()) {
				ModelAndView modelAndView = new ModelAndView("provider/createProvider");
				modelAndView.addObject("message", "Dados invalidos");
			}
			return new RedirectView("/fornecedores?status=Cadastrado"); 
		}
		
		@GetMapping("/atualizar-fornecedor/{id}")
	    public ModelAndView showUpdateProvider(@PathVariable("id") Long id) {
			ModelAndView modelAndView = new ModelAndView("provider/updateProvider");
			modelAndView.addObject("fornecedor", service.searchById(id).get());

			return modelAndView;
	    }

		@PostMapping("/atualizar-fornecedor/{id}")
		public RedirectView updateProvider(@PathVariable("id") Long id, @Valid Provider provider, BindingResult result) {
			if (result.hasErrors()) {
				provider.setId(id);
				
				return new RedirectView("/atualizar-fornecedor/{id}?status=Erro&text=Revise_os_campos_do_registro!");
			}
			service.updates(id, provider);
					
			return new RedirectView("/fornecedores?status=Atualizado");
		}
		
		@GetMapping("/deletar-fornecedor/{id}")
		public RedirectView deleteProvider(@PathVariable("id") Long id) {
			service.delete(id);
			return new RedirectView("/fornecedores");
		}
}
