import { DomainResource, HumanName, Reference } from 'fhir-typescript-models';
import { NanoContext } from '@database/providers/NanoProvider';
import Repository from '@database/repositories/Repository';
import UserRepository from '@database/repositories/UserRepository';
import { ServerScope } from 'nano';

import { useContext } from 'react';
import { UserContext } from '@database/providers/UserProvider';
import { findByUse } from './mango-fhir-queries';

export function useNano() {
  const nano = useContext<ServerScope>(NanoContext);
  return nano;
}

export function useNanoUser() {
  const nano = useNano();
  return new UserRepository(nano.db.use('practitioners'));
}

export function useNanoUserReference(): Reference {
  const user = useContext(UserContext);
  const { id, name } = user;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const humanName = findByUse(name!, 'official');

  const reference = new Reference();
  reference.id = id;
  reference.display = humanName.text;
  return reference;
}

export function useNanoUserName(use: string): HumanName {
  const user = useContext(UserContext);
  const { name } = user;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const humanName = findByUse(name!, use);
  return humanName;
}

export function useNanoDatabase<T extends DomainResource>(name: string) {
  const nano = useNano();
  return new Repository<T>(nano.db.use(name));
}

export function useNanoDatabaseChanges(name: string) {
  const nano = useNano();
  return nano.db.use(name).changesReader;
}

export function useNanoSecurity() {
  const nano = useNano();
  return nano.security;
}
