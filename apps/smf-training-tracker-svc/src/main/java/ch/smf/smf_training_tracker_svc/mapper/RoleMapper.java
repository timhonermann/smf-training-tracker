package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.RoleDto;
import ch.smf.smf_training_tracker_svc.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
  public RoleDto roleToDto(Role role) {
    return switch (role) {
      case RG_LEITER -> RoleDto.RG_LEITER;
      case SCHUTZDIENSTHELFER -> RoleDto.SCHUTZDIENSTHELFER;
      case MITGLIED -> RoleDto.MITGLIED;
    };
  }

  public Role dtoToRole(RoleDto roleDto) {
    return switch (roleDto) {
      case RG_LEITER -> Role.RG_LEITER;
      case SCHUTZDIENSTHELFER -> Role.SCHUTZDIENSTHELFER;
      case MITGLIED -> Role.MITGLIED;
    };
  }
}
