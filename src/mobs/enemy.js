import React from "react";
import settings from "../configs/settings"
import {useSelector} from "react-redux";

function Enemy() {
    const position = useSelector(state => state.mob.position);
    console.log(position);

    return (
      <div
        style={{
          backgroundColor: "greenyellow",
          position: "relative",
          width: "32px",
          height: "32px",
        }}
      />
    );
}

export default Enemy;