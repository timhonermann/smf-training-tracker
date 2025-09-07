package ch.smf.smf_training_tracker_svc.mapper;

import ch.smf.smf_training_tracker_svc.dto.RoleDto;
import ch.smf.smf_training_tracker_svc.entity.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
  public RoleDto roleToDto(Role role) {
    return switch (role) {
      case RG_LEAD -> RoleDto.RG_LEAD;
      case DECOY -> RoleDto.DECOY;
      case MEMBER -> RoleDto.MEMBER;
    };
  }

  public Role dtoToRole(RoleDto roleDto) {
    return switch (roleDto) {
      case RG_LEAD -> Role.RG_LEAD;
      case DECOY -> Role.DECOY;
      case MEMBER -> Role.MEMBER;
    };
  }
}
