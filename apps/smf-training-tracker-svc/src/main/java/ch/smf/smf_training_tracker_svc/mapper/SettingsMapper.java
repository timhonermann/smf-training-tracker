package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.SettingsDto;
import ch.smf.smf_training_tracker_svc.entity.Settings;
import org.springframework.stereotype.Component;

@Component
public class SettingsMapper {

  public SettingsDto settingsToDto(Settings settings) {
    return SettingsDto.builder()
      .periodStartDay(settings.getPeriodStartDay())
      .periodStartMonth(settings.getPeriodStartMonth())
      .periodEndDay(settings.getPeriodEndDay())
      .periodEndMonth(settings.getPeriodEndMonth())
      .build();
  }

  public Settings dtoToSettings(SettingsDto settingsDto) {
    return Settings.builder()
      .periodStartDay(settingsDto.periodStartDay())
      .periodStartMonth(settingsDto.periodStartMonth())
      .periodEndDay(settingsDto.periodEndDay())
      .periodEndMonth(settingsDto.periodEndMonth())
      .build();
  }

}
