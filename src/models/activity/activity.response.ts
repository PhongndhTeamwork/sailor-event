import { Expose } from 'class-transformer';

export class ActivityResponse {
  @Expose({ name: 'dragon_id' })
  dragonId: string;

  @Expose({ name: 'journey_id' })
  journeyId: string;

  @Expose({ name: 'owner' })
  owner: string;

  @Expose({ name: 'activity_type' })
  activityType: number;

  @Expose({ name: 'island_from' })
  islandFrom: string;

  @Expose({ name: 'island_to' })
  islandTo: string;

  @Expose({ name: 'start_time' })
  startTime: string;

  @Expose({ name: 'end_time' })
  endTime: string;

  @Expose({ name: 'status' })
  status: boolean;

  @Expose({ name: 'attack_type' })
  attackType: number;

  @Expose({ name: 'attack_result' })
  attackResult: number;

  @Expose({ name: 'position_x' })
  positionX: number;

  @Expose({ name: 'position_y' })
  positionY: number;

  @Expose({ name: 'food' })
  food: number;

  @Expose({ name: 'stone' })
  stone: number;

  @Expose({
    name: 'created_at',
  })
  createdAt: Date;

  @Expose({
    name: 'updated_at',
  })
  updatedAt: Date;
}
