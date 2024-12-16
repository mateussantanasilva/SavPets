package com.fatec.scc.model.adoption;

import javax.validation.constraints.NotBlank;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Adoption {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NotBlank(message = "O nome do animal é requerido")
	private String employee;
	private String client;
	@NotBlank(message = "Relatorio é requerido")
	private Long animalReport;
	private String animalName;
	@NotBlank(message = "A data da Adoção é obrigatoria")
	private String adoptionDate;
	@NotBlank(message = "O relatorio da Adoção é necessaria.")
	private String report;

	//========================Contrunctors=====================
	
	public Adoption() {
		
	}
	
	public Adoption(String employee,String client, Long animalReport,
			String adoptionDate,String report) {
		this.employee = employee;
		this.client= client;
		this.animalReport= animalReport;
		this.adoptionDate= adoptionDate;
		this.report= report;
	}
	
	public Adoption(String employee,String client, Long animalReport, String animalName,
			String adoptionDate,String report) {
		this.employee = employee;
		this.client= client;
		this.animalReport= animalReport;
		this.animalName = animalName;
		this.adoptionDate= adoptionDate;
		this.report= report;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	

	public String getAdoptionDate() {
		return adoptionDate;
	}

	public Long getAnimalReport() {
		return animalReport;
	}

	public String getAnimalName() {
		return animalName;
	}

	public void setAnimalName(String animalName) {
		this.animalName = animalName;
	}

	public void setAnimalReport(Long animalReport) {
		this.animalReport = animalReport;
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
}
