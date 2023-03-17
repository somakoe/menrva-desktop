import React, { useCallback } from 'react';
import HospitalCardItem from '@components/HospitalCardItem';
import { Patient } from 'fhir-typescript-models';

interface Props {
  document: Patient;
}

const RecordItem = (props: Props) => {
  const { document } = props;

  const buttonRef = useCallback((node) => {
    if (node !== null) {
      node.addEventListener('click', () => {
        // eslint-disable-next-line no-console
        console.log(`You clicked ${document.id}`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-md-4 col-lg-4 col-xl-4 col-xlg-2 ">
      {/* Patients Card Start */}
      <div className="card social-card w-100 share" data-social="item">
        <div className="card-body mt-2">
          <div className="card social-card w-100 no-padding no-margin">
            <HospitalCardItem patient={document} />
          </div>
        </div>
        <div className="card-footer w-100">
          <div className="hint-text pull-left fs-13 btn btn-link">Report</div>
          <button
            aria-label=""
            type="button"
            ref={buttonRef}
            disabled={document.active}
            className="btn btn-cons btn-animated from-left pull-right btn-success"
          >
            <span>{document.active ? 'Admitted' : 'Admit'}</span>
            <span className="hidden-block">
              <i className="pg-icon">close</i>
            </span>
          </button>
        </div>
      </div>
      {/* Patients Card End */}
    </div>
  );
};

export default RecordItem;
