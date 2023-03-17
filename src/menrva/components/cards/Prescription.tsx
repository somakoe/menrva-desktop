import {
  Encounter,
  Medication,
  MedicationRequest,
  Reference,
} from 'fhir-typescript-models';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useList } from 'react-use';
import Form from '@components/elements/Form';
import {
  useNanoDatabase,
  useNanoUserReference,
} from '@database/hooks/nano-hooks';
import { createObjectReference } from '@database/hooks/mango-fhir-queries';
import TypeAheadInput from '@components/elements/inputs/TypeAheadInput';
import MeasurableInput from '@components/elements/inputs/MeasurableInputs';

const Prescription = ({
  encounter,
  setPrescriptions,
}: {
  encounter: Encounter | undefined;
  setPrescriptions: Dispatch<SetStateAction<MedicationRequest[]>>;
}) => {
  const userReference = useNanoUserReference();
  const medDatabase = useNanoDatabase<Medication>('medications');
  const [prescriptions, { push, removeAt }] = useList<MedicationRequest>();

  useEffect(() => {
    setPrescriptions(prescriptions);
    return () => {};
  }, [prescriptions, setPrescriptions]);

  const handleAdd = (data) => {
    const prescription = new MedicationRequest();
    prescription.requester = userReference;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    prescription.encounter = createObjectReference<Encounter>(encounter!);
    // push(prescription);
    console.log(data);
  };

  const DrugsList = () => {
    if (prescriptions.length < 1) {
      return <p className="m-0">There are no drugs on list</p>;
    }
    return (
      <>
        {prescriptions.map((prescription) => {
          const { medication, dosageInstruction } = prescription;
          const drug: Reference = medication?.clone();

          return (
            <div
              key={prescription.id}
              className="card-header clearfix no-margin"
            >
              <div className="row mt-2 p-l-5">
                <span className="card-title no-margin no-padding w-75 p-t-5">
                  {`200mg of ${drug.display}`}
                </span>
                <div className="text-primary text-center w-25 p-b-5">
                  <a
                    href="/"
                    className="header-icon btn btn-icon-link pull-right"
                  >
                    <i className="pg-icon">bin</i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <Form onSubmit={(data) => handleAdd(data)}>
      <div className="card social-card w-100 share" data-social="item">
        <div
          className="circle"
          data-toggle="tooltip"
          title="Label"
          data-container="body"
        />
        <div className="card-header clearfix">
          <div className="card-title bold">Prescription</div>
        </div>
        <div className="card-description">
          <p>Create a drug prescription for patient.</p>
        </div>
        <div className="card-body">
          <DrugsList />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="w-25 bg-light rounded" />
            <div className="w-75 justify-content-between">
              <TypeAheadInput dbName="" name="item" placeholder="Medicine" />
              <MeasurableInput name="measure" placeholder="Dosage" />
            </div>
          </div>
          <div className="row mt-1">
            <div className="form-group form-group-default required ">
              <label>Note</label>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <textarea name="note" className="form-control" />
            </div>
          </div>
        </div>
        <div className="card-footer clearfix">
          <div className="pull-left">
            <p className="hint-text no-margin no-padding">
              Add entry to prescription list
            </p>
          </div>
          <div className="pull-right text-primary text-center">
            <button type="submit" className="header-icon btn-icon-link">
              <i className="pg-icon">add</i>
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Prescription;
