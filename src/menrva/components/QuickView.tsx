import React from 'react';

const QuickView = () => {
  return (
    <div id="quickview" className="quickview-wrapper" data-pages="quickview">
      <ul className="nav nav-tabs" role="tablist">
        <li className="">
          <a
            href="#quickview-notes"
            data-target="#quickview-notes"
            data-toggle="tab"
            role="tab"
          >
            Notes
          </a>
        </li>
      </ul>
      <a
        href="/"
        className="btn-icon-link invert quickview-toggle"
        data-toggle-element="#quickview"
        data-toggle="quickview"
      >
        <i className="pg-icon">close</i>
      </a>
      <div className="tab-content">
        <div className="tab-pane no-padding" id="quickview-notes">
          <div className="view-port clearfix quickview-notes" id="note-views">
            <div className="view list" id="quick-note-list">
              <div className="toolbar clearfix">
                <ul className="pull-right ">
                  <li>
                    <a href="/" className="delete-note-link">
                      <i className="pg-icon">trash_alt</i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="new-note-link"
                      data-navigate="view"
                      data-view-port="#note-views"
                      data-view-animation="push"
                    >
                      <i className="pg-icon">add</i>
                    </a>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn-remove-notes btn btn-xs btn-block hide"
                >
                  <i className="pg-icon">close</i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
