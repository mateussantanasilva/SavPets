package com.fatec.scc.services;

import com.fatec.scc.model.adoption.Adoption;
import com.fatec.scc.model.adoption.MaintainAdoptionRepository;
import com.fatec.scc.model.animalCategory.AnimalCategory;
import com.fatec.scc.model.animalCategory.MaintainAnimalCategoryRepository;
import com.fatec.scc.model.animalReport.AnimalReport;
import com.fatec.scc.model.animalReport.MaintainAnimalReportRepository;
import com.fatec.scc.model.client.Client;
import com.fatec.scc.model.client.MaintainClientRepository;
import com.fatec.scc.model.departament.Departament;
import com.fatec.scc.model.departament.MaintainDepartamentRepository;
import com.fatec.scc.model.employee.Employee;
import com.fatec.scc.model.employee.MaintainEmployeeRepository;
import com.fatec.scc.model.medicine.MaintainMedicineRepository;
import com.fatec.scc.model.medicine.Medicine;
import com.fatec.scc.model.occupation.MaintainOccupationRepository;
import com.fatec.scc.model.occupation.Occupation;
import com.fatec.scc.model.provider.Provider;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.fatec.scc.model.provider.MaintainProviderRepository;

@Configuration
class LoadDatabase {
//	@SuppressWarnings("unused")
	static final String defaultDate = "2023-05-15";
	
	@Bean
	CommandLineRunner initDatabase(MaintainEmployeeRepository maintainEmployeeRepository, MaintainOccupationRepository maintainOccupationRepository,
								   MaintainClientRepository maintainClientRepository, MaintainProviderRepository maintainProviderRepository, MaintainMedicineRepository maintainMedicineRepository, MaintainDepartamentRepository maintainDepartamentRepository,
								   MaintainAnimalCategoryRepository maintainAnimalCategoryRepository, MaintainAnimalReportRepository maintainAnimalReportRepository, MaintainAdoptionRepository maintainAdoptionRepository) {

		return args -> {
			// Clientes
			maintainClientRepository.deleteAll();
			Client client = new Client("Marina", "Santos", "549.065.789-10", "(11)98765-4321", "03807-420", "Rua dos Bobos", 0, "Casa");
			maintainClientRepository.save(client);
			Client client2 = new Client("Jairo", "Oliveira", "222.065.755-99", "(21)97542-9898", "03707-510", "Rua do Amanhã", 234, "Apartamento, n12");
			maintainClientRepository.save(client2);
			Client client3 = new Client("Matheus", "Carvalho", "232.045.757-09", "(11)97542-6102", "03914-760", "Rua dos Bois", 1074, "Casa");
			maintainClientRepository.save(client3);
			Client client4 = new Client("Mário", "Barbosa", "121.466.952-37", "(11)95629-8919", "23747-561", "Avenida Paulista", 2234, "Apartamento, n115");
			maintainClientRepository.save(client4);
			Client client5 = new Client("Victória", "Martins", "958.192.502-15", "(54)90081-9021", "57282-758", "Rua Sete", 12, "Casa 2");
			maintainClientRepository.save(client5);

			// Fornecedores
			maintainProviderRepository.deleteAll();
			Provider provider = new Provider("ABC Médica", "12.583.012/0001-16", "03807-420", "Rua Jacaré", 190, "");
			maintainProviderRepository.save(provider);
			provider = new Provider("Santana Fármacos", "25.245.678/9101-11", "43877-421", "Rua Alce", 1, "Sala 3");
			maintainProviderRepository.save(provider);
			provider = new Provider("Grupo Souza", "47.155.398/0101-67", "43617-761", "Avenida Brasil", 1912, "Portão 8");
			maintainProviderRepository.save(provider);
			
			// Medicamentos
			maintainMedicineRepository.deleteAll();
			Medicine medicine = new Medicine("ABC Médica", "Simparic", "Bula exemplo", "Remédio para pulgas", defaultDate, "Confira o peso do animal", defaultDate, 14, defaultDate);
			maintainMedicineRepository.save(medicine);
			medicine = new Medicine("Grupo Souza", "Glicopan", "Bula exemplo", "Suplemento vitamínico", defaultDate, "Consulte a dose ideal", defaultDate, 67, defaultDate);
			maintainMedicineRepository.save(medicine);
			medicine = new Medicine("Grupo Souza", "Prediderm", "Bula exemplo", "Anti-inflamatório", defaultDate, "Sem contra-indicações", defaultDate, 7, defaultDate);
			maintainMedicineRepository.save(medicine);
			medicine = new Medicine("Santana fármacos", "Vacina para raiva", "Bula exemplo", "Vacina para raiva", defaultDate, "Consulte carteira de vacinas", defaultDate, 102, defaultDate);
			maintainMedicineRepository.save(medicine);

			// Categoria de animais
			maintainAnimalCategoryRepository.deleteAll();
			AnimalCategory category = new AnimalCategory("Cachorro", "Pitbull", "Macho", "Grande", "Preto", "Cachorro - Pitbull - Macho - Grande - Preto");
			maintainAnimalCategoryRepository.save(category);
			AnimalCategory category2 = new AnimalCategory("Cachorro", "Vira-lata", "Macho", "Grande", "Marrom", "Cachorro - Vira-lata - Macho - Grande - Marrom");
			maintainAnimalCategoryRepository.save(category2);
			AnimalCategory category3 = new AnimalCategory("Gato", "Persa", "Fêmea", "Pequeno", "Branco", "Gato - Persa - Fêmea - Pequeno - Branco");
			maintainAnimalCategoryRepository.save(category3);
			AnimalCategory category4 = new AnimalCategory("Cachorro", "Pastor Alemão", "Fêmea", "Pequeno", "Branco", "Cachorro - Pastor Alemão - Fêmea - Pequeno - Branco");
			maintainAnimalCategoryRepository.save(category4);
			AnimalCategory category5 = new AnimalCategory("Gato", "Siamês", "Macho", "Pequeno", "Branco", "Gato - Siamês - Macho - Pequeno - Branco");
			maintainAnimalCategoryRepository.save(category5);

			// Relatório de animais
			maintainAnimalReportRepository.deleteAll();
			AnimalReport report = new AnimalReport("Teteu", "Não medicado", "Cachorro - Pitbull - Macho - Grande - Preto", "2022-08-25", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report);
			AnimalReport report2 = new AnimalReport("Magnos", "Glicopan", "Cachorro - Vira-lata - Macho - Grande - Marrom", "2022-12-18", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report2);
			AnimalReport report3 = new AnimalReport("Cacau", "Prediderm", "Gato - Persa - Fêmea - Pequeno - Branco", "2022-12-23", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report3);
			AnimalReport report1 = new AnimalReport("Zeus", "Vacina de raiva", "Cachorro - Vira-lata - Macho - Grande - Marrom", "2022-11-04", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report1);
			AnimalReport report5 = new AnimalReport("Chloe", "Glicopan", "Gato - Persa - Fêmea - Pequeno - Branco", "2023-02-11", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report5);
			AnimalReport report4 = new AnimalReport("Luna", "Simparic", "Gato - Persa - Fêmea - Pequeno - Branco", "2023-01-23", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report4);
			AnimalReport report6 = new AnimalReport("Babidi", "Não medicado", "Gato - Siamês - Macho - Pequeno - Branco", "2023-03-28", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report6);
			AnimalReport report7 = new AnimalReport("Lucy", "Não medicado", "Cachorro - Pastor Alemão - Fêmea - Pequeno - Branco", "2023-04-01", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report7);
			AnimalReport report8 = new AnimalReport("Max", "Não medicado", "Cachorro - Vira-lata - Macho - Grande - Marrom", "2023-07-12", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report8);
			AnimalReport report9 = new AnimalReport("Bella", "Prediderm", "Cachorro - Pastor Alemão - Fêmea - Pequeno - Branco", "2023-04-13", "Local exemplo", " Descrição exemplo");
			maintainAnimalReportRepository.save(report9);
			AnimalReport report10 = new AnimalReport("Duke", "Não medicado", "Cachorro - Vira-lata - Macho - Grande - Marrom", "2023-04-24", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report10);
			AnimalReport report11 = new AnimalReport("Bailey", "Simparic", "Cachorro - Pastor Alemão - Fêmea - Pequeno - Branco", "2023-02-03", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report11);
			AnimalReport report12 = new AnimalReport("Mel", "Glicopan", "Cachorro - Pastor Alemão - Fêmea - Pequeno - Branco", "2023-05-09", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report12);
			AnimalReport report13 = new AnimalReport("Nina", "Não medicado", "Gato - Siamês - Macho - Pequeno - Branco", "2023-01-23", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report13);
			AnimalReport report14 = new AnimalReport("Vitinho", "Não medicado", "Cachorro - Pitbull - Macho - Grande - Preto", "2023-05-28", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report14);
			AnimalReport report15 = new AnimalReport("Rex", "Simparic", "Cachorro - Vira-lata - Macho - Grande - Marrom", "2023-06-03", "Local exemplo", "Descrição exemplo");
			maintainAnimalReportRepository.save(report15);

			// Adoção
			maintainAdoptionRepository.deleteAll();
			Adoption adoption = new Adoption("André", "Marina", 1L, "Teteu", "2023-05-25", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption);
			Adoption adoption2 = new Adoption("Mateus", "Matheus", 2L, "Zeus", "2023-02-03", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption2);
			Adoption adoption3 = new Adoption("André", "Jairo", 3L, "Magnos", "2023-06-04", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption3);
			Adoption adoption4 = new Adoption("ADMIN", "Mário", 4L, "Cacau", "2023-07-10", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption4);
			Adoption adoption5 = new Adoption("André", "Jairo", 5L, "Luna", "2023-07-21", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption5);
			Adoption adoption6 = new Adoption("André", "Marina", 6L, "Chloe", "2023-04-05", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption6);
			Adoption adoption7 = new Adoption("ADMIN", "Victória", 7L, "Simba", "2023-04-18", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption7);
			Adoption adoption8 = new Adoption("André", "Victória", 8L, "Lucy", "2023-04-19", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption8);
			Adoption adoption9 = new Adoption("Mateus", "Jairo", 9L, "Max", "2023-02-18", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption9);
			Adoption adoption10 = new Adoption("ADMIN", "Mateus", 10L, "Bella", "2023-03-24", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption10);
			Adoption adoption11 = new Adoption("André", "Marina", 11L, "Duke", "2023-12-03", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption11);
			Adoption adoption12 = new Adoption("André", "Matheus", 12L, "Bailey", "2023-01-31", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption12);
			Adoption adoption13 = new Adoption("André", "Mário", 13L, "Mel", "2023-09-31", "Descrição exemplo");
			maintainAdoptionRepository.save(adoption13);

			// Cargo
			maintainOccupationRepository.deleteAll();
			Occupation occupation = new Occupation("Administrador", "Administrador do sistema, acesso total");
			maintainOccupationRepository.save(occupation);
			occupation = new Occupation("Veterinário", "Veterinário associado ao SavPets");
			maintainOccupationRepository.save(occupation);
			occupation = new Occupation("Auxiliar", "Auxiliar geral associado ao SavPets");
			maintainOccupationRepository.save(occupation);
			occupation = new Occupation("Gerente", "Gerente do sistema SavPets");
			maintainOccupationRepository.save(occupation);
			occupation = new Occupation("Almoxarife", "Responsável pelo estoque do sistema SavPets");
			maintainOccupationRepository.save(occupation);

			// Departamento
			maintainDepartamentRepository.deleteAll();
			Departament departament = new Departament("Administração", "ADM");
			maintainDepartamentRepository.save(departament);
			departament = new Departament("Tecnologia da informação", "TI");
			maintainDepartamentRepository.save(departament);
			departament = new Departament("Limpeza", "LIM");
			maintainDepartamentRepository.save(departament);
			departament = new Departament("Veterinário", "VET");
			maintainDepartamentRepository.save(departament);

			// Funcionário
			maintainEmployeeRepository.deleteAll();
			Employee employee = new Employee("ADMIN", "ADMIN", "admin.admin@email.com", "123123aA!", "123123aA!", "10101010101", "11111111", "Rua do adm", 1, "Casa do adm", "123", "Administração", "Administrador");
			maintainEmployeeRepository.save(employee);
			employee = new Employee("Pedro", "Pessina", "pedro.pessina@gmail.com", "123123aA!", "123123aA!", "111.111.111-11", "03882-100", "Rua Sebastião da Silva Bueno", 1, "", "111", "Veterinário", "Veterinário");
			maintainEmployeeRepository.save(employee);
			employee = new Employee("Guilherme", "Gonçalves", "guilherme.goncalves@gmail.com", "123123aA!", "123123aA!", "222.222.222-22", "81925-109", "Rua Iguana", 144, "", "222", "Administração", "Almoxarife");
			maintainEmployeeRepository.save(employee);
			employee = new Employee("Mateus", "Santana", "mateus.santana@gmail.com", "123123aA!", "123123aA!", "333.333.333-33", "79491-583", "Avenida Lobo", 52, "", "333", "Limpeza", "Auxiliar");
			maintainEmployeeRepository.save(employee);
			employee = new Employee("André", "Luiz", "andre.luiz@gmail.com", "123123aA!", "123123aA!", "444.444.444-44", "54554-333", "Rua Garça", 24, "", "444", "Administração", "Gerente");
			maintainEmployeeRepository.save(employee);
			employee = new Employee("Gustavo", "Nascimento", "gustavo.nascimento@gmail.com", "123123aA!", "123123aA!", "555.555.555-55", "18435-651", "Avenida Aricanduva", 18112, "", "555", "Veterinário", "Veterinário");
			maintainEmployeeRepository.save(employee);
			employee = new Employee("Vicenzzo", "Toth", "vicenzzo.toth@gmail.com", "123123aA!", "123123aA!", "666.666.666-66", "75216-849", "Rua dos Bois", 14, "", "666", "Tecnologia da informação", "Almoxarife");
			maintainEmployeeRepository.save(employee);
			
			};
	}
}