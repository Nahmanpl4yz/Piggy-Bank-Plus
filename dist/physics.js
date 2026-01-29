const { Engine, Render, World, Bodies, Body, Composite } = Matter;

export const engine = Engine.create();
const world = engine.world;

const canvas=document.getElementById("coins");

Render.create({
  canvas, engine,
  options:{width:innerWidth,height:innerHeight,background:"transparent"}
});

World.add(world,[
  Bodies.rectangle(innerWidth/2,innerHeight+50,innerWidth,100,{isStatic:true}),
  Bodies.rectangle(-50,innerHeight/2,100,innerHeight,{isStatic:true}),
  Bodies.rectangle(innerWidth+50,innerHeight/2,100,innerHeight,{isStatic:true})
]);

export function spawnCoin(){
  World.add(world,Bodies.circle(innerWidth/2,0,10,{restitution:0.9}));
}

export function shakeCoins(){
  Composite.allBodies(world).forEach(b=>{
    if(!b.isStatic){
      Body.applyForce(b,b.position,{
        x:(Math.random()-0.5)*0.08,
        y:-0.08
      });
    }
  });
}

Engine.run(engine);
