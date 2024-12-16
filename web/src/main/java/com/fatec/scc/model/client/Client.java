package com.fatec.scc.model.client;

import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NotBlank(message = "Nome é requerido")
	private String firstName;

	@NotBlank(message = "Nome é requerido")
	private String lastName;

	@CPF
	@Column(unique = true) // nao funciona com @Valid tem que tratar na camada de persistencia
	private String cpf;

	
	private String telephone;

	@NotBlank(message = "O CEP é obrigatório.")
	private String cep;

	private String address;

	@NotBlank(message = "O número do endereço é obrigatório")
	private Integer locationNumber;

	private String complement;

	public Client() {
	}

	public Client(String firstName, String lastName, String cpf, String telephone, String cep, String address, Integer locationNumber, String complement) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.cpf = cpf;
		this.telephone = telephone;
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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
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

	public Integer getLocationNumber() {
		return locationNumber;
	}

	public void setLocationNumber(Integer locationNumber) {
		this.locationNumber = locationNumber;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}
}