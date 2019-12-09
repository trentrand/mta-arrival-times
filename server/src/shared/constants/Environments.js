export function getEnvironments() {
  if (process.env.FIREBASE_CONFIG) {
    return ENVIRONMENTS.FIREBASE;
  }

  return ENVIRONMENTS.LOCAL;
}

const ENVIRONMENTS = {
  LOCAL: 'local',
  FIREBASE: 'firebase',
};

export default ENVIRONMENTS;
