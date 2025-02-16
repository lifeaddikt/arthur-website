import * as migration_20241220_140646_initial from './20241220_140646_initial';

export const migrations = [
  {
    up: migration_20241220_140646_initial.up,
    down: migration_20241220_140646_initial.down,
    name: '20241220_140646_initial'
  },
];
