CREATE SCHEMA IF NOT EXISTS stt;

CREATE TABLE IF NOT EXISTS stt.person
(
  id         UUID PRIMARY KEY NOT NULL,
  first_name VARCHAR(255)     NOT NULL,
  last_name  VARCHAR(255)     NOT NULL,
  role       VARCHAR(50)      NOT NULL
);

CREATE TABLE IF NOT EXISTS stt.settings
(
  id                 UUID PRIMARY KEY NOT NULL,
  period_start_day   INT              NOT NULL DEFAULT 1,
  period_start_month INT              NOT NULL DEFAULT 10,
  period_end_day     INT              NOT NULL DEFAULT 30,
  period_end_month   INT              NOT NULL DEFAULT 9
);

CREATE TABLE IF NOT EXISTS stt.training_location
(
  id   UUID PRIMARY KEY NOT NULL,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS stt.training
(
  id           UUID PRIMARY KEY NOT NULL,
  scheduled_at DATE             NOT NULL,
  location_id  UUID             NOT NULL,
  CONSTRAINT training_location FOREIGN KEY (location_id) REFERENCES stt.training_location (id)
);

CREATE TABLE IF NOT EXISTS stt.person_training
(
  person_id   UUID NOT NULL,
  training_id UUID NOT NULL,
  PRIMARY KEY (person_id, training_id),
  CONSTRAINT person_training_person FOREIGN KEY (person_id) REFERENCES stt.person (id) ON DELETE CASCADE,
  CONSTRAINT person_training_training FOREIGN KEY (training_id) REFERENCES stt.training (id) ON DELETE CASCADE
);
