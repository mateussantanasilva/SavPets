package com.fatec.scc.model.occupation;

import javax.validation.constraints.NotBlank;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;

@Entity

public class Occupation {

	@Id

	@GeneratedValue(strategy = GenerationType.AUTO)

	private Long id;

	@NotBlank(message = "Nome do cargo é requerido")

	private String name;

	@NotBlank(message = "Coloque a descrição do cargo")

	private String description;

	public Occupation(String name, String description) {

		this.name = name;

		this.description = description;

	}

	public Occupation() {

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

	public String getDescription() {

		return description;

	}

	public void setDescription(String description) {

		this.description = description;

	}

}