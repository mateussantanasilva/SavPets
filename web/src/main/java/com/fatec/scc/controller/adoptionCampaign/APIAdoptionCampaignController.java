package com.fatec.scc.controller.adoptionCampaign;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.scc.model.adoptionCampaign.AdoptionCampaign;
import com.fatec.scc.model.adoptionCampaign.AdoptionCampaignDTO;
import com.fatec.scc.services.adoptionCampaign.MaintainAdoptionCampaignI;

@RestController
@RequestMapping("/api/v1/campanhas-adocao")
public class APIAdoptionCampaignController {
	@Autowired
	MaintainAdoptionCampaignI mantemAdoptionCampaign;
	AdoptionCampaign campaign;
	Logger logger = LogManager.getLogger(this.getClass());

	@CrossOrigin // desabilita o cors do spring security
	@PostMapping
	public ResponseEntity<Object> saveAdoptionCampaign(@RequestBody @Valid AdoptionCampaignDTO adoptionCampaignDTO, BindingResult result) {
		campaign = new AdoptionCampaign();
		logger.info(">>>>>> api cadastra informações de campanha chamado");
		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller validação da entrada: dados inválidos - {}", result.getFieldError());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(mantemAdoptionCampaign.save(adoptionCampaignDTO.returnAdoptionCampaign()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro não esperado ");
		}
	}

	@CrossOrigin // desabilita o cors do spring security
	@GetMapping
	public ResponseEntity<List<AdoptionCampaign>> FindAll() {
		return ResponseEntity.status(HttpStatus.OK).body(mantemAdoptionCampaign.searchAll());
	}

	@CrossOrigin // desabilita o cors do spring security
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable(value = "id") String id) {
		Optional<AdoptionCampaign> campaignDelete = mantemAdoptionCampaign.searchById(id);

		if (campaignDelete.isPresent()) {
			mantemAdoptionCampaign.delete(campaignDelete.get().getId());
			return ResponseEntity.status(HttpStatus.OK).body("Campanha de adoção excluída");
		} else {

			return adoptionCampaignIsEmpty(campaignDelete);
		}
	}



	@CrossOrigin // desabilita o cors do spring security
	@PutMapping("/{id}")
	public ResponseEntity<Object> updates(@PathVariable String id, @RequestBody @Valid AdoptionCampaignDTO adoptionCampaignDTO,
										  BindingResult result) {
		logger.info(">>>>>> api atualiza informações de campanha chamado");
		if (result.hasErrors()) {
			logger.info(">>>>>> apicontroller atualiza informações de campanha chamado dados invalidos");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");
		}
		Optional<AdoptionCampaign> campaignUpdate = mantemAdoptionCampaign.searchById(id);

		if (campaignUpdate.isPresent()) {
			Optional<AdoptionCampaign> campaign2 = mantemAdoptionCampaign.updates(id, adoptionCampaignDTO.returnAdoptionCampaign());

			if (campaign2.isPresent()) {
				return ResponseEntity.status(HttpStatus.OK).body(campaign2.get());
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar campanha.");
			}
		} else {
			return adoptionCampaignIsEmpty(campaignUpdate);
		}

	}


	@CrossOrigin // desabilita o cors do spring security
	@GetMapping("/{id}")
	public ResponseEntity<Object> searchById(@PathVariable String id) {
		logger.info(">>>>>> apicontroller consulta por id chamado");
		Optional<AdoptionCampaign> campaignFound = mantemAdoptionCampaign.searchById(id);

		if (campaignFound.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK).body(campaignFound.get());
		} else {

			return adoptionCampaignIsEmpty(campaignFound);
		}
	}



	public ResponseEntity<Object> adoptionCampaignIsEmpty (Optional<AdoptionCampaign> campaign) {
		if (campaign.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(campaign.get());
	}
}
