import React, { useState } from 'react';

import Infobar from '@components/sidebar/Infobar';
import Notes from '@components/cards/Notes';
import { Annotation } from 'fhir-typescript-models';

const Vitals = () => {
  const [notes, setNotes] = useState<Annotation[]>([]);

  return (
    <div className="page-content-wrapper">
      <div className="content sm-gutter">
        <div className="container-fluid padding-25 sm-padding-10">
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-xlg-4">
              <div className="row">
                <div className="col-md-12">
                  <Infobar />
                  <div
                    className="card social-card w-100 share"
                    data-social="item"
                  >
                    <div className="card-header clearfix">
                      <div className="card-title bold">Vitals</div>
                    </div>
                    <div className="card-description">
                      <p>Some information like page details.</p>
                    </div>
                    <div className="card-body">
                      <form className="row">
                        <div className="col-md-6">
                          <div className="form-group form-group-default required">
                            <label>
                              Temperature (
                              <span className="btn btn-link no-top-padding no-bottom-padding fs-13 bold">
                                Celsius
                              </span>
                              )
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-xlg-4">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="card social-card w-100 share"
                    data-social="item"
                  >
                    <div
                      className="circle"
                      data-toggle="tooltip"
                      title="Label"
                      data-container="body"
                    />
                    <div className="card-header clearfix">
                      <div className="card-title bold">Allergies</div>
                    </div>
                    <div className="card-description">
                      <p>Some information like page details.</p>
                    </div>
                    <div className="px-3">
                      <span className="label fs-14 m-r-5">
                        Mushrooms
                        <i className="pg-icon">close</i>
                      </span>
                      <span className="label fs-14 m-r-5">
                        Mushrooms
                        <i className="pg-icon">close</i>
                      </span>
                      <span className="label fs-14 m-r-5">
                        Mushrooms
                        <i className="pg-icon">close</i>
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="form-group form-group-default required">
                        <label>Allergic to...</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="card-footer clearfix">
                      <div className="pull-left">
                        <p className="hint-text no-margin no-padding">
                          Add another allergy
                        </p>
                      </div>
                      <div className="pull-right text-primary text-center">
                        <a href="/" className="header-icon btn-icon-link">
                          <i className="pg-icon">add</i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Notes setNotes={setNotes} />
                  <div className="card card-transparent social-card text-center card-min-h-200px w-100 align-items-center">
                    <div className="card-description w-75 ">
                      <p className="m-t-5 bg-light rounded p-3">
                        Some warning to show before user submiits form. Probably
                        gonna be some lengthy, like real long, no pun intended.
                        <br />
                        <a href="/" className="btn btn-link m-t-20 text-danger">
                          Report
                        </a>
                      </p>
                    </div>
                    <div className="pull-bottom w-100 mb-4 ">
                      <button
                        aria-label=""
                        type="button"
                        className="btn btn-primary btn-cons btn-animated from-left"
                      >
                        <span>Save</span>
                        <span className="hidden-block">
                          <i className="pg-icon">save</i>
                        </span>
                      </button>

                      <button
                        aria-label=""
                        type="button"
                        className="btn btn-danger btn-cons btn-animated from-left"
                      >
                        <span>Cancel</span>
                        <span className="hidden-block">
                          <i className="pg-icon">close</i>
                        </span>
                      </button>
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

export default Vitals;
