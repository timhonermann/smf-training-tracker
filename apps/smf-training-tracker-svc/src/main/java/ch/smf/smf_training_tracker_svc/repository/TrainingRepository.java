package ch.smf.smf_training_tracker_svc.repository;

import ch.smf.smf_training_tracker_svc.entity.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TrainingRepository extends JpaRepository<Training, UUID> {
}
