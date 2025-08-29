package ch.smf.smf_training_tracker_svc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "settings", schema = "stt")
public class Settings {
  @Id
  @Column(nullable = false, updatable = false, unique = true)
  private UUID id;

  @Column(nullable = false)
  private Integer periodStartDay;

  @Column(nullable = false)
  private Integer periodStartMonth;

  @Column(nullable = false)
  private Integer periodEndDay;

  @Column(nullable = false)
  private Integer periodEndMonth;
}
