import { Motion } from "@capacitor/motion";
import { shakeCoins } from "./physics.js";

let last=0;

Motion.addListener("accel",e=>{
  const s=Math.abs(e.acceleration.x||0)+
          Math.abs(e.acceleration.y||0)+
          Math.abs(e.acceleration.z||0);
  const now=Date.now();
  if(s>18 && now-last>400){
    last=now;
    shakeCoins();
  }
});
