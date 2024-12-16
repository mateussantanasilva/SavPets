package com.fatec.scc.model.animalReport;

import javax.validation.constraints.NotBlank;

public class AnimalReportDTO {
	@NotBlank(message = "Nome do animal é requerido")
	private String animalName;
	private String medicine;
	@NotBlank(message = "Categoria é requerido")
	private String animalCategory;
	@NotBlank(message = "A data da chegada é obrigatoria")
	private String arrivalDate;
	@NotBlank(message = "O local onde o animal foi encontrado é requerida")
	private String local;
	@NotBlank(message = "A descrição do Animal é necessaria.")
	private String description;

	
	//=================== CONTRUTORES ========================
	
	public AnimalReportDTO() {
		
	}
	
	public AnimalReportDTO(String animalName, String medicine, String animalCategory, String arrivalDate , String local, String description) {
		this.animalName = animalName;
		this.medicine = medicine;
		this.animalCategory= animalCategory;
		this.arrivalDate = arrivalDate;
		this.local = local;
		this.description = description;
	}
	
	
	public String getMedicine() {
		return medicine;
	}

	public void setMedicine(String medicine) {
		this.medicine = medicine;
	}

	public String getAnimalCategory() {
		return animalCategory;
	}

	public void setAnimalCategory(String animalCategory) {
		this.animalCategory = animalCategory;
	}

	public String getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getAnimalName() {
		return animalName;
	}

	public void setAnimalName(String animalName) {
		this.animalName = animalName;
	}

	public AnimalReport returnAnimalReport () {
		return new AnimalReport(animalName,medicine,animalCategory,arrivalDate,local,description);
	}
}