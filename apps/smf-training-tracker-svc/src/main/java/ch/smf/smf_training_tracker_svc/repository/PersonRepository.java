package ch.smf.smf_training_tracker_svc.repository;

import ch.smf.smf_training_tracker_svc.entity.Person;
import ch.smf.smf_training_tracker_svc.model.PersonMetricQueryResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<Person, UUID> {
  int countByIdIn(List<UUID> ids);

  @Query("""
    SELECT COUNT(p)
    FROM Person p
    WHERE (
    SELECT COUNT(t.id)
    FROM Person p2
    JOIN p2.trainings t
    WHERE p2 = p
        AND t.scheduledAt >= :startDate
        AND t.scheduledAt <=  :endDate
    ) >= :minAmount
    """)
  int countAllByTrainingsLimitMet(LocalDate startDate, LocalDate endDate, int minAmount);

  @Query("""
    SELECT p.id,
        p.firstName,
        p.lastName,
        p.role,
        COUNT(DISTINCT t) as total
    FROM Person p
    LEFT JOIN p.trainings t
        ON t.scheduledAt BETWEEN :startDate AND :endDate
    GROUP BY p.id, p.firstName, p.lastName, p.role
    """)
  List<PersonMetricQueryResult> findPeopleInclTrainingMetricWithinPeriod(final LocalDate startDate, final LocalDate endDate);
}
