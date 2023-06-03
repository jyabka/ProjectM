import React, {useRef} from "react";
import walkSound from '../assets/sounds/sfx/Step.mp3';
import fightSound from '../assets/sounds/sfx/FightSound.mp3';
import openPotion from '../assets/sounds/sfx/OpenPotion.mp3';
import drinkPotion from '../assets/sounds/sfx/DrinkPotion.mp3';
import backMusic from '../assets/sounds/background/Leaving-For-Valhalla(AlexanderNakarada).mp3';

const playWalkSound = () => {
  new Audio(walkSound).play();
}

export const playFightSound = () => {
  new Audio(fightSound).play();
}
export const playHealSound = () => {
  new Audio(openPotion).play();
  setTimeout(() => {
    new Audio(drinkPotion).play();
  }, 100);
}

function TimeOut () {
  const SoundTimeout = useRef(null);
  return SoundTimeout
}

export const playWalkSoundWD = () => {
  clearTimeout(TimeOut.current);
  TimeOut.current = setTimeout(() => {
    playWalkSound();
  }, 100);
};

export const playBackgroundMusic = () => {
  new Audio(backMusic).play();
}
