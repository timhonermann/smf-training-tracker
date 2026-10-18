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
import java.util.List;
import java.util.UUID;

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

  @BeforeEach
  void seedCurrentYear() {
    final Person reached = savePerson("Rita", "Reached");
    final Person almostReached = savePerson("Anna", "AlmostReached");
    final Person notReached = savePerson("Nico", "NotReached");
    final TrainingLocation location = trainingLocationRepository.save(
      TrainingLocation.builder().id(UUID.randomUUID()).name("Training Ground").build());

    // 26 Trainings between January and early July, so neither year boundary is involved.
    final List<Training> trainings = new ArrayList<>();
    for (int week = 0; week < 26; week++) {
      final Training training = Training.builder()
        .id(UUID.randomUUID())
        .scheduledAt(LocalDate.of(CURRENT_YEAR, 1, 5).plusWeeks(week))
        .location(location)
        .build();
      training.getPeople().add(reached);
      if (week < 22) {
        training.getPeople().add(almostReached);
      }
      if (week < 5) {
        training.getPeople().add(notReached);
      }
      trainings.add(training);
    }
    trainingRepository.saveAll(trainings);
  }

  @Test
  void summaryReportsPeopleWhoReachedTheTrainingRequirementUsingTheReachedFields() throws Exception {
    mockMvc.perform(get("/api/v1/metrics/summary"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.currentYear.year").value(CURRENT_YEAR))
      .andExpect(jsonPath("$.currentYear.totalPeopleTrainingRequirementReached").value(1))
      .andExpect(jsonPath("$.currentYear.totalPeopleTrainingRequirementAlmostReached").isNumber())
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
      .andExpect(jsonPath("$.length()").value(3))
      .andExpect(jsonPath("$[?(@.lastName == 'Reached')].trainingRequirementStatus").value("REACHED"))
      .andExpect(jsonPath("$[?(@.lastName == 'Reached')].totalTrainings").value(26))
      .andExpect(jsonPath("$[?(@.lastName == 'AlmostReached')].trainingRequirementStatus").value("ALMOST_REACHED"))
      .andExpect(jsonPath("$[?(@.lastName == 'AlmostReached')].totalTrainings").value(22))
      .andExpect(jsonPath("$[?(@.lastName == 'NotReached')].trainingRequirementStatus").value("NOT_REACHED"))
      .andExpect(jsonPath("$[?(@.lastName == 'NotReached')].totalTrainings").value(5));
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
