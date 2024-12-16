package com.fatec.scc.model.register;

import javax.validation.constraints.NotBlank;

import jakarta.persistence.Column;

public class RegisterDTO {
	@NotBlank(message = "Nome é requerido")
	private String name;

	@NotBlank(message = "Sobrenome é requerido")
	private String surname;
	
	@Column(unique = true)
	@NotBlank(message = "Email é requerido")
	private String email;

	@NotBlank(message = "A senha é obrigatória")
	private String password;
	
	@NotBlank(message = "Repetir a senha é obrigatório")
	private String repeatPassword;

	// Construtores
	public RegisterDTO() {	}

	public RegisterDTO(String name, String surname, String email, String password, String repeatPassword) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.repeatPassword = repeatPassword;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}
	
	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getRepeatPassword() {
		return repeatPassword;
	}
	
	public void setRepeatPassword(String repeatPassword) {
		this.repeatPassword = repeatPassword;
	}
	
	public Register returnRegister() {
		return new Register(name, surname, email, password, repeatPassword);
	}
}
