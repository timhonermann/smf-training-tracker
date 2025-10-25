package ch.smf.smf_training_tracker_svc.repository;

import ch.smf.smf_training_tracker_svc.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.UUID;

@Repository
public interface TrainingRepository extends JpaRepository<Training, UUID> {
  @Query("""
    SELECT COUNT (t) FROM Training t
    WHERE t.scheduledAt >= :startDate AND t.scheduledAt <= :endDate
    """)
  int countAllWithin(LocalDate startDate, LocalDate endDate);
}
