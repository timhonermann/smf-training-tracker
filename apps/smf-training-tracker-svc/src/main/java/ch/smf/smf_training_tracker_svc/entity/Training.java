package ch.smf.smf_training_tracker_svc.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "training", schema = "stt")
public class Training {
  @Id
  @Column(nullable = false, updatable = false, unique = true)
  private UUID id;

  @Column(nullable = false)
  private LocalDate scheduledAt;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  private TrainingLocation location;

  @ManyToMany
  @JoinTable(
    schema = "stt",
    name = "person_training",
    joinColumns = @JoinColumn(name = "training_id"),
    inverseJoinColumns = @JoinColumn(name = "person_id")
  )
  private Set<Person> people = new LinkedHashSet<>();
}
