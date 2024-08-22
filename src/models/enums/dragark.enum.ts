export enum IslandType {
  ResourceIsland,
  DragonCemetery,
  MysticalIsland,
  EventIsland,
}

export enum IslandSubType {
  FloraIsland,
  LavaIsland,
  WaterIsland,
  None,
}

export enum IslandState {
  Idling,
  Warring,
}

export enum DragonElement {
  Fire,
  Water,
  Lightning,
  Dark,
}

export enum DragonState {
  Idling,
  Flying,
}

export enum AttackType {
  DerelictIslandAttack,
  UserIslandAttack,
}

export enum AttackResult {
  Unknown,
  Win,
  Lose,
}

export const JourneyStatus = {
  Started: 0,
  Finished: 1,
  Cancelled: 2,
};

export enum ActivityType {
  Scout,
  Journey,
  ActivateDragon,
  DeactivateDragon,
  JoinMap,
  RejoinMap,
  ClaimResources,
  ClaimDragon,
}

export enum DragonRarity {
  Common,
  Uncommon,
  Rare,
  Epic,
  Legendary,
}
