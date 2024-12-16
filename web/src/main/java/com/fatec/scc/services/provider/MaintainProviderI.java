package com.fatec.scc.services.provider;

import java.util.List;
import java.util.Optional;

import com.fatec.scc.model.provider.Provider;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fatec.scc.model.provider.MaintainProviderRepository;

/**
 * A classe mantem cliente implementa o padrao Service. Servce eh um padrao que
 * basicamente encapsula o processo de obtencao de serviços(objetos). O Service
 * cria uma camada de abstracao neste processo. Ao inves da classe dependente
 * instanciar suas dependencias diretamente, eles são solicitados a partir de um
 * objeto centralizado que atua como localizador de serviços.
 * 
 * @author
 *
 */
@Service
public class MaintainProviderI implements MaintainProvider {
	Logger logger = LogManager.getLogger(this.getClass());
	@Autowired
	MaintainProviderRepository repository;

	public List<Provider> searchAll() {
		logger.info(">>>>>> servico consultaTodos chamado");
		return repository.findAll();
	}

	@Override
	public Optional<Provider> searchByCnpj(String cnpj) {
		logger.info(">>>>>> servico consultaPorCpf chamado");
		return repository.findByCnpj(cnpj);
	}

	@Override
	public Optional<Provider> searchById(Long id) {
		logger.info(">>>>>> servico consultaPorId chamado");
		return repository.findById(id);
	}

	@Override
	public Optional<Provider> save(Provider provider) {
		logger.info(">>>>>> servico save chamado ");
		return Optional.ofNullable(repository.save(provider));
	}

	@Override
	public void delete(Long id) {
		logger.info(">>>>>> servico delete por id chamado");
		repository.deleteById(id);
	}

	@Override
	public Optional<Provider> updates(Long id, Provider provider) {
		logger.info(">>>>>> 1.servico atualiza informações de cliente chamado");
		
		Provider providerModificado2 = this.repository.findById(id).get();
		provider.setId(id);
		
		if (provider.getCep() == null) {
			provider.setCep(providerModificado2.getCep());
		}
		
		if (provider.getCnpj() == null) {
			provider.setCnpj(providerModificado2.getCnpj());
		}
		
		if (provider.getComplement() == null) {
			provider.setComplement(providerModificado2.getComplement());
		}
		if (provider.getAddress() == null) {
			provider.setAddress(providerModificado2.getAddress());
		}
		if(provider.getName() == null) {
			provider.setName(providerModificado2.getName());
		}
		
		
		
		logger.info(">>>>>> 2. servico atualiza informacoes de cliente cep valido para o id => %id", providerModificado2.getId());
		return Optional.ofNullable(repository.save(provider));
	}

	@Override
	public boolean existsByCnpj(String cnpj) {
		logger.info(">>>>>> servico verifica se existe cadastro chamado");
		if (repository.existsByCnpj(cnpj)) {
			return true;
		}
		return false;
	}
}