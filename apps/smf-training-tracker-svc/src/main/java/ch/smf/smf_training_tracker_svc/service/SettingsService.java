package ch.smf.smf_training_tracker_svc.service;

import ch.smf.smf_training_tracker_svc.entity.Settings;
import ch.smf.smf_training_tracker_svc.repository.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsService {

  private final SettingsRepository settingsRepository;

  public Settings getSettings() {
    return settingsRepository.findAll().getFirst();
  }

  public Settings update(Settings settings) {
    final var existingSettings = getSettings();

    existingSettings.setPeriodStartDay(settings.getPeriodStartDay());
    existingSettings.setPeriodStartMonth(settings.getPeriodStartMonth());
    existingSettings.setPeriodEndDay(settings.getPeriodEndDay());
    existingSettings.setPeriodEndMonth(settings.getPeriodEndMonth());

    return settingsRepository.save(existingSettings);
  }

}
