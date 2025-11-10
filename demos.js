function particleDemo(){
  /*Arguments: x,y,number,dMin,dMax,vMin,vMax,speedRatioMin,speedRatioMax,sizeRatioMin,sizeRatioMax,r,g,b,lifespanMin,lifespanMax*/
  
  var state=false
  
  if((state && mouseClick)||(!state&&mouseIsPressed)){
     // particleShower(mouseX, mouseY, 50, 10, 13, 1, 2, 0.99, 0.995, 0.6, 0.67, 255,0,0, 200);
    particleShower(mouseX, mouseY, //position
                   250, //Number of Particles
                   10, 23, //Minimum and maximum size of particle
                   0, 10, //Minimum and maximum starting velocity
                   0.9, 0.99, //Min and max velocity ratio (how much it slows down/speeds up)
                   0.85, 0.87, //Min and max size ratio (how much it shrinks/expands over time)
                   "random","random","random", //Color (rgb)
                   // 255,0,0, //Color (rgb)
                   10,20 //Min and max lifespan (how long it stays)
                  )
    //particleShower(mouseX, mouseY, 50, 10, 23, 7, 10, 0.9, 0.99, 0.85, 0.87, "random","random","random", 10,20) //Original
  }
    
}

// Hey guys it's the anonymous user
// by the way your password is really bad someone's going to hack into our account