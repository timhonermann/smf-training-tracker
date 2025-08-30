package ch.smf.smf_training_tracker_svc.service;

import ch.smf.smf_training_tracker_svc.entity.Person;
import ch.smf.smf_training_tracker_svc.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PersonService {

  private final PersonRepository personRepository;

  public Person create(final Person person) {
    person.setId(UUID.randomUUID());

    return personRepository.save(person);
  }

  public List<Person> findAll() {
    return personRepository.findAll();
  }

  public void delete(final UUID id) {
    personRepository.deleteById(id);
  }

}
