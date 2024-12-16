package com.fatec.scc.model.animalCategory;

import javax.validation.constraints.NotBlank;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AnimalCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NotBlank(message = "Nome da categoria é requerido")
	private String name;

	@NotBlank(message = "Nome da raça é obrigatória")
	private String race;

	@NotBlank(message = "Gênero é obrigatório")
	private String gender;

	@NotBlank(message = "O porte é obrigatório.")
	private String size;

	@NotBlank(message = "A cor da pelagem deve ser informada")
	private String coatColor;
	
	private String animalCategoryFull;

	public AnimalCategory(String name, String race, String gender, String size, String coatColor, String animalCategoryFull) {
		this.name = name;
		this.race = race;
		this.gender = gender;
		this.size = size;
		this.coatColor = coatColor;
		this.animalCategoryFull = animalCategoryFull;
	}
	
	public AnimalCategory(String name, String race, String gender, String size, String coatColor) {
		this.name = name;
		this.race = race;
		this.gender = gender;
		this.size = size;
		this.coatColor = coatColor;
		this.animalCategoryFull = name + " - " + race + " - " + gender + " - " + size + " - " + coatColor;
	}

	public AnimalCategory() {
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
	
	public String getAnimalCategoryFull() {
		return animalCategoryFull;
	}

	public void setAnimalCategoryFull(String animalCategoryFull) {
		this.animalCategoryFull = animalCategoryFull;
	}
}
