import { IsNotEmpty } from 'class-validator';

export class CheckTaskModel {
  @IsNotEmpty()
  type: number;
}
