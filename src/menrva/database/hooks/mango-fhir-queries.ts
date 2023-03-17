import { DomainResource, Reference } from 'fhir-typescript-models';
import { MangoQuery } from 'nano';

export const load: MangoQuery = {
  selector: {},
  limit: 25,
};

export const search = (text: string): MangoQuery => {
  return {
    selector: {
      $or: [
        { name: { $regex: `.*${text}.*` } },
        {
          visits: {
            folderNo: { $regex: `.*${text}.*` },
          },
        },
      ],
    },
    limit: 25,
  };
};

export const findManyById = (text: string): MangoQuery => {
  return {
    selector: {
      id: { $regex: `.*${text}.*` },
    },
    limit: 25,
  };
};

export const findOneById = (text: string): MangoQuery => {
  return {
    selector: {
      id: { $regex: `.*${text}.*` },
    },
    limit: 25,
  };
};

export const findManyByName = (text: string): MangoQuery => {
  return {
    selector: {
      $or: [{ name: { $regex: `.*${text}.*` } }],
    },
    limit: 25,
  };
};

export const findOneByName = (text: string): MangoQuery => {
  return {
    selector: {
      $or: [{ name: { $regex: `.*${text}.*` } }],
    },
    limit: 1,
  };
};

export const findByUse = <T>(objects: T[], use: string): T => {
  return objects[0];
};

export const findLatestDate = <T>(objects: T[]): T => {
  return objects[0];
};

export const createObjectReference = <T>(object: T | undefined): Reference => {
  const reference = new Reference();
  if (object === undefined) return reference;
  if (object.id !== undefined) reference.id = object.id;
  if (object.name !== undefined) {
    const humanName = findByUse<T>(object.name, 'official');
    reference.display = humanName.text;
  }
  return reference;
};
