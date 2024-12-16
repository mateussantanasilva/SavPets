package com.fatec.scc.model.departament;

import javax.validation.constraints.NotBlank;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Departament {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank(message = "Nome do departamento é obrigatório")
	private String name;

	@NotBlank(message = "Sigla do departamento é obrigatória")
	private String initials;

	public Departament(String name, String initials) {
		this.name = name;
        this.initials = initials;
	}

	public Departament() {
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

	public String getInitials() {
		return initials;
	}

	public void setInitials(String initials) {
		this.initials = initials;
	}
}
