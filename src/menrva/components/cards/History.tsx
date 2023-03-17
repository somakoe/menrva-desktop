import React, { useState, useEffect } from 'react';
import { Table } from '@components/elements/Datatable';
import { findByUse, findManyById } from '@database/hooks/mango-fhir-queries';
import { Encounter, Patient } from 'fhir-typescript-models';
import { useNanoDatabase } from '@database/hooks/nano-hooks';

const History = ({ patient }: { patient: Patient | undefined }) => {
  const dEncounters = useNanoDatabase<Encounter>('encounters');
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (patient === undefined) return;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const rEncounters = await dEncounters.query(findManyById(patient.id!));
      setEncounters(rEncounters);
    };
    fetchData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card social-card w-100 share" data-social="item">
      <div
        className="circle"
        data-toggle="tooltip"
        title="Label"
        data-container="body"
      />
      <div className="card-header clearfix">
        <div className="card-title bold">History</div>
      </div>
      <div className="card-description">
        <p>Patient&apos;s medical history.</p>
      </div>
      <div className="card-body">
        <Table
          data={[]}
          columns={[
            { title: 'Patient', data: 'name' },
            { title: 'Date', data: 'date' },
          ]}
          columnDefs={[
            {
              targets: 0,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render(data, type, row, meta) {
                // eslint-disable-next-line react/prop-types
                if (patient?.name === undefined) return <></>;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const humanName = findByUse(
                  // eslint-disable-next-line react/prop-types
                  patient.name,
                  'official'
                );
                return (
                  <a href="/" className="btn text-success">
                    Patient: ${humanName.text}
                  </a>
                );
              },
            },
          ]}
        />
      </div>
      <div className="card-footer clearfix">
        <div className="pull-left">
          <p className="hint-text no-margin">Last refresh was 2 months ago</p>
        </div>
      </div>
    </div>
  );
};

export default History;
