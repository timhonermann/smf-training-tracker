package ch.smf.smf_training_tracker_svc.repository;

import ch.smf.smf_training_tracker_svc.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<Person, UUID> {
  int countByIdIn(List<UUID> ids);
}
