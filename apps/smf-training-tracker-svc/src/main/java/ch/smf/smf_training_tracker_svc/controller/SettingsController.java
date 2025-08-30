package ch.smf.smf_training_tracker_svc.controller;

import ch.smf.smf_training_tracker_svc.dto.SettingsDto;
import ch.smf.smf_training_tracker_svc.mapper.SettingsMapper;
import ch.smf.smf_training_tracker_svc.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/settings")
public class SettingsController {

  private final SettingsService settingsService;

  private final SettingsMapper settingsMapper;

  @GetMapping
  public SettingsDto get() {
    return settingsMapper.settingsToDto(settingsService.getSettings());
  }

  @PutMapping
  public SettingsDto update(@RequestBody SettingsDto settingsDto) {
    final var settings = settingsMapper.dtoToSettings(settingsDto);
    final var updateSettings = settingsService.update(settings);

    return settingsMapper.settingsToDto(updateSettings);
  }

}
