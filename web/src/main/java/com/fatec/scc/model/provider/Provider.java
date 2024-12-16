package com.fatec.scc.model.provider;


import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.br.CNPJ;
//The JPA was renamed as Jakarta Persistence in 2019 and version 3.0 was released in 2020. This included the renaming of packages and properties
//from javax. persistence to jakarta. persistence.
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Provider {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
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

	public Provider() {
		
	}
	
	public Provider(String name, String cnpj, String cep, String address, Integer locationNumber, String complement) {
		this.name = name;
		this.cnpj = cnpj;
		this.cep = cep;
		this.address = address;
		this.locationNumber = locationNumber;
		this.complement = complement;
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
}