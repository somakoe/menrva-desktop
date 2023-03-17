import React, { useContext } from 'react';
import { UserContext } from '@database/providers/UserProvider';
import {
  HumanName,
  Practitioner,
  PractitionerQualification,
} from 'fhir-typescript-models';
import { findByUse, findLatestDate } from '@database/hooks/mango-fhir-queries';

const Header = () => {
  const user = useContext<Practitioner>(UserContext);

  const { name, qualification } = user;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const humanName = findByUse<HumanName>(name!, 'official');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const qualifiedAt = findLatestDate<PractitionerQualification>(qualification!);

  return (
    <div className="header ">
      <a
        href="/"
        className="btn-link toggle-sidebar d-lg-none pg-icon btn-icon-link"
        data-toggle="sidebar"
      >
        menu
      </a>
      <div className="">
        <div className="brand inline">
          <h4 className="text-success no-margin no-padding font-montserrat bold p-r-5">
            Menrva <span className="text-black light">+</span>
          </h4>
        </div>
        <ul className="d-lg-inline-block d-none notification-list no-margin d-lg-inline-block b-grey b-l b-r no-style p-l-20 p-r-20">
          <li className="p-r-5 inline">
            <div className="dropdown">
              <a
                href="/"
                id="notification-center"
                className="header-icon  btn-icon-link"
                data-toggle="dropdown"
              >
                <i className="pg-icon">world</i>
                <span className="bubble" />
              </a>
              <div
                className="dropdown-menu notification-toggle"
                role="menu"
                aria-labelledby="notification-center"
              >
                <div className="notification-panel">
                  <div
                    className="scroll-wrapper notification-body scrollable"
                    // style="position: relative;"
                  >
                    <div
                      className="notification-body scrollable scroll-content"
                      //   style="
                      //   height: auto;
                      //   margin-bottom: 0px;
                      //   margin-right: 0px;
                      //   max-height: 0px;
                      // "
                    >
                      <div className="notification-item unread clearfix">
                        <div className="heading open">
                          <a
                            href="/"
                            className="text-complete pull-left d-flex align-items-center"
                          >
                            <i className="pg-icon m-r-10">map</i>
                            <span className="bold">Carrot Design</span>
                            <span className="fs-12 m-l-10">David Nester</span>
                          </a>
                          <div className="pull-right">
                            <div className="thumbnail-wrapper d16 circular inline m-t-15 m-r-10 toggle-more-details">
                              <div>
                                <i className="pg-icon">chevron_down</i>
                              </div>
                            </div>
                            <span className=" time">few sec ago</span>
                          </div>
                          <div className="more-details">
                            <div className="more-details-inner">
                              <h5 className="semi-bold fs-16">
                                “Apple’s Motivation - Innovation <br />
                                distinguishes between <br />A leader and a
                                follower.”
                              </h5>
                              <p className="small hint-text">
                                Commented on john Smiths wall.
                                <br />
                                via pages framework.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="option"
                          data-toggle="tooltip"
                          data-placement="left"
                          title=""
                          data-original-title="mark as read"
                        >
                          <a href="/" className="mark">
                            .
                          </a>
                        </div>
                      </div>
                      <div className="notification-item  clearfix">
                        <div className="heading">
                          <a href="/" className="text-danger pull-left">
                            <i className="pg-icon m-r-10">alert_warning</i>
                            <span className="bold">98% Server Load</span>
                            <span className="fs-12 m-l-10">Take Action</span>
                          </a>
                          <span className="pull-right time">2 mins ago</span>
                        </div>
                        <div className="option">
                          <a href="/" className="mark">
                            .
                          </a>
                        </div>
                      </div>
                      <div className="notification-item  clearfix">
                        <div className="heading">
                          <a href="/" className="text-warning pull-left">
                            <i className="pg-icon m-r-10">alert_warning</i>
                            <span className="bold">Warning Notification</span>
                            <span className="fs-12 m-l-10">Buy Now</span>
                          </a>
                          <span className="pull-right time">yesterday</span>
                        </div>

                        <div className="option">
                          <a href="/" className="mark">
                            .
                          </a>
                        </div>
                      </div>
                      <div className="notification-item unread clearfix">
                        <div className="heading">
                          <div className="thumbnail-wrapper d24 circular b-white m-r-5 b-a b-white m-t-10 m-r-10">
                            <img
                              width="30"
                              height="30"
                              data-src-retina="assets/img/profiles/1x.jpg"
                              data-src="assets/img/profiles/1.jpg"
                              alt=""
                              src="assets/img/profiles/1.jpg"
                            />
                          </div>
                          <a href="/" className="text-complete pull-left">
                            <span className="bold">Revox Design Labs</span>
                            <span className="fs-12 m-l-10">Owners</span>
                          </a>
                          <span className="pull-right time">11:00pm</span>
                        </div>
                        {/* START Notification Item Right Side */}
                        <div
                          className="option"
                          data-toggle="tooltip"
                          data-placement="left"
                          title=""
                          data-original-title="mark as read"
                        >
                          <a href="/" className="mark">
                            .
                          </a>
                        </div>
                        {/* END Notification Item Right Side */}
                      </div>
                      {/* END Notification Item */}
                    </div>
                    <div className="scroll-element scroll-x">
                      <div className="scroll-element_outer">
                        <div className="scroll-element_size" />
                        <div className="scroll-element_track" />
                        <div className="scroll-bar" />
                      </div>
                    </div>
                    <div className="scroll-element scroll-y">
                      <div className="scroll-element_outer">
                        <div className="scroll-element_size" />
                        <div className="scroll-element_track" />
                        <div className="scroll-bar" />
                      </div>
                    </div>
                  </div>
                  {/* END Notification Body */}
                  {/* START Notification Footer */}
                  <div className="notification-footer text-center">
                    <a href="/" className="">
                      Read all notifications
                    </a>
                    <a
                      data-toggle="refresh"
                      className="portlet-refresh text-black pull-right"
                      href="/"
                    >
                      <i className="pg-refresh_new" />
                    </a>
                  </div>
                  {/* START Notification Footer */}
                </div>
                {/* END Notification */}
              </div>
              {/* END Notification Dropdown */}
            </div>
          </li>
          <li className="p-r-5 inline">
            <a href="/" className="header-icon  btn-icon-link">
              <i className="pg-icon">link_alt</i>
            </a>
          </li>
          <li className="p-r-5 inline">
            <a href="/" className="header-icon  btn-icon-link">
              <i className="pg-icon">grid_alt</i>
            </a>
          </li>
        </ul>
        {/* END NOTIFICATIONS LIST */}
        <a
          href="/"
          className="search-link d-lg-inline-block d-none"
          data-toggle="search"
        >
          <i className="pg-icon">search</i>Type anywhere to{' '}
          <span className="bold">search</span>
        </a>
      </div>
      <div className="d-flex align-items-center">
        {/* START User Info */}
        <div className="inline m-r-20 p-r-1">
          <h5 className="text-black no-margin">{humanName.text}</h5>
          <p className="text-black no-margin light info">
            {qualifiedAt.code?.text ?? 'N/A'}
          </p>
        </div>
        <div className="dropdown pull-right d-lg-block d-none">
          <button
            className="profile-dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            aria-label="profile dropdown"
          >
            <span className="thumbnail-wrapper d32 circular inline">
              <img
                src="assets/img/profiles/avatar.jpg"
                alt=""
                data-src="assets/img/profiles/avatar.jpg"
                data-src-retina="assets/img/profiles/avatar_small2x.jpg"
                width="32"
                height="32"
              />
            </span>
          </button>
          <div
            className="dropdown-menu dropdown-menu-right profile-dropdown"
            role="menu"
          >
            <a href="/" className="dropdown-item">
              <span>
                Signed in as <br />
                <b>{humanName.text}</b>
              </span>
            </a>
            <div className="dropdown-divider" />
            <a href="/" className="dropdown-item">
              Your Profile
            </a>
            <a href="/" className="dropdown-item">
              Your Activity
            </a>
            <a href="/" className="dropdown-item">
              Your Archive
            </a>
            <div className="dropdown-divider" />
            <a href="/" className="dropdown-item">
              Features
            </a>
            <a href="/" className="dropdown-item">
              Help
            </a>
            <a href="/" className="dropdown-item">
              Settings
            </a>
            <a href="/" className="dropdown-item">
              Logout
            </a>
            <div className="dropdown-divider" />
            <span className="dropdown-item fs-12 hint-text">
              Last edited by David
              <br />
              on Friday at 5:27PM
            </span>
          </div>
        </div>
        {/* END User Info */}
      </div>
    </div>
  );
};

export default Header;
