package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.PersonDto;
import ch.smf.smf_training_tracker_svc.entity.Person;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PersonMapper {

  private final RoleMapper roleMapper;

  public PersonDto personToDto(Person person) {
    return PersonDto.builder()
      .id(person.getId())
      .firstName(person.getFirstName())
      .lastName(person.getLastName())
      .role(roleMapper.roleToDto(person.getRole()))
      .build();
  }

  public Person dtoToPerson(PersonDto personDto) {
    return Person.builder()
      .id(personDto.id())
      .firstName(personDto.firstName())
      .lastName(personDto.lastName())
      .role(roleMapper.dtoToRole(personDto.role()))
      .build();
  }

  public Set<PersonDto> personToDto(Set<Person> persons) {
    return persons.stream()
      .map(this::personToDto)
      .collect(Collectors.toSet());
  }

  public Set<Person> dtoToPerson(Set<PersonDto> personDtos) {
    return personDtos.stream()
      .map(this::dtoToPerson)
      .collect(Collectors.toSet());
  }
}
