import { Expose } from 'class-transformer';

export class MapResponse {
  @Expose({ name: 'position_x' })
  x: number;

  @Expose({ name: 'position_y' })
  y: number;
}
