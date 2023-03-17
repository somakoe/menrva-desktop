import React, { useEffect } from 'react';

const { $ } = require('react-jquery-plugin');

const Search = () => {
  useEffect(() => {
    // Initializes search overlay plugin.
    // Replace onSearchSubmit() and onKeyEnter() with
    // your logic to perform a search and display results
    $('.list-view-wrapper').scrollbar();

    $('[data-pages="search"]').search({
      // Bind elements that are included inside search overlay
      searchField: '#overlay-search',
      closeButton: '.overlay-close',
      suggestions: '.overlay-suggestions',
      brand: '.brand',
      // Callback that will be run when you hit ENTER button on search box
      onSearchSubmit(searchString) {
        // eslint-disable-next-line no-console
        console.log(`Search for: ${searchString}`);
      },
      // Callback that will be run whenever you enter a key into search box.
      // Perform any live search here.
      onKeyEnter(searchString) {
        // eslint-disable-next-line no-console
        console.log(`Live search for: ${searchString}`);
        const searchField = $('#overlay-search');
        const searchResults = $('.search-results');

        /*
                    Do AJAX call here to get search results
                    and update DOM and use the following block
                    'searchResults.find('.result-name').each(function() {...}'
                    inside the AJAX callback to update the DOM
                */

        // Timeout is used for DEMO purpose only to simulate an AJAX call
        clearTimeout($.data(this, 'timer'));
        searchResults.fadeOut('fast'); // hide previously returned results until server returns new results
        const wait = setTimeout(() => {
          searchResults.find('.result-name').each(() => {
            if (searchField.val().length !== 0) {
              $(this).html(searchField.val());
              searchResults.fadeIn('fast'); // reveal updated results
            }
          });
        }, 500);
        $(this).data('timer', wait);
      },
    });
  }, []);
  return (
    <div className="overlay hide" data-pages="search">
      <div className="overlay-content has-results m-t-20">
        <div className="container-fluid">
          <h4 className="text-success no-margin no-padding font-montserrat bold p-r-5">
            Menrva <span className="text-black light">+</span>
          </h4>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href=""
            className="close-icon-light btn-link btn-rounded  overlay-close text-black"
          >
            <i className="pg-icon">close</i>
          </a>
        </div>
        <div className="container-fluid">
          <input
            id="overlay-search"
            className="no-border overlay-search bg-transparent"
            placeholder="Search..."
            autoComplete="off"
            spellCheck="false"
          />
          <br />
          <div className="d-flex align-items-center">
            <div className="form-check right m-b-0">
              <input id="checkboxn" type="checkbox" value="1" />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="checkboxn">Search within page</label>
            </div>
            <p className="fs-13 hint-text m-l-10 m-b-0">
              Press enter to search
            </p>
          </div>
        </div>
        <div className="container-fluid p-t-20">
          <span className="hint-text">suggestions :</span>
          <span className="overlay-suggestions" />
          <br />
          <div className="search-results m-t-30">
            <p className="bold">
              Pages Search Results: <span className="overlay-suggestions" />
            </p>
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex m-t-15">
                  <div className="thumbnail-wrapper d48 circular bg-success text-white ">
                    <div>T</div>
                  </div>
                  <div className="p-l-10">
                    <h5 className="no-margin ">
                      <span className="semi-bold result-name">Home</span>
                    </h5>
                    <p className="small-text hint-text">No new updates</p>
                  </div>
                </div>
                <div className="d-flex m-t-15">
                  <div className="thumbnail-wrapper d48 circular bg-success text-white ">
                    <div>T</div>
                  </div>
                  <div className="p-l-10">
                    <h5 className="no-margin ">
                      <span className="semi-bold result-name">Laboratory</span>
                    </h5>
                    <p className="small-text hint-text">No new updates</p>
                  </div>
                </div>
                <div className="d-flex m-t-15">
                  <div className="thumbnail-wrapper d48 circular bg-success text-white ">
                    <div>M</div>
                  </div>
                  <div className="p-l-10">
                    <h5 className="no-margin ">
                      <span className="semi-bold result-name">Settings</span>
                    </h5>
                    <p className="small-text hint-text">No new updates</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex m-t-15">
                  <div className="thumbnail-wrapper d48 circular bg-info text-white d-flex align-items-center">
                    <i className="pg-icon">facebook</i>
                  </div>
                  <div className="p-l-10">
                    <h5 className="no-margin ">
                      <span className="semi-bold result-name">Menrva</span>
                    </h5>
                    <p className="small-text hint-text">via facebook</p>
                  </div>
                </div>
                <div className="d-flex m-t-15">
                  <div className="thumbnail-wrapper d48 circular bg-complete text-white d-flex align-items-center">
                    <i className="pg-icon">twitter</i>
                  </div>
                  <div className="p-l-10">
                    <h5 className="no-margin ">
                      <span className="semi-bold result-name">
                        Tweets on Menrva
                      </span>
                    </h5>
                    <p className="small-text hint-text">via twitter</p>
                  </div>
                </div>
                <div className="d-flex m-t-15">
                  <div className="thumbnail-wrapper d48 circular text-white bg-danger d-flex align-items-center">
                    <i className="pg-icon">google_plus</i>
                  </div>
                  <div className="p-l-10">
                    <h5 className="no-margin ">
                      Circles on
                      <span className="semi-bold result-name">Menrva</span>
                    </h5>
                    <p className="small-text hint-text">via google plus</p>
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

export default Search;
