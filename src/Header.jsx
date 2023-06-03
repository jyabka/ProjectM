import React, {useState} from 'react';
import {playBackgroundMusic} from "./bin/playSound";

export default function Header() {
  const [disable, setDisable] = useState(true);

  function colorHandler(disable) {
    return disable ? 'is-normal' : 'is-disabled';
  }

    return (
        <div className="header nes-container is-dark with-title">
            <p className="title">ReactReduxRPG</p>
            <p>Good luck, Stranger.</p>
          <button
            type="button"
            className={"nes-btn" + ' ' + colorHandler(disable)}
            disabled={!disable}
            onClick={()=> {
              playBackgroundMusic();
              setDisable(!disable);
            }}
          >Music
          </button>

        </div>
    );
};
