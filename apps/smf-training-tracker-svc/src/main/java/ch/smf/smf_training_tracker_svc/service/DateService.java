package ch.smf.smf_training_tracker_svc.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DateService {

  public int getCurrentYear() {
    return LocalDate.now().getYear();
  }

  public int getPreviousYear() {
    return LocalDate.now().getYear() - 1;
  }

}
