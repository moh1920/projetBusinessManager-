import {PermissionDto} from "./permissionDto.model";
import {Entreprise} from "./entreprise.model";

export interface ResponseDto {
  token: string;
  name: string;
  userId: number;
  permission: PermissionDto[];
  entreprise: Entreprise;
}
