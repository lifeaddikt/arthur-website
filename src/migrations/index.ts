import * as migration_20250228_112701 from './20250228_112701';

export const migrations = [
  {
    up: migration_20250228_112701.up,
    down: migration_20250228_112701.down,
    name: '20250228_112701'
  },
];
