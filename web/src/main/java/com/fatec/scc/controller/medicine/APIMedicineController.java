package com.fatec.scc.controller.medicine;

import com.fatec.scc.model.medicine.Medicine;
import com.fatec.scc.model.medicine.MedicineDTO;
import com.fatec.scc.services.medicine.MaintainMedicineI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

// Classe que trata as requisicoes HTTP enviadas pelo usuario do serviço

@RestController
@RequestMapping("/api/v1/medicamentos")
public class APIMedicineController {
    @Autowired
    MaintainMedicineI maintainMedicineI;
    Medicine medicine;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Medicine>> FindAll() {
        return ResponseEntity.status(HttpStatus.OK).body(maintainMedicineI.searchAll());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Object> searchById(@PathVariable Long id) {
        Optional<Medicine> medicineFound = maintainMedicineI.searchById(id);

        medicineIsEmpty(medicineFound);

        if (medicineFound.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(medicineFound.get());
        }
        return medicineIsEmpty(medicineFound);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Object> saveMedicine(@RequestBody @Valid MedicineDTO medicineDTO, BindingResult result) {

        medicine = new Medicine();

        if (result.hasErrors())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");

        if (maintainMedicineI.searchByName(medicineDTO.getName()).isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Medicamento já cadastrado");

        try {
            medicine.setName(medicineDTO.getName());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(maintainMedicineI.save(medicineDTO.returnMedicine()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Object> updates(@PathVariable long id, @RequestBody @Valid MedicineDTO medicineDTO, BindingResult result) {
        if (result.hasErrors())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Dados inválidos.");

        Optional<Medicine> medicineUpdate = maintainMedicineI.searchById(id);
         medicineIsEmpty(medicineUpdate);

        if (medicineUpdate.isPresent()) {
            medicineUpdate = maintainMedicineI.updates(id, medicineDTO.returnMedicine());
            return ResponseEntity.status(HttpStatus.OK).body(medicineUpdate.get());
        }
        return medicineIsEmpty(medicineUpdate);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable(value = "id") Long id) {

        Optional<Medicine> medicineDelete = maintainMedicineI.searchById(id);

        if (medicineDelete.isPresent()) {
            maintainMedicineI.delete(medicineDelete.get().getId());

            return ResponseEntity.status(HttpStatus.OK).body("Medicamento excluido");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
    }

    public ResponseEntity<Object> medicineIsEmpty (Optional<Medicine> medicine) {
        if (medicine.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(medicine.get());
    }
}
