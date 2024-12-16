package com.fatec.scc.model.occupation;

import javax.validation.constraints.NotBlank;


public class OccupationDTO {

	@NotBlank(message = "Nome da categoria é requerido")
	private String name;

	@NotBlank(message = "Descrição do cargo é obrigatória")
	private String description;

	public OccupationDTO (String name, String description) {
		this.name = name;
		this.description = description;
	
	}

	public OccupationDTO() {
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


	public Occupation returnOneOccupation() {
		return new Occupation(name, description);
	}
}