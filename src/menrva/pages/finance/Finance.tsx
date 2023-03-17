import React, { useEffect, useState } from 'react';
import { ViewDataProvider } from '@database/providers/ViewSearchProvider';
import HospitalCardItem from '@components/HospitalCardItem';
import {
  Annotation,
  Encounter,
  EncounterParticipant,
  MedicationRequest,
  Patient,
} from 'fhir-typescript-models';
import { findOneById } from '@database/hooks/mango-fhir-queries';
import {
  useNanoDatabase,
  useNanoUserReference,
} from '@database/hooks/nano-hooks';
import Notes from '@components/cards/Notes';
import Prescription from '@components/cards/Prescription';
import PatientsList from '@components/cards/HorizontalSearchList';
import { AnimatedButton } from '@components/elements/Button';
import History from '@components/cards/History';
import { createCodingFrom } from '@database/helper';
import nano from 'nano';

const Details = ({ patient }: { patient: Patient | undefined }) => {
  const PatientData = () => {
    if (patient !== undefined) {
      return (
        <>
          <div className="card-body ">
            <div className="card social-card w-100 no-padding no-margin">
              <HospitalCardItem patient={patient} />
            </div>
          </div>
          <div className="card-body">
            <span className="card-title no-margin no-padding p-b-5">
              Vital Signs
            </span>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="form-group form-group-default disabled">
                  <label>
                    Temp... (
                    <span className="btn btn-link no-top-padding no-bottom-padding fs-13 bold">
                      Celsius
                    </span>
                    )
                  </label>
                  <input
                    type="text"
                    value="48"
                    className="form-control"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className="card-body">
        <p className="rounded p-3">
          No patient is selected. Click on an option on the left list to view
          patient.
        </p>
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-md-12">
        {/* Patients Card Start */}
        <div className="card social-card w-100 share" data-social="item">
          <div className="card-header clearfix">
            <div className="card-title bold">Patient</div>
          </div>
          <div className="card-description">
            <p>Patient information and vitals.</p>
          </div>
          <PatientData />
        </div>
        {/* Patients Card End */}

        {/* History Card Start */}
        <History patient={patient} />
        {/* History Card End */}
      </div>
    </div>
  );
};

const Finance = () => {
  const userReference = useNanoUserReference();
  const dPatients = useNanoDatabase<Patient>('patients');
  const dEncounters = useNanoDatabase<Encounter>('encounters');

  const [encounter, setEncounter] = useState<Encounter>();
  const [patient, setPatient] = useState<Patient>();

  const [notes, setNotes] = useState<Annotation[]>([]);
  const [prescriptions, setPrescriptions] = useState<MedicationRequest[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (encounter?.subject?.reference !== undefined) {
        const rPatients = await dPatients.query(
          findOneById(encounter.subject.reference)
        );
        setPatient(rPatients[0]);
        setNotes([]);
        setPrescriptions([]);
      }
    };
    fetchPatient();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounter]);

  const handleComplete = () => {
    if (encounter === undefined) return;
    // encounter.subject = createObjectReference<Patient>(patient);
    // encounter.type = [
    //   createCodingFrom(
    //     'http://terminology.hl7.org/CodeSystem/v3-ActCode',
    //     'AMB',
    //     'ambulatory'
    //   ),
    // ];
    // encounter.period = createPeriodFrom('');

    // Encounter participant
    const participant = new EncounterParticipant();
    participant.type = [createCodingFrom('', '', '')];
    participant.individual = userReference;
    encounter.participant = [participant];

    dEncounters.update(encounter.toJSON(), (response: nano.OkResponse) => {
      console.log(response);
    });
  };

  const handleRefer = () => {};

  const handleDetain = () => {};

  const handleReport = () => {};

  return (
    <div className="page-content-wrapper">
      <div className="content sm-gutter">
        <div className="container-fluid padding-25 sm-padding-10">
          <div className="row">
            <div className="col-lg-3 col-xl-3 col-xlg-4">
              <ViewDataProvider
                dbName="encounters"
                viewDesign="pending"
                viewName="ambulatory"
              >
                <PatientsList setEncounter={setEncounter} />
              </ViewDataProvider>
            </div>
            <div className="col-lg-5 col-xl-5 col-xlg-4">
              <Details patient={patient} />
            </div>
            <div className="col-lg-4 col-xl-4 col-xlg-4">
              <div className="row">
                <div className="col-md-12">
                  <Notes setNotes={setNotes} />
                  <Prescription
                    encounter={encounter}
                    setPrescriptions={setPrescriptions}
                  />

                  <div className="card card-transparent social-card text-center w-100 align-items-center">
                    <div className="card-description w-75 ">
                      <p className="m-t-5 bg-light rounded p-3">
                        Some warning to show before user submiits form. Probably
                        gonna be some lengthy, like real long, no pun intended.
                        <br />
                        <AnimatedButton
                          className="mt-3 btn-danger"
                          type="button"
                          onClick={handleReport}
                        >
                          <span>Report</span>
                          <span className="hidden-block">
                            <i className="pg-icon">close</i>
                          </span>
                        </AnimatedButton>
                      </p>
                    </div>
                    <div className="w-100 mb-4 mt-3">
                      <AnimatedButton
                        className="mt-1 btn-success"
                        type="button"
                        onClick={handleComplete}
                      >
                        <>
                          <span>Complete</span>
                          <span className="hidden-block">
                            <i className="pg-icon">save</i>
                          </span>
                        </>
                      </AnimatedButton>

                      <AnimatedButton
                        className="mt-1"
                        type="button"
                        onClick={handleRefer}
                      >
                        <>
                          <span>Refer</span>
                          <span className="hidden-block">
                            <i className="pg-icon">close</i>
                          </span>
                        </>
                      </AnimatedButton>

                      <AnimatedButton
                        className="mt-1 btn-danger"
                        type="button"
                        onClick={handleDetain}
                      >
                        <>
                          <span>Detain</span>
                          <span className="hidden-block">
                            <i className="pg-icon">close</i>
                          </span>
                        </>
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
