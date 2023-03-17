import nano, { DocumentScope } from 'nano';
import { DomainResource } from 'fhir-typescript-models';
import { ViewRow } from '@database/providers/ViewSearchProvider';

export default class Repository<T extends DomainResource> {
  db: DocumentScope<T>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(database: DocumentScope<T>) {
    this.db = database;
  }

  async query(query: nano.MangoQuery): Promise<T[]> {
    const response = await this.db.find(query);
    return response.docs;
  }

  async update(body, callback) {
    const response = await this.db.updateWithHandler('', '', body);
    callback(response);
  }

  async viewAll(design: string, view: string): Promise<ViewRow<T>[]> {
    const response = await this.db.view<T>(design, view, {
      include_docs: true,
      limit: 25,
    });
    return response.rows;
  }

  async viewSearch(
    design: string,
    view: string,
    key: string
  ): Promise<ViewRow<T>[]> {
    const response = await this.db.view<T>(design, view, {
      key,
      include_docs: true,
      limit: 25,
    });
    return response.rows;
  }

  async count(param: string): Promise<number> {
    const response = await this.db.view<number>('counts', param);
    if (response.rows.length === 0) return 0;
    return response.rows[0].value;
  }
}
