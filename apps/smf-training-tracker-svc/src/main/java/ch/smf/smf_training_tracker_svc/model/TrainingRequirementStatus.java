package ch.smf.smf_training_tracker_svc.model;

public enum TrainingRequirementStatus {
  MET,
  ALMOST_MET,
  UNMET;

  public static TrainingRequirementStatus fromTrainingCount(final int trainingCount) {
    if (trainingCount >= 26) {
      return MET;
    } else if (trainingCount >= 20) {
      return ALMOST_MET;
    } else {
      return UNMET;
    }
  }
}
