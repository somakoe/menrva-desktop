import { DocumentScope } from 'nano';
import { Practitioner, Reference } from 'fhir-typescript-models';
import { findByUse, load } from '@database/hooks/mango-fhir-queries';
import Repository from './Repository';

class UserRepository extends Repository<Practitioner> {
  auth;

  session;

  relax;

  constructor(nano: DocumentScope<Practitioner>) {
    super(nano);
    this.auth = nano.auth;
    this.relax = nano.server.relax;
    this.session = nano.session;
  }

  async logOut() {
    const response = await this.relax({
      method: 'DELETE',
      db: '_session',
    });
    return response;
  }

  async logIn(name: string, password: string) {
    const response = await this.auth(name, password);
    return response;
  }

  async isLoggedIn(): Promise<Practitioner | null> {
    try {
      const session = await this.session();
      if (session.userCtx.name === null) return null;

      const user = await this.query(load);
      return user[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getSession() {
    return this.auth;
  }
}

export default UserRepository;
