export const Config = {
  movement: {
    walkSpeed: 8,
    sprintMultiplier: 1.6,
    jumpVelocity: 10,
    gravity: -30,
    groundHeight: 0.5,
  },
  mouse: {
    sensitivity: 0.002,
    invertY: false,
  },
  fullscreen: {
    enabled: false,
  },
} as const;