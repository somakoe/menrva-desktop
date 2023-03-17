/* eslint-disable object-shorthand */
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '@database/providers/UserProvider';

import {
  ActivityContext,
  ActivityProvider,
} from '@database/providers/ActivityProvider';

import { DataTable, Table } from '@components/elements/Datatable';
import Infobar from '@components/sidebar/Infobar';
import { useNanoDatabase } from '@database/hooks/nano-hooks';
import {
  Address,
  Encounter,
  HumanName,
  Practitioner,
  PractitionerQualification,
} from 'fhir-typescript-models';
import { findByUse, findLatestDate } from '@database/hooks/mango-fhir-queries';

const PatientActivityList = () => {
  const changes = useContext(ActivityContext);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const filteredData = changes.filter((change) => !change._deleted);
    setDocs(filteredData);
  }, [changes]);

  return (
    <DataTable
      data={docs}
      columns={[
        { title: 'Patient', data: '_id' },

        { title: 'Detail', data: 'name' },
        { title: 'Time', data: 'name' },
      ]}
      columnDefs={[
        {
          targets: 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render(data, type, row, meta) {
            return `
            <a href="/" class="btn text-success">
              Patient: ${data}
            </a>
           `;
          },
        },
        {
          targets: 1,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render(data, type, row, meta) {
            // const { type } = data;
            return `<p>
           ${data}
            was prescribed
            <a href="/" class="btn btn-tag">
              200 mg Paracetamol
            </a>
          </p>`;
          },
        },
      ]}
    />
  );
};

const StaffActivityList = () => {
  const changes = useContext(ActivityContext);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const filteredData = changes.filter((change) => !change._deleted);
    setDocs(filteredData);
  }, [changes]);

  return (
    <Table
      data={docs}
      columns={[
        { title: 'Name', data: 'name' },
        { title: 'Detail', data: '_id' },
      ]}
      columnDefs={[
        {
          width: '40%',
          targets: 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render(data, type, row, meta) {
            return `
              <div class="card-header clearfix border-0 padding-10 table-profile">
                <div class="user-pic">
                  <img alt="user"
                    width="33"
                    height="33"
                    data-src-retina="./menrva/assets/img/users/4x.jpg"
                    data-src="./menrva/assets/img/users/4.jpg"
                    src="./menrva/assets/img/users/4x.jpg">
                </div>
                <h5 class="text-ellipsis">Muammar Siddiq</h5>
                <span class="d-flex align-items-center text-ellipsis light info">General Doctor</span>
              </div>
        `;
          },
        },
        {
          width: '60%',
          targets: 1,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render(data, type, row, meta) {
            return `<p class="text-ellipsis">
            Just changed his profile name.
          </p>`;
          },
        },
      ]}
    />
  );
};

const InfoLine = () => {
  const visits = useNanoDatabase<Encounter>('encounters');
  const [info, setInfo] = useState('Checking...');

  useEffect(() => {
    const all = async () => {
      const waitingCount = await visits.count('ambulatory-incomplete');
      const emergencyCount = await visits.count('emergency-incomplete');

      if (waitingCount > 0 && emergencyCount === 0) {
        setInfo(`You have ${waitingCount} patients waiting.`);
      }

      if (waitingCount === 0 && emergencyCount > 0) {
        setInfo(`You have ${emergencyCount} emergencies`);
      }

      if (waitingCount > 0 && emergencyCount > 0) {
        setInfo(
          `You have ${waitingCount} patients waiting and ${emergencyCount} emergencies`
        );
      }
    };
    all();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h5 className="text-black light no-margin">{info}</h5>;
};

const Home = () => {
  const { address, name, qualification } = useContext<Practitioner>(
    UserContext
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const humanName = findByUse<HumanName>(name!, 'official');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const qualifiedAt = findLatestDate<PractitionerQualification>(qualification!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const homeAddress = findByUse<Address>(address!, 'home');

  const renderUserCard = () => {
    return (
      <div className="col-lg-4 col-xl-4 col-xlg-2 ">
        <div className="row">
          <div className="col-md-12">
            <div
              className="card social-card w-100 share card-min-h-300px flex-column"
              data-social="item"
            >
              <div
                className="circle header-icon bg-white m-r-5 border-0"
                data-toggle="tooltip"
                title="Label"
                data-container="body"
              >
                <i className="pg-icon">edit</i>
              </div>
              <div className="card-header clearfix">
                <div className="user-pic">
                  <img
                    alt="user"
                    width="33"
                    height="33"
                    data-src-retina="./menrva/assets/img/users/4x.jpg"
                    data-src="./menrva/assets/img/users/4.jpg"
                    src="./menrva/assets/img/users/4x.jpg"
                  />
                </div>
                <h5>{humanName.text ?? 'N/A'}</h5>
                <span className="d-flex align-items-center light info">
                  {qualifiedAt.code?.text ?? 'N/A'}
                </span>
              </div>
              <div className="card-description flex-1">
                <div className="p-1">
                  <ul className="list-inline no-margin row">
                    <li className="col-lg-6 col-xl-6 col-xlg-6 ">
                      <p className="hint-text font-montserrat small no-margin ">
                        Address
                      </p>
                      <div className="mt-2">
                        <div className="no-margin text-black btn-link bg-transparent no-padding">
                          <p className="font-montserrat">
                            {homeAddress.district ?? 'N/A'}
                          </p>
                        </div>
                        <div className="no-margin text-black btn-link bg-transparent no-padding">
                          <p className="font-montserrat">
                            {homeAddress.city ?? 'N/A'}
                          </p>
                        </div>
                        <div className="no-margin text-black btn-link bg-transparent no-padding">
                          <p className="font-montserrat">
                            {homeAddress.country ?? 'N/A'}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="col-lg-6 col-xl-6 col-xlg-6 ">
                      <p className="hint-text font-montserrat small no-margin">
                        Areas Of Study
                      </p>
                      <div className="mt-2">
                        {qualification?.map((qualified, index) => (
                          <div
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            className="no-margin"
                          >
                            <a
                              href="/"
                              className="no-padding btn-link link-primary text-primary"
                            >
                              {qualified.code?.text ?? 'N/A'}
                            </a>
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-footer clearfix b-t">
                <div className="pull-right time">
                  <span>Last updated on 23rd June,2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-content-wrapper">
      <div className="content sm-gutter">
        <div className="container-fluid padding-25 sm-padding-10">
          <div
            className="card social-card card-transparent w-100 "
            data-social="item"
          >
            <h2 className="text-black font-montserrat bold no-margin">
              Welcome back{' '}
              <span aria-label="wave" role="img">
                👋🏽
              </span>
            </h2>
            <InfoLine />
          </div>
        </div>
        <Infobar />
        <div className="container-fluid padding-25 p-b-0 sm-padding-10">
          <div className="row">
            {renderUserCard()}
            <div className="col-lg-8 col-xl-8 col-xlg-6">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="card social-card w-100 share card-min-h-300px flex-column"
                    data-social="item"
                  >
                    <div
                      className="circle header-icon bg-white m-r-5 border-0"
                      data-toggle="tooltip"
                      title="Label"
                      data-container="body"
                    >
                      <i className="pg-icon">edit</i>
                    </div>
                    <div className="card-header">
                      <div className="card-title">
                        <span className="font-montserrat fs-11 all-caps bold">
                          Activities{' '}
                        </span>
                      </div>
                    </div>
                    <div className="card-body no-padding no-margin">
                      <ActivityProvider database="_users">
                        <StaffActivityList />
                      </ActivityProvider>
                    </div>
                    <div className="card-footer clearfix b-t">
                      <div className="pull-right time">
                        <span>Last updated on 23rd June,2020</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <div className="container-fluid sm-padding-10">
          <div className="card social-card w-100 share">
            <div className="card-header">
              <div className="inline">
                <span className="card-title bold">Patient Recent Activity</span>
                <span className="d-flex align-items-center light text-info">
                  Search for both detained and actie patients.
                </span>
              </div>
              <div className="pull-right">
                <div className="col-xs-12">
                  <input
                    type="text"
                    id="search-table"
                    className="form-control pull-right"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="clearfix" />
            </div>
            <div className="card-body no-padding no-margin p-b-20">
              <ActivityProvider database="records">
                <PatientActivityList />
              </ActivityProvider>
            </div>
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  );
};

export default Home;
