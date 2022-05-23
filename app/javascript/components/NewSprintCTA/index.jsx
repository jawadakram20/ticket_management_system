import React, { useRef, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const NewSprintCTA = ({ listSprints }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    start_date: "",
    end_date: "",
  });
  let name, value;
  const handleOnChange = (event) => {
    name = event.target.name;
    value = event.target.value;

    setData({ ...data, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/sprints";
    const { name, start_date, end_date } = data;

    const body = {
      name,
      start_date,
      end_date,
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
        Create New Sprint
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
                placeholder="Enter Your Name"
                name="name"
                required={true}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlfor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                name="start_date"
                required={true}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlfor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                name="end_date"
                onChange={handleOnChange}
                required={true}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setOpen(false)}
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

export default NewSprintCTA;
