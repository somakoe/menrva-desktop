import { Encounter } from 'fhir-typescript-models';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import TextInput from '@components/elements/inputs/TextInput';
import { TransparentButton } from '@components/elements/Button';
import {
  ViewDataContext,
  ViewRow,
} from '@database/providers/ViewSearchProvider';

const HorizontalSearchList = ({
  setEncounter,
}: {
  setEncounter: Dispatch<SetStateAction<Encounter | undefined>>;
}) => {
  const [records, setSearchQuery] = useContext<
    [ViewRow<Encounter>[], React.Dispatch<React.SetStateAction<string>>]
  >(ViewDataContext);

  return (
    <div className="row p-r-10">
      <div className="col-md-12">
        <div className="form-group input-group transparent b-b b-primary bg-2 bg-light p-2">
          <div className="input-group-prepend">
            <span className="input-group-text transparent border-0">
              <i className="pg-icon">search</i>
            </span>
          </div>
          <TextInput
            type="text"
            id="search"
            name="search"
            onChange={setSearchQuery}
            placeholder="Search"
            className="form-control transparent"
          />
        </div>
        <div className="row no-margin w-100">
          {records.map((row) => {
            const { value } = row;
            const { subject } = value;
            return (
              <div className="mb-2 no-padding" key={value.id}>
                <TransparentButton
                  type="button"
                  onClick={() => {
                    setEncounter(value);
                  }}
                >
                  <div className="card social-card share border-0 shadow-none no-margin no-padding w-100">
                    <div className="card-header clearfix bg-white">
                      <div className="user-pic">
                        <img
                          alt="profile"
                          width="40"
                          height="40"
                          data-src-retina="./menrva/assets/img/profiles/6x.jpg"
                          data-src="./menrva/assets/img/profiles/6.jpg"
                          src="./menrva/assets/img/profiles/6x.jpg"
                        />
                      </div>
                      <span className="label font-montserrat fs-13 align-items-center text-success">
                        <i className="pg-icon m-r-5 fs-14">folder</i>
                        <span>{subject?.reference}</span>
                      </span>
                      <h5 className="text-black semi-bold mt-1">
                        {subject?.display}
                      </h5>
                    </div>
                  </div>
                </TransparentButton>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default HorizontalSearchList;
