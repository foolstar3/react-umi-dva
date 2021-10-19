export const rolePattern = {
  admin: 0,
  manager: 1,
  tester: 5,
  guest: 9,
};

export const permissionPattern = {
  env: {
    create: 'manager',
    delete: 'manager',
    update: 'manager',
  },
  globalVar: {
    create: 'tester',
    delete: 'tester',
    update: 'tester',
  },
  project: {
    create: 'admin',
    delete: 'admin',
    update: 'manager',
  },
  debugTalk: {
    update: 'tester',
  },
  module: {
    create: 'manager',
    delete: 'manager',
    update: 'manager',
  },
  case: {
    create: 'tester',
    delete: 'tester',
    update: 'tester',
  },
  task: {
    create: 'manager',
    delete: 'manager',
    update: 'manager',
  },
  report: {
    delete: 'manager',
  },
};
