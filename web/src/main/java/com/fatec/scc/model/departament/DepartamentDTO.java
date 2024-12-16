package com.fatec.scc.model.departament;

import javax.validation.constraints.NotBlank;

public class DepartamentDTO {
    @NotBlank(message = "Nome do departamento é obrigatório")
	private String name;

	@NotBlank(message = "Sigla do departamento é obrigatória")
	private String initials;

    public DepartamentDTO(String name, String initials) {
		this.name = name;
        this.initials = initials;
	}

    public DepartamentDTO() {
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

	public Departament returnDepartament() {
		return new Departament(name, initials);
	}
}
