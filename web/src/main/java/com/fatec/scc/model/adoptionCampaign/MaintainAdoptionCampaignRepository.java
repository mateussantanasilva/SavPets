package com.fatec.scc.model.adoptionCampaign;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintainAdoptionCampaignRepository extends MongoRepository<AdoptionCampaign, Long>{

	Optional<AdoptionCampaign> findById(String id);

	void deleteById(String id);

}
