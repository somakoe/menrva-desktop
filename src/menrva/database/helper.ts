import { Coding, Period } from 'fhir-typescript-models';

export function checkAccess(roles: string[], access: string[]) {
  return roles.some((role) => access.includes(role));
}

export function x(roles: string[], access: string[]) {
  return roles.some((role) => access.includes(role));
}

export function createCodingFrom(
  system: string,
  code: string,
  display: string
): Coding {
  // Coding for type
  const coding = new Coding();
  code.system = system;
  code.code = code;
  code.display = display;
  return coding;
}

export function createPeriodFrom(system: string): Coding {
  // create periods
  const period = new Period();
  return period;
}
