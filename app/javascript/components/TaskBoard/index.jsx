import React, { useState, useEffect } from "react";
import axios from "axios";
import Board from "react-trello";
import NewSprintCTA from "../NewSprintCTA";
import NewTicketCTA from "../NewTicketCTA";

const TaskBoard = () => {
  const [boardData, setBoardData] = useState(null);

  const listSprints = async () => {
    let res = await axios.get("/api/v1/sprints");
    let results = [];
    if (res && res.data) {
      res.data.map((sprint) => {
        results.push({
          id: sprint.id,
          title: sprint.title,
          label: "",
          cards: sprint.tickets.map((ticket) => {
            return {
              ...ticket,
            };
          }),
        });
      });
    }
    await listTickets(results);
  };

  const listTickets = async (results) => {
    const res = await axios.get("/api/v1/tickets");
    if (res && res.data) {
      let ticketsLane = {
        id: "ticketLane1",
        title: "Tickets",
        label: "",
        cards: res.data.map((ticket) => {
          return {
            ...ticket,
          };
        }),
      };
      if (results.length > 0) {
        setBoardData({ lanes: [ticketsLane, ...results] });
      } else {
        setBoardData({ lanes: [ticketsLane] });
      }
    }
  };

  useEffect(() => {
    listSprints();
  }, []);

  const onCardDragged = async (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = `/api/v1/tickets/${cardId}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sprint_id: targetLaneId,
        draggable: false,
      }),
    })
      .then((response) => {
        if (response.ok) {
          listSprints();
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then()
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="nav">
        <h2 className="text-center">Ticket Management System</h2>
        <div className="button-wrapper">
          <div className="mx-3">
            <NewSprintCTA listSprints={listSprints} />
          </div>
          <div className="mx-3">
            <NewTicketCTA listSprints={listSprints} />
          </div>
        </div>
      </div>
      <div className="root-box">
        {boardData && (
          <Board
            data={boardData}
            handleDragEnd={onCardDragged}
            hideCardDeleteIcon
          />
        )}
      </div>
    </>
  );
};

export default TaskBoard;
