import "./physics.js";
import "./motion.js";
import { spawnCoin, shakeCoins } from "./physics.js";

const piggy = document.getElementById("piggy");
const coinSound = document.getElementById("coinSound");
const achievementSound = document.getElementById("achievementSound");

export let cents = Number(localStorage.getItem("cents")) || 0;
let daily = Number(localStorage.getItem("daily")) || 0;
let currency = localStorage.getItem("currency") || "USD";

const DAILY_GOAL = 5000;

export const currencies = {
  USD: { symbol: "$", rate: 1 },
  ILS: { symbol: "₪", rate: 3.6 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.78 },
  AUD: { symbol: "A$", rate: 1.5 }
};

const buttons = [10,50,100,200,500,1000,2000,5000,10000];
const achievements = [1000,5000,10000,50000,100000,500000,1000000];
let unlocked = JSON.parse(localStorage.getItem("ach")) || [];

const grid = document.getElementById("buttons");
buttons.forEach(v=>{
  const b=document.createElement("button");
  b.textContent="+"+(v/100);
  b.onclick=()=>add(v);
  grid.appendChild(b);
});

function add(v){
  cents+=v;
  daily+=v;
  spawnCoin();
  feedback();
  checkAchievements();
  save();
  update();
}

function feedback(){
  coinSound.currentTime=0;
  coinSound.play();
  piggy.classList.remove("shake");
  void piggy.offsetWidth;
  piggy.classList.add("shake");
}

function update(){
  document.getElementById("display").innerText =
    currencies[currency].symbol + ((cents/100)*currencies[currency].rate).toFixed(2);

  document.getElementById("dailyBar").style.width =
    Math.min((daily/DAILY_GOAL)*100,100)+"%";
}

function checkAchievements(){
  const list=document.getElementById("achievementList");
  list.innerHTML="";
  achievements.forEach(a=>{
    if(cents>=a && !unlocked.includes(a)){
      unlocked.push(a);
      achievementSound.play();
    }
    const li=document.createElement("li");
    li.textContent=(a/100)+" saved";
    if(unlocked.includes(a)) li.style.color="lime";
    list.appendChild(li);
  });
}

function save(){
  localStorage.setItem("cents",cents);
  localStorage.setItem("daily",daily);
  localStorage.setItem("currency",currency);
  localStorage.setItem("ach",JSON.stringify(unlocked));
}

update();

window.showScreen=(id)=>{
  document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
};

window.resetAll=()=>{
  localStorage.clear();
  location.reload();
};

const sel=document.getElementById("currencySelect");
Object.keys(currencies).forEach(c=>{
  const o=document.createElement("option");
  o.value=c;
  o.textContent=c;
  sel.appendChild(o);
});
sel.value=currency;
sel.onchange=()=>{currency=sel.value;save();update();};
