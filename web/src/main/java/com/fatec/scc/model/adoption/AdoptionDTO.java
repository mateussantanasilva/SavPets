package com.fatec.scc.model.adoption;

import javax.validation.constraints.NotBlank;

public class AdoptionDTO {
	private String employee;
	private String client;
	@NotBlank(message = "Relatorio Animal é requerido")
	private Long animalReport;
	@NotBlank(message = "A data da Adoção é obrigatoria")
	private String adoptionDate;
	@NotBlank(message = "O relatorio da Adoção é necessaria.")
	private String report;

	//========================Contrunctors=====================
	
	public AdoptionDTO() {
		
	}
	
	public AdoptionDTO(String employee,String client, Long animalReport,
			String adoptionDate,String report) {
		
		this.employee = employee;
		this.client= client;
		this.animalReport= animalReport;
		this.adoptionDate= adoptionDate;
		this.report= report;
	}


	public String getEmployee() {
		return employee;
	}

	public void setEmployee(String employee) {
		this.employee = employee;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public Long getAnimalCategory() {
		return animalReport;
	}

	public void setAnimalCategory(Long animalCategory) {
		this.animalReport = animalCategory;
	}

	public String getAdoptionDate() {
		return adoptionDate;
	}

	public void setAdoptionDate(String adoptionDate) {
		this.adoptionDate = adoptionDate;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}
	
	public Adoption retornoUmaAdocao() {
		return new Adoption(employee,client,animalReport,adoptionDate,report);
	}
}
