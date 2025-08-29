package ch.smf.smf_training_tracker_svc.entity;

import jakarta.persistence.*;
import lombok.*;

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
@Table(name = "person", schema = "stt")
public class Person {
  @Id
  @Column(nullable = false, updatable = false, unique = true)
  private UUID id;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role;

  @ManyToMany
  @JoinTable(
    schema = "stt",
    name = "person_training",
    joinColumns = @JoinColumn(name = "person_id", foreignKey = @ForeignKey(name = "person_training_person")),
    inverseJoinColumns = @JoinColumn(name = "training_id", foreignKey = @ForeignKey(name = "person_training_training"))
  )
  @OrderBy("scheduledAt ASC")
  @ToString.Exclude
  @Builder.Default
  private Set<Training> trainings = new LinkedHashSet<>();
}
