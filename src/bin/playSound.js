import React, {useEffect, useState} from "react";
import walkSound from '../assets/sounds/sfx/Step.mp3';

export function  playWalkSound() {
  new Audio(walkSound).play();
}
/*export function WalkSound() {
  const [value, setValue] = useState();
  useEffect(() => {
    if (value % 2 === 0) {
      playWalkSound()
    }
    setValue(value + 1)
  }, [value]);
} */
