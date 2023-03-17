import React, { useEffect } from 'react';

const { $ } = require('react-jquery-plugin');
$.DataTable = require('datatables.net');

// eslint-disable-next-line react/prop-types
const DataTable = ({ data, columns, columnDefs }) => {
  useEffect(() => {
    const table = $('#tableWithSearch').DataTable({
      dom: "<t><'row'<p i>>",
      scrollCollapse: true,
      data,
      columns,
      columnDefs,
      language: {
        lengthMenu: '_MENU_ ',
        info: 'Showing <b>_START_ to _END_</b> of _TOTAL_ entries',
      },
      displayLength: 5,
    });

    $('#search-table').keyup(() => {
      table.filter($('#search-table').val());
    });

    return () => {
      table.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <table
      id="tableWithSearch"
      role="grid"
      className="table table-hover demo-table-search table-responsive-block dataTable no-footer w-100"
    />
  );
};

// eslint-disable-next-line react/prop-types
const Table = ({ data, columns, columnDefs }) => {
  useEffect(() => {
    const table = $('#regularTable').DataTable({
      dom: "<t><'row'<p i>>",
      scrollCollapse: true,
      data,
      destroy: true,
      columns,
      columnDefs,
      info: false,
      displayLength: 2,
    });

    $('#regularTable thead').addClass('hidden');
    $('#regularTable_wrapper .row').addClass('hidden');

    return () => {
      table.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <table
      id="regularTable"
      role="grid"
      className="table table-hover table-responsive-block dataTable no-footer w-100"
    />
  );
};

export { DataTable, Table };
