import { useNanoUserReference } from '@database/hooks/nano-hooks';
import { Annotation } from 'fhir-typescript-models';
import Form from '@components/elements/Form';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useList } from 'react-use';

const Notes = ({
  setNotes,
}: {
  setNotes: Dispatch<SetStateAction<Annotation[]>>;
}) => {
  const reference = useNanoUserReference();
  const [notes, { push, removeAt }] = useList<Annotation>();

  useEffect(() => {
    setNotes(notes);
    return () => {};
  }, [notes, setNotes]);

  const handleAdd = (data) => {
    console.log(data);
  };

  const NoteList = () => {
    if (notes.length < 1) {
      return <p className="m-0">There are no notes</p>;
    }
    return (
      <>
        {notes.map((note) => {
          return <p key={note.id}>{note.text}</p>;
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
          <div className="card-title bold">Notes</div>
        </div>
        <div className="card-description">
          <p>Additional pad to write any medical annotations.</p>
        </div>
        <div className="card-body">
          <NoteList />
        </div>
        <div className="card-body">
          <div className="form-group form-group-default required no-margin">
            <label>Note</label>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <textarea name="note" className="form-control" />
          </div>
        </div>

        <div className="card-footer clearfix">
          <div className="pull-left">
            <p className="hint-text no-margin">Add a note or pass a comment</p>
          </div>
          <div className="pull-right text-center">
            <button type="submit" className="header-icon btn-icon-link">
              <i className="pg-icon">add</i>
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Notes;
