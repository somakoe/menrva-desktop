import { HumanName, Identifier, Patient } from 'fhir-typescript-models';
import React from 'react';

import { findByUse } from '@database/hooks/mango-fhir-queries';

interface Props {
  patient: Patient;
}

const HospitalCardItem = (props: Props) => {
  const { patient } = props;
  const { name, birthDate, maritalStatus, identifier } = patient;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const humanName = findByUse<HumanName>(name!, 'official');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hospitalIdentity = findByUse<Identifier>(identifier!, 'usual');

  return (
    <div
      className="card card-default share border-0 w-100 no-margin no-padding"
      data-social="item"
    >
      <div
        className="circle"
        data-toggle="tooltip"
        title=""
        data-container="body"
        data-original-title="Label"
      />
      <div className="card-header clearfix">
        <div className="user-pic">
          <img
            alt="profile"
            width="33"
            height="33"
            data-src-retina="./menrva/assets/img/profiles/6x.jpg"
            data-src="./menrva/assets/img/profiles/6.jpg"
            src="./menrva/assets/img/profiles/6x.jpg"
          />
        </div>
        <h5 className="text-uppercase">{`${humanName.family} ${humanName.given}`}</h5>
        <h6 className="d-flex align-items-center">{maritalStatus?.text}</h6>
      </div>
      <div className="card-description mb-4">
        <p className="d-flex align-items-center hint-text">
          Joined on {hospitalIdentity.period?.start}
        </p>
        <ul className="list-inline no-margin row">
          <li className="col-lg-6 col-xl-6 col-xlg-6 mt-3 no-padding">
            <p className="hint-text font-montserrat small no-margin ">
              Hospital Id
            </p>
            <div className="mt-1">
              <span className="label font-montserrat fs-13 align-items-center text-black">
                <i className="pg-icon m-r-5 fs-14">folder</i>
                <span>{hospitalIdentity.value}</span>
              </span>
            </div>
          </li>
          <li className="col-lg-6 col-xl-6 col-xlg-6 mt-3 no-padding">
            <p className="hint-text font-montserrat small no-margin">
              Date of Birth
            </p>
            <div className="mt-1">
              <p className="font-montserrat">{birthDate}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HospitalCardItem;
