package com.fatec.scc.model.adoptionCampaign;

import javax.validation.constraints.NotBlank;

public class AdoptionCampaignDTO {
	@NotBlank(message = "O nome da campanha é obrigatório")
	private String name;
	@NotBlank(message = "A descrição da campanha é obrigatória")
	private String description;
	@NotBlank(message = "A data da campanha é obrigatória")
	private String date;
	@NotBlank(message = "O horário de início da campanha é obrigatório")
	private String startTime;
	@NotBlank(message = "O horário de fim da campanha é obrigatório")
	private String endTime;
	@NotBlank(message = "O local da campanha é obrigatório")
	private String location;
	
	public AdoptionCampaignDTO() {	}


	public AdoptionCampaignDTO(String name, String description, String date, String startTime, String endTime, String location) {
		this.name = name;
		this.description = description;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.location = location;
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
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	public AdoptionCampaign returnAdoptionCampaign() {
		return new AdoptionCampaign(name, description, date, startTime, endTime, location);
	}
}
