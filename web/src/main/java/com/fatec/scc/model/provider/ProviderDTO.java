package com.fatec.scc.model.provider;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.br.CNPJ;

import jakarta.persistence.Column;

public class ProviderDTO {
	@NotBlank(message = "Nome é requerido")
	private String name;
	@CNPJ
	@Column(unique = true)
	private String cnpj;
	@NotBlank(message = "O CNPJ é obrigatório.")
	private String cep;
	@NotBlank
	private String address;
	@NotBlank(message = "O número do endereço é obrigatório")
	private Integer locationNumber;
	private String complement;

	public ProviderDTO() {
		
	}
	
	public ProviderDTO(String name, String cnpj, String cep, String address, Integer locationNumber, String complement) {
		this.name = name;
		this.cnpj = cnpj;
		this.cep = cep;
		this.address = address;
		this.locationNumber = locationNumber;
		this.complement = complement;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getCnpj() {
		return cnpj;
	}
	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	public String getComplement() {
		return complement;
	}
	public void setComplement(String complement) {
		this.complement = complement;
	}
	
	public Integer getLocationNumber() {
		return locationNumber;
	}
	public void setLocationNumber(Integer locationNumber) {
		this.locationNumber = locationNumber;
	}

	public Provider returnProvider() {
		return new Provider(name, cnpj, cep, address, locationNumber, complement);
	}
}
