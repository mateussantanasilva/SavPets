package com.fatec.scc.services.occupation;

import java.util.List; 
import java.util.Optional; 
import com.fatec.scc.model.occupation.Occupation; 

  

//Funciona como CRUD 

  

public interface MaintainOccupation { 

List<Occupation> searchAll(); 

Optional<Occupation> searchByName(String name); 

Optional<Occupation> searchById(Long id); 

Optional<Occupation> searchByDescription(String description); 

Optional<Occupation> save(Occupation occupation); 

void delete(Long id); 
  
Optional<Occupation> updates(Long id, Occupation occupation); 

  

  

} 