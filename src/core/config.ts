export const Config = {
  movement: {
    walkSpeed: 8,
    sprintMultiplier: 1.6,
    jumpVelocity: 10,
    gravity: -30,
    groundHeight: 1.6,
  },
  mouse: {
    sensitivity: 0.002,
    invertY: false,
  },
  fullscreen: {
    enabled: false,
  },
} as const;