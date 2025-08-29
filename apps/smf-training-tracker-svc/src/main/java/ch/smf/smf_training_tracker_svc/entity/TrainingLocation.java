package ch.smf.smf_training_tracker_svc.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "training_location", schema = "stt")
public class TrainingLocation {
  @Id
  @Column(nullable = false, updatable = false, unique = true)
  private UUID id;

  @Column(nullable = false)
  private String name;

  @OneToMany(mappedBy = "location")
  private List<Training> trainings;
}
