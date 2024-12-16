package com.fatec.scc.services.adoptionCampaign;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.scc.model.adoptionCampaign.AdoptionCampaign;
import com.fatec.scc.model.adoptionCampaign.MaintainAdoptionCampaignRepository;

@Service
public class MaintainAdoptionCampaignI implements MaintainAdoptionCampaign {
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainAdoptionCampaignRepository repository;
	
	@Override
	public List<AdoptionCampaign> searchAll() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repository.findAll();
	}
	
	@Override
	public Optional<AdoptionCampaign> searchById(String id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}
	
	@Override
	public Optional<AdoptionCampaign> save(AdoptionCampaign adoptionCampaign) {
		logger.info(">>>>>> servico save chamado ");
		return Optional.ofNullable(repository.save(adoptionCampaign));
	}

	@Override
	public Optional<AdoptionCampaign> updates(String id, AdoptionCampaign adoptionCampaign) {
		logger.info(">>>>>> 1.servico atualiza informações de campanha chamado");
		AdoptionCampaign modifiedCampaign = new AdoptionCampaign(adoptionCampaign.getName(), adoptionCampaign.getDescription(), adoptionCampaign.getDate(), adoptionCampaign.getStartTime(),
				adoptionCampaign.getEndTime(), adoptionCampaign.getLocation());

		modifiedCampaign.setId(id);
		
		return Optional.ofNullable(repository.save(modifiedCampaign));
	}

	@Override
	public void delete(String id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}
}
