package ch.smf.smf_training_tracker_svc.model;

public enum TrainingRequirementStatus {
  REACHED,
  ALMOST_REACHED,
  NOT_REACHED;

  /** Trainings within a year from which a Person has Reached the Training Requirement. */
  public static final int REACHED_MIN_TRAININGS = 26;

  /** Trainings within a year from which a Person has Almost Reached the Training Requirement. */
  public static final int ALMOST_REACHED_MIN_TRAININGS = 20;

  public static TrainingRequirementStatus fromTrainingCount(final int trainingCount) {
    if (trainingCount >= REACHED_MIN_TRAININGS) {
      return REACHED;
    } else if (trainingCount >= ALMOST_REACHED_MIN_TRAININGS) {
      return ALMOST_REACHED;
    } else {
      return NOT_REACHED;
    }
  }
}
