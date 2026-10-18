package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.entity.Person;
import ch.smf.smf_training_tracker_svc.entity.Role;
import ch.smf.smf_training_tracker_svc.entity.Training;
import ch.smf.smf_training_tracker_svc.entity.TrainingLocation;
import ch.smf.smf_training_tracker_svc.repository.PersonRepository;
import ch.smf.smf_training_tracker_svc.repository.TrainingLocationRepository;
import ch.smf.smf_training_tracker_svc.repository.TrainingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.hamcrest.Matchers.closeTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestPropertySource("classpath:application-test.properties")
class MetricControllerApiTest {

  private static final int CURRENT_YEAR = LocalDate.now().getYear();

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private PersonRepository personRepository;

  @Autowired
  private TrainingRepository trainingRepository;

  @Autowired
  private TrainingLocationRepository trainingLocationRepository;

  private TrainingLocation location;

  private final Map<Person, Integer> trainingsPerPerson = new LinkedHashMap<>();

  @BeforeEach
  void seedCurrentYear() {
    trainingsPerPerson.put(savePerson("Nico", "NotReached"), 19);
    trainingsPerPerson.put(savePerson("Alma", "AlmostReachedLow"), 20);
    trainingsPerPerson.put(savePerson("Anna", "AlmostReachedHigh"), 25);
    trainingsPerPerson.put(savePerson("Rita", "Reached"), 26);
    location = trainingLocationRepository.save(
      TrainingLocation.builder().id(UUID.randomUUID()).name("Training Ground").build());

    // 26 Trainings between January and early July, so neither year boundary is involved.
    // A Person with n Trainings attends the first n of them: 19 + 20 + 25 + 26 = 90 participations.
    final List<Training> trainings = new ArrayList<>();
    for (int week = 0; week < 26; week++) {
      final Training training = training(LocalDate.of(CURRENT_YEAR, 1, 5).plusWeeks(week));
      for (final Map.Entry<Person, Integer> entry : trainingsPerPerson.entrySet()) {
        if (week < entry.getValue()) {
          training.getPeople().add(entry.getKey());
        }
      }
      trainings.add(training);
    }
    trainingRepository.saveAll(trainings);
  }

  @Test
  void summaryCountsReachedAndAlmostReachedExclusively() throws Exception {
    mockMvc.perform(get("/api/v1/metrics/summary"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.currentYear.year").value(CURRENT_YEAR))
      .andExpect(jsonPath("$.currentYear.totalPeopleTrainingRequirementReached").value(1))
      .andExpect(jsonPath("$.currentYear.totalPeopleTrainingRequirementAlmostReached").value(2))
      .andExpect(jsonPath("$.currentYear.totalTrainings").value(26))
      .andExpect(jsonPath("$.currentYear.totalPeopleTrainingRequirementMet").doesNotExist())
      .andExpect(jsonPath("$.currentYear.totalPeopleTrainingRequirementAlmostAlmostMet").doesNotExist())
      .andExpect(jsonPath("$.previousYear.year").value(CURRENT_YEAR - 1))
      .andExpect(jsonPath("$.previousYear.totalPeopleTrainingRequirementReached").value(0))
      .andExpect(jsonPath("$.previousYear.totalPeopleTrainingRequirementAlmostReached").value(0));
  }

  @Test
  void trainingRequirementsReportTheReachedStatusOfEachPerson() throws Exception {
    mockMvc.perform(get("/api/v1/metrics/training-requirements").param("yearReference", "CURRENT"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.length()").value(4))
      .andExpect(jsonPath("$[?(@.lastName == 'NotReached')].totalTrainings").value(19))
      .andExpect(jsonPath("$[?(@.lastName == 'NotReached')].trainingRequirementStatus").value("NOT_REACHED"))
      .andExpect(jsonPath("$[?(@.lastName == 'AlmostReachedLow')].totalTrainings").value(20))
      .andExpect(jsonPath("$[?(@.lastName == 'AlmostReachedLow')].trainingRequirementStatus").value("ALMOST_REACHED"))
      .andExpect(jsonPath("$[?(@.lastName == 'AlmostReachedHigh')].totalTrainings").value(25))
      .andExpect(jsonPath("$[?(@.lastName == 'AlmostReachedHigh')].trainingRequirementStatus").value("ALMOST_REACHED"))
      .andExpect(jsonPath("$[?(@.lastName == 'Reached')].totalTrainings").value(26))
      .andExpect(jsonPath("$[?(@.lastName == 'Reached')].trainingRequirementStatus").value("REACHED"));
  }

  @Test
  void summaryIncludesATrainingOnDecemberThirtyFirstInAverageParticipantsAndTotalTrainings() throws Exception {
    final Training newYearsEve = training(LocalDate.of(CURRENT_YEAR, 12, 31));
    newYearsEve.getPeople().addAll(trainingsPerPerson.keySet());
    trainingRepository.save(newYearsEve);

    // 27 Trainings with 90 + 4 = 94 participations; without December 31 it would be 90 / 26 ≈ 3.4615.
    mockMvc.perform(get("/api/v1/metrics/summary"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.currentYear.totalTrainings").value(27))
      .andExpect(jsonPath("$.currentYear.averageParticipants").value(closeTo(3.4815, 0.0001)));
  }

  private Training training(final LocalDate scheduledAt) {
    return Training.builder()
      .id(UUID.randomUUID())
      .scheduledAt(scheduledAt)
      .location(location)
      .build();
  }

  private Person savePerson(final String firstName, final String lastName) {
    return personRepository.save(Person.builder()
      .id(UUID.randomUUID())
      .firstName(firstName)
      .lastName(lastName)
      .role(Role.MEMBER)
      .build());
  }
}
