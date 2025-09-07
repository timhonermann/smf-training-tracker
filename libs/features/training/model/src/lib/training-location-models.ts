export type TrainingLocationData = {
  id: string;
  name: string;
};

export type TrainingLocationCreationData = Omit<TrainingLocationData, 'id'>;
