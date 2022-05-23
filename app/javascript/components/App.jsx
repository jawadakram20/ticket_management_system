import React, { useState, useEffect } from "react";
import "./App.css";
import TaskBoard from "../components/TaskBoard";


const App = () => {
  
  return (
    <div className="container-wrap">
      <TaskBoard />
    </div>
  );
};

export default App;
