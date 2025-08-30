package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.dto.PersonDto;
import ch.smf.smf_training_tracker_svc.mapper.PersonMapper;
import ch.smf.smf_training_tracker_svc.service.PersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/people")
public class PersonController {

  private final PersonService personService;

  private final PersonMapper personMapper;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PersonDto createPerson(@RequestBody PersonDto personDto) {
    final var person = personService.create(personMapper.dtoToPerson(personDto));

    return personMapper.personToDto(person);
  }

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<PersonDto> findAll() {
    return personService.findAll().stream()
      .map(personMapper::personToDto)
      .toList();
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable("id") UUID id) {
    personService.delete(id);
  }

}
