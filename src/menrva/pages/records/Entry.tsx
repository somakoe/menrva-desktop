import React, { useState } from 'react';
import Infobar from '@components/sidebar/Infobar';
import { AnimatedButton } from '@components/elements/Button';

const Biodata = ({ setBiodata }) => {
  return (
    <div className="card social-card w-100" data-social="item">
      <div className="card-header clearfix">
        <div className="card-title bold">Biodata</div>
      </div>

      <div className="px-3 card-description">
        <p>Some information like page details.</p>
      </div>
      <div className="card-body">
        <form className="">
          <div className="row px-1">
            <div className="col-md-6">
              <div className="form-group form-group-default required">
                <label>Last name</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-group-default">
                <label>Other names</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="form-group form-group-default input-group required">
            <div className="form-input-group">
              <label>Date of Birth</label>
              <input
                type="email"
                className="form-control"
                placeholder="Pick a date"
                id="datepicker-component2"
              />
            </div>
            <div className="input-group-append ">
              <span className="input-group-text">
                <i className="pg-icon">calendar</i>
              </span>
            </div>
          </div>
          <div className="form-group form-group-default required">
            <label>Phone</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group form-group-default required">
            <label>Email</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group form-group-default required">
            <label>Nationality</label>
            <input type="text" className="form-control" />
          </div>
          <div className="row px-1">
            <div className="col-md-6">
              <div className="form-group form-group-default required">
                <label>Address: Line 1</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-group-default">
                <label>Address: Line 2</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row px-1">
            <div className="col-md-6">
              <div className="form-group form-group-default required">
                <label>Address: Region</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-group-default">
                <label>Address: Country</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Identity = ({ setIdentities }) => {
  return (
    <div className="card social-card w-100 share" data-social="item">
      <div
        className="circle"
        data-toggle="tooltip"
        title="Label"
        data-container="body"
      />
      <div className="card-header clearfix">
        <div className="card-title bold">Identity</div>
      </div>
      <div className="card-description">
        <p>Some information like page details.</p>
      </div>
      <div className="card-body">
        <div className="form-group form-group-default required">
          <label>Id Type</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group form-group-default required">
          <label>Id Code</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="card-footer clearfix">
        <div className="pull-left text-center">
          <p className="hint-text">Add another identity verification</p>
        </div>
        <div className="pull-right text-primary text-center">
          <button type="submit" className="header-icon btn-icon-link">
            <i className="pg-icon">add</i>
          </button>
        </div>
      </div>
    </div>
  );
};

const EmergencyContacts = ({ setEmergency }) => {
  return (
    <div className="card social-card w-100 share" data-social="item">
      <div
        className="circle"
        data-toggle="tooltip"
        title="Label"
        data-container="body"
      />
      <div className="card-header clearfix">
        <div className="card-title bold">Emergency</div>
      </div>
      <div className="card-description">
        <p>Some information like page details.</p>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group form-group-default required">
              <label>Last name</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group form-group-default">
              <label>Last name</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="form-group form-group-default required">
          <label>Phone</label>
          <input type="text" className="form-control" />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group form-group-default required">
              <label>Address: Line 1</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group form-group-default">
              <label>Address: Line 2</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group form-group-default required">
              <label>Address: Region</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group form-group-default">
              <label>Address: Country</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer clearfix">
        <div className="pull-left text-center">
          <p className="hint-text">Add another emergency</p>
        </div>
        <div className="pull-right text-primary text-center">
          <button type="submit" className="header-icon btn-icon-link">
            <i className="pg-icon">add</i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Insurance = ({ setInsurance }) => {
  return (
    <div className="card social-card w-100 share" data-social="item">
      <div
        className="circle"
        data-toggle="tooltip"
        title="Label"
        data-container="body"
      />
      <div className="card-header clearfix">
        <div className="card-title bold">Insurance</div>
      </div>
      <div className="card-description">
        <p>Some information like page details.</p>
      </div>

      <div className="card-body">
        <form className="">
          <div className="form-group form-group-default required">
            <label>Insurer</label>
            <input type="email" className="form-control" required />
          </div>
          <div className="form-group form-group-default required">
            <label>Name</label>
            <input
              type="text"
              placeholder="Jane Ali Doe"
              className="form-control"
              required
            />
          </div>
          <div className="form-group form-group-default required">
            <label>Id Code</label>
            <input type="email" className="form-control" required />
          </div>
        </form>
      </div>
      <div className="card-footer clearfix">
        <div className="pull-left text-center">
          <p className="hint-text">Add another Insurer</p>
        </div>
        <div className="pull-right text-primary text-center">
          <button type="submit" className="header-icon btn-icon-link">
            <i className="pg-icon">add</i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Entry = () => {
  const [biodata, setBiodata] = useState();
  const [identity, setIdentities] = useState([]);
  const [emergency, setEmergency] = useState([]);
  const [insurance, setInsurance] = useState([]);

  const handleComplete = () => {};
  const handleCancel = () => {};

  return (
    <div className="page-content-wrapper">
      <div className="content sm-gutter">
        <div className="container-fluid padding-25 sm-padding-10">
          <div className="row">
            <div className="col-lg-6 col-xl-6 col-xlg-4">
              <div className="row">
                <div className="px-3 py-2">
                  <Infobar />
                </div>
                <div className="col-md-12">
                  <Biodata setBiodata={setBiodata} />
                  <Identity setIdentities={setIdentities} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-xlg-4">
              <div className="row">
                <div className="col-md-12">
                  <EmergencyContacts setEmergency={setEmergency} />
                  <Insurance setInsurance={setInsurance} />
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
                      <AnimatedButton
                        onClick={handleComplete}
                        className="btn-primary"
                      >
                        <span>Save</span>
                        <span className="hidden-block">
                          <i className="pg-icon">save</i>
                        </span>
                      </AnimatedButton>

                      <AnimatedButton
                        onClick={handleCancel}
                        className="btn-danger"
                      >
                        <span>Cancel</span>
                        <span className="hidden-block">
                          <i className="pg-icon">close</i>
                        </span>
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

export default Entry;
