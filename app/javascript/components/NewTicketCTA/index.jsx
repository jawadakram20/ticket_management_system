import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const NewTicketCTA = ({ listSprints }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  let name, value;
  const eventHandler = (event) => {
    name = event.target.name;
    value = event.target.value;

    setData({ ...data, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/tickets";
    const { title, description } = data;

    const body = {
      title,
      description,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          setOpen(false);
          return listSprints();
        }
        throw new Error("Network response was not ok.");
      })
      .then()
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setOpen(true)}
      >
        Create New Ticket
      </button>
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader toggle={() => setOpen(!open)}>New Sprint</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit}>
            <div className="mb-3 mt-3">
              <label htmlfor="text" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Enter Your Name"
                name="title"
                onChange={eventHandler}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlfor="textarea" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="textarea"
                placeholder="Enter Description"
                rows="4"
                name="description"
                onChange={eventHandler}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary "
                onClick={() => setOpen(true)}
              >
                Close
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewTicketCTA;
