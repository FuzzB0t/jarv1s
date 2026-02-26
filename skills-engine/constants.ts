export const JARV1S_DIR = '.jarv1s';
export const STATE_FILE = 'state.yaml';
export const BASE_DIR = '.jarv1s/base';
export const BACKUP_DIR = '.jarv1s/backup';
export const LOCK_FILE = '.jarv1s/lock';
export const CUSTOM_DIR = '.jarv1s/custom';
export const SKILLS_SCHEMA_VERSION = '0.1.0';

// Top-level paths to include in base snapshot and upstream extraction.
// Add new entries here when new root-level directories/files need tracking.
export const BASE_INCLUDES = [
  'src/',
  'package.json',
  '.env.example',
  'container/',
];
