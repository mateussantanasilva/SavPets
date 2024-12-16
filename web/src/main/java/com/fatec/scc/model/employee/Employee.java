package com.fatec.scc.model.employee;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.br.CPF;

import com.fatec.scc.model.register.Register;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Employee extends Register {
	@CPF
	@Column(unique = true)
	@NotBlank(message = "O CPF é obrigatório.")
	private String cpf;
	@NotBlank(message = "O CEP é obrigatório.")
	private String cep;
	@NotBlank(message = "O endereço é obrigatório")
	private String address;
	@NotBlank(message = "O número do endereço é obrigatório")
	private Integer locationNumber;
	private String complement;
	@NotBlank(message = "O número da conta deve ser informado")
	private String accountNumber;
	@NotBlank(message = "O departamento é obrigatório")
	private String departament;
	@NotBlank(message = "O cargo é obrigatório")
	private String occupation;

	//Construtores
	public Employee() {	}
	
	public Employee(String name, String surname, String email, String password, String repeatPassword, String cpf, String cep, String address, Integer locationNumber, String complement, String accountNumber, String departament, String occupation) {
		super(name, surname, email, password, repeatPassword);
		this.cpf = cpf;
		this.cep = cep;
		this.address = address;
		this.locationNumber = locationNumber;
		this.complement = complement;
		this.accountNumber = accountNumber;
		this.departament = departament;
		this.occupation = occupation;
	}
	
	public Employee(String cpf, String cep, String address, Integer locationNumber, String complement, String accountNumber, String departament, String occupation) {
		this.cpf = cpf;
		this.cep = cep;
		this.address = address;
		this.locationNumber = locationNumber;
		this.complement = complement;
		this.accountNumber = accountNumber;
		this.departament = departament;
		this.occupation = occupation;
	}
	
	public Employee(String name, String surname, String email, String password, String repeatPassword) {
		super(name, surname, email, password, repeatPassword);
	}
	
	//Getters e Setters
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
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

	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	
	public String getDepartament() {
		return departament;
	}
	public void setDepartament(String departament) {
		this.departament = departament;
	}
	
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	
}