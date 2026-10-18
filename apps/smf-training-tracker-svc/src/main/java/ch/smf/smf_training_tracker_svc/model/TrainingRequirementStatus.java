package ch.smf.smf_training_tracker_svc.model;

public enum TrainingRequirementStatus {
  REACHED,
  ALMOST_REACHED,
  NOT_REACHED;

  public static TrainingRequirementStatus fromTrainingCount(final int trainingCount) {
    if (trainingCount >= 26) {
      return REACHED;
    } else if (trainingCount >= 20) {
      return ALMOST_REACHED;
    } else {
      return NOT_REACHED;
    }
  }
}
