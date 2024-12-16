package com.fatec.scc.model.animalCategory;

import javax.validation.constraints.NotBlank;

public class AnimalCategoryDTO {

	@NotBlank(message = "Nome da categoria é requerido")
	private String name;

	@NotBlank(message = "Nome da raça é obrigatória")
	private String race;

	@NotBlank(message = "Sexo M/F")
	private String gender;

	@NotBlank(message = "O porte é obrigatório.")
	private String size;

	@NotBlank(message = "A cor da pelagem deve ser informada")
	private String coatColor;

	public AnimalCategoryDTO(String name, String race, String gender, String size, String coatColor) {
		this.name = name;
		this.race = race;
		this.gender = gender;
		this.size = size;
		this.coatColor = coatColor;
	}

	public AnimalCategoryDTO() {
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRace() {
		return race;
	}

	public void setRace(String race) {
		this.race = race;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getCoatColor() {
		return coatColor;
	}

	public void setCoatColor(String coatColor) {
		this.coatColor = coatColor;
	}

	public AnimalCategory retornaUmaCategoriaAnimal() {
		return new AnimalCategory(name, race, gender, size, coatColor);
	}
}