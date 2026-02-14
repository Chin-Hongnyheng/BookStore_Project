import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users.entity';
import { RolePermission } from '../../entities/role-permission.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined in .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    // fetch user with roles
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['roles', 'roles.role'],
    });

    if (!user) {
      return null;
    }

    const roleIds = user.roles.map((ur) => ur.role.id);

    const rolePermissions = await this.rolePermissionRepository.find({
      where: roleIds.map((id) => ({ role: { id } })),
      relations: ['permission'],
    });

    const permissions = rolePermissions.map((rp) => rp.permission.key);

    return {
      id: user.id,
      roles: user.roles.map((ur) => ur.role.name),
      permissions,
    };
  }
}
