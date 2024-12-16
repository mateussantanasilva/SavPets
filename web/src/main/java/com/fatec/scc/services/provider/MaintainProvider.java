package com.fatec.scc.services.provider;

import java.util.List;
import java.util.Optional;
import com.fatec.scc.model.provider.Provider;

public interface MaintainProvider {
	List<Provider> searchAll();

	Optional<Provider> searchByCnpj(String cnpj);

	Optional<Provider> searchById(Long id);

	Optional<Provider> save(Provider provider);

	void delete(Long id);

	Optional<Provider> updates(Long id, Provider provider);

	boolean existsByCnpj(String cnpj);


}