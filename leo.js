var leoScreen = 0; // Start at screen 0
var stop = true;
var lysis = false;
var oxydation = false;
var link = false;
var click;
var leoBtn1;
var leoBtn2;
var leoBtn3;
var phosphorylated = false;
var phospho = 0;
var nadhmove1 = false;
var nadhmove2 = false;
var ms = 80;
var ms2 = 80;
var pyr = true;
var utimer = 0;
var linkdelay = 0;
var pdescription = 
    "Phosphorylation is the first step in glycolysis, where two ATP "+
    "molecules phosphorylize a glucose molecules by donating it one "+
    "phosphate group each, turning the glucose molecule into a "+
    "glucose-6-phosphate, and the two ATP molecules into ADP. This "+
    "is also known as the energy investment phase";
var linkdes = 
    "The Link Reaction is the step connecting Glycolysis to the Krebs cycle. It "+
    "happens in the mitochondria, the background on the screen, where each "+
    "pyruvate from glycolysis is oxidized, turning into an acetyl group, "+
    "releasing CO2 and reducing NAD+ to NADH. The acetyl group is now attached "+
    "to the coenzyme CoA, forming Acetyl CoA, which will go to Krebs Cycle. ";
var timeRan = 0;
var timeRin = 0;
var timeRen = 0;
var phosphoTimer = 0;  
var mdelay = 0;
var phosphoDelay = 60; 
var odes =
    "The final stage of glycolysis, oxidation, also known as the payoff phase, is "+
    "where G3P gets oxidized, turning into pyruvate. G3P then gets further oxidized, "+
    "reducing the electron carrier NAD+ and turning it into NADH, which will carry "+       
    "electrons to the ETC. In this process, four phosphate groups get released to "+
    "four ADP, turning them into four ATP, making a net gain of two ATP, and a "+
    "byproduct of two water molecules.";
var transition = 0;
var pdes2 = 
    "This is where the two ATP transfer "+
    "a phosphate group each to the "+
    "glucose molecule";
var ldes = 
    "The second step of glycolysis is lysis, where glucose is broken "+
    "down into two glyceraldehyde-3-phosphates, G3P. The two ADP "+
    "molecules left disperse and leave the system. ";
var pshower = 0;
var ldes2 = 
    "Here is where the ATP molecules disperse, and G3P remains";

var leoButton; // Global button variable
var leoButton2;
var leoButton3;
var nextClicked = false; // Track next button clicks

function leoSetup(){
  
  if (leoScreen == 0){
    // Glucose
    objects[objects.length] = new object(
      "Glucose",
      100, //x
      380, //y
      120, //length
      120, //height
      false, //draggable
      [255, 0, 0], //color
      true, //working
      0 //existing
    );

    // ATP 1
    objects[objects.length] = new object("ATP", 600, 420, 140, 120, false, [], true, 0);

    // ATP 2
    objects[objects.length] = new object("ATP", 650, 320, 140, 120, false, [], true, 0);

    // ADP 
    objects[objects.length] = new object("ADP",-100, -100, 140, 120, false, [], true, 0);
    objects[objects.length] = new object("ADP",-100, -100, 140, 120, false, [], true, 0);

    // Phosphate groups
    objects[objects.length] = new object("Phosphate group", -100, -100, 60, 60, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Phosphate group", -100, -100, 60, 60, false, [0, 255, 0], true, 0);

    // G3P
    objects[objects.length] = new object("G3P", -100, -100, 140, 120, false, [], true, 0);
    
    leoButton = createButton("Phosphorylation");
    leoButton.position(20, 20);
    leoButton.mousePressed(startPhosphorylation); 
    leoButton.style("font-size", "24px");
    leoButton.style("padding","15px");
    leoButton.style("border-radius", "10px");
    leoButton.style("cursor", "pointer");
  }
  else if (leoScreen == 1){
    // Glucose
    objects[objects.length] = new object("Glucose", 230, 380, 110, 110, false, [255, 0, 0], true, 0);
    
    // ADP 
    objects[objects.length] = new object("ADP", 160, 380, 150, 130, false, [], true, 0);
    objects[objects.length] = new object("ADP", 330, 380, 150, 130, false, [], true, 0);
    
    // Phosphate groups
    objects[objects.length] = new object("Phosphate group", 210, 335, 50, 50, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Phosphate group", 250, 335, 50, 50, false, [0, 255, 0], true, 0);
    
    // G3P
    objects[objects.length] = new object("G3P", -100, -100, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("G3P", -100, -100, 140, 130, false, [0, 255, 0], true, 0);
    
    leoButton2 = createButton("Lysis");
    leoButton2.position(20, 20);
    leoButton2.mousePressed(startLysis); 
    leoButton2.style("font-size", "24px");
    leoButton2.style("padding","15px");
    leoButton2.style("border-radius", "10px");
    leoButton2.style("cursor", "pointer");
  }
  else if (leoScreen == 2){
    // G3P
    objects[objects.length] = new object("G3P", 170, 390, 150, 140, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("G3P", 350, 390, 150, 140, false, [0, 255, 0], true, 0);
    
    // NAD+
    objects[objects.length] = new object("NAD+", -570, 390, 100, 100, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("NAD+", -400, 390, 100, 100, false, [0, 255, 0], true, 0);
    
     // Phosphate group
    objects[objects.length] = new object("Phosphate group", 220, 390, 50, 50, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Phosphate group", -100, -100, 50, 50, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Phosphate group", 400, 390, 50, 50, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Phosphate group", -100, -100, 50, 50, false, [0, 255, 0], true, 0);
    
    //ADP
    objects[objects.length] = new object("ADP", -270, 265, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("ADP", -100, 265, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("ADP", -270, 520, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("ADP", -100, 520, 140, 130, false, [0, 255, 0], true, 0);
    
    //Pyruvate
    objects[objects.length] = new object("Pyruvate", -100, 520, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Pyruvate", -100, 520, 140, 130, false, [0, 255, 0], true, 0);
    
    //Hydrogen ions
    objects[objects.length] = new object("H", 175, 345, 45, 45, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("H", 355, 345, 45, 45, false, [0, 255, 0], true, 0);
    
    //Electrons
    objects[objects.length] = new object("Electron", 175, 345, 45, 45, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Electron", 355, 345, 45, 45, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Electron", 135, 345, 45, 45, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Electron", 315, 345, 45, 45, false, [0, 255, 0], true, 0);
    
    //NADH
    objects[objects.length] = new object("NADH", -100, 390, 100, 100, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("NADH", -100, 390, 100, 100, false, [0, 255, 0], true, 0);
    
    //ATP
    objects[objects.length] = new object("Atp", -100, -100, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Atp", -100, -100, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Atp", -100, -100, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Atp", -100, -100, 140, 130, true, [0, 255, 0], true, 0);
    
    //H2O
    objects[objects.length] = new object("H2O", -100, -100, 100, 100, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("H2O", -100, -100, 100, 100, false, [0, 255, 0], true, 0);
     
    leoButton2 = createButton("Oxidation");
    leoButton2.position(20, 20);
    leoButton2.mousePressed(startOxydation); 
    leoButton2.style("font-size", "24px");
    leoButton2.style("padding","15px");
    leoButton2.style("border-radius", "10px");
    leoButton2.style("cursor", "pointer");
  }
  else if (leoScreen == 3){
    //Pyruvate
    objects[objects.length] = new object("Pyruvate", -100, 520, 140, 130, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Pyruvate", -100, 520, 140, 130, false, [173, 216, 230], true, 0);
    
    // NAD+
    objects[objects.length] = new object("NAD+", -570, 500, 100, 100, false, [173, 216, 230], true, 0);
    objects[objects.length] = new object("NAD+", -400, 500, 100, 100, false, [173, 216, 230], true, 0);
    
    //Electrons
    objects[objects.length] = new object("Electron", -100, 345, 45, 45, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Electron", -100, 345, 45, 45, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Electron", -100, 345, 45, 45, false, [0, 255, 0], true, 0);
    objects[objects.length] = new object("Electron", -100, 345, 45, 45, false, [0, 255, 0], true, 0);
    
    //NADH
    objects[objects.length] = new object("NADH", -100, 390, 100, 100, false, [173, 216, 230], true, 0);
    objects[objects.length] = new object("NADH", -100, 390, 100, 100, false, [173, 216, 230], true, 0);
    
    //CO2
    objects[objects.length] = new object("CO2", 180, 400, 100, 100, false, [0, 255, 0], false, 0);
    objects[objects.length] = new object("CO2", 360, 400, 100, 100, false, [0, 255, 0], false, 0);
    
    //Acetyl CoA
    objects[objects.length] = new object("Acetyl CoA", 160, 390, 130, 140, false, [0, 255, 0], false, 0);
    objects[objects.length] = new object("Acetyl CoA", 340, 390, 130, 140, false, [0, 255, 0], false, 0);

    leoButton3 = createButton("Link Reaction");
    leoButton3.position(20, 20);
    leoButton3.mousePressed(startLink); 
    leoButton3.style("font-size", "24px");
    leoButton3.style("padding","15px");
    leoButton3.style("border-radius", "10px");
    leoButton3.style("cursor", "pointer");
  }
}

function startPhosphorylation(){
  phosphorylated = true;
}

function startLysis(){
  lysis = true;
}

function startOxydation(){
  oxydation = true;
}

function startLink(){
  link = true;
}

function leo(){
  if (leoScreen == 0){
    leoScreen0();
  }
  else if (leoScreen == 1){
    leoScreen1();
  }
  else if (leoScreen == 2){
    leoScreen2();
  }
  else if (leoScreen == 3){
    leoScreen3();
  }
}

function leoScreen0(){
  background(150, 213, 255);
  var glucose = objects[0];
  var atp1 = objects[1];
  var atp2 = objects[2];
  var phosphate1 = objects[6];
  var phosphate2 = objects[5];
  
  fill(0);               
  textSize(22);
  text(pdescription, 260, 30, 530);

  if (phosphorylated){
    let d1 = dist(atp1.x, atp1.y, glucose.x, glucose.y);
    let d2 = dist(atp2.x, atp2.y, glucose.x, glucose.y);

    // Move ATPs toward glucose
    if (d1 > 80){
      atp1.x += (glucose.x - atp1.x) * 0.05;
      atp1.y += (glucose.y - atp1.y) * 0.05;
    } 
    else{
      glucose.x = atp1.x + 70;
    }

    if (d2 > 90){
      atp2.x += (glucose.x - atp2.x) * 0.05;
      atp2.y += (glucose.y - atp2.y) * 0.05;
    } 
    else{
      atp2.x = glucose.x + 75;
      atp2.y = glucose.y + 2;
    }

    if (d1 <= 90 && d2 <= 90 && phospho == 0){
      phospho = 1;      
      phosphoTimer = 0; 
    }

    if (phospho == 1){
      phosphoTimer++;
      if (phosphoTimer >= phosphoDelay){
        objects[1] = new object("ADP", atp1.x, atp1.y, 120, 100, true, [], true, 0);
        objects[2] = new object("ADP", atp2.x, atp2.y, 120, 100, true, [], true, 0);
        objects[6].x = glucose.x - 20; 
        objects[6].y = glucose.y - 80;
        objects[5].x = glucose.x + 20;
        objects[5].y = glucose.y - 80;
        textSize(22);
        text(pdes2, 360, 280, 400);
        
        // Add "Next" button when animation completes - bottom right with margin
        push();
        fill("white");
        stroke("black");
        strokeWeight(3);
        rectMode(CORNER);
        rect(width - 170, height - 80, 150, 60, 10);
        fill("black");
        noStroke();
        textSize(36);
        textAlign(CENTER, CENTER);
        text("Next", width - 95, height - 50);
        pop();
        
        // Check for click on Next button
        if (mouseIsPressed && mouseX > width - 170 && mouseX < width - 20 && mouseY > height - 80 && mouseY < height - 20 && !nextClicked){
          nextClicked = true;
          advanceScreen();
        }
      }
    }
  }
}

function leoScreen1(){
  background(150, 213, 255);
  var glucose = objects[0];
  var adp1 = objects[1];
  var adp2 = objects[2];
  var phosphate1 = objects[3];
  var phosphate2 = objects[4];
  var g3p = objects[5];
  var g3p2 = objects[6];
  
  if (lysis == true){
    adp1.x--;
    adp2.x = adp2.x + 5;
    fill(0);
    text(ldes2, 320, 320, 460);
    glucose.x = -100;
    phosphate1.x = -100;
    phosphate2.x = -100;
    g3p.x = 210;
    g3p.y = 340;
    g3p2.x = 210;
    g3p2.y = 400;
    pshower = 1;
  }
  fill(0);               
  textSize(22);
  text(ldes, 220, 30, 530);
  
  if (pshower == 1){
    if(timeRan < 20){
      timeRan += 1;
      particleShower(g3p.x, g3p.y, 500, 0, 40, 0, 0.6, 0, 2, 0, 20, 0, 255, 0, 0, 20);
    }
    else {
      // Add "Next" button when animation completes - bottom right with margin
      push();
      fill("white");
      stroke("black");
      strokeWeight(3);
      rectMode(CORNER);
      rect(width - 170, height - 80, 150, 60, 10);
      fill("black");
      noStroke();
      textSize(36);
      textAlign(CENTER, CENTER);
      text("Next", width - 95, height - 50);
      pop();
      
      // Check for click on Next button
      if (mouseIsPressed && mouseX > width - 170 && mouseX < width - 20 && mouseY > height - 80 && mouseY < height - 20 && !nextClicked){
        nextClicked = true;
        advanceScreen();
      }
    }
  }
}

function leoScreen2(){
  background(150, 213, 255);
  var g3p1 = objects[0];
  var g3p2 = objects[1];
  var nad1 = objects[2];
  var nad2 = objects[3];
  var phosphate1 = objects[4];
  var phosphate2 = objects[5];
  var phosphate3 = objects[6];
  var phosphate4 = objects[7];
  var adp1 = objects[8];
  var adp2 = objects[9];
  var adp3 = objects[10];
  var adp4 = objects[11];
  var pyruvate1 = objects[12];
  var pyruvate2 = objects[13];
  var h1 = objects[14];
  var h2 = objects[15];
  var electron1 = objects[16];
  var electron2 = objects[17];
  var electron3 = objects[18];
  var electron4 = objects[19];
  var nadh1 = objects[20];
  var nadh2 = objects[21];
  var atp1 = objects[22];
  var atp2 = objects[23];
  var atp3 = objects[24];
  var atp4 = objects[25];
  var h2o1 = objects[26];
  var h2o2 = objects[27];
  
  textSize(19);
  push();
  fill("black");
  text(odes, 200, 25, 525);
  pop();
  
  if (oxydation){
    let d3 = dist(phosphate1.x, phosphate1.y, adp1.x, adp1.y);
    let d4 = dist(phosphate2.x, phosphate2.y, adp2.x, adp2.y);
    let d5 = dist(phosphate3.x, phosphate3.y, adp3.x, adp3.y);
    let d6 = dist(phosphate4.x, phosphate4.y, adp4.x, adp4.y);
    let d7 = dist(electron1.x, electron1.y, nad1.x, nad1.y);
    let d8 = dist(electron2.x, electron2.y, nad2.x, nad2.y);
    let d9 = dist(electron3.x, electron3.y, nad1.x, nad1.y);
    let d10 = dist(electron4.x, electron4.y, nad2.x, nad2.y);
    let d11 = dist(h1.x, h1.y, nad2.x, nad2.y);
    
    if (adp1.x < 500){
      adp1.x += 3;
      adp2.x += 3;
      adp3.x += 3;
      adp4.x += 3;
    }
    if (adp1.x > 500){
      if (nad1.x < 500){
        nad1.x += 3;
        nad2.x += 3;
      }
      else{
        electron1.x += (nad1.x - electron1.x) * 0.05;
        electron1.y += (nad1.y - electron1.y) * 0.05;
        electron2.x += (nad2.x - electron2.x) * 0.05;
        electron2.y += (nad2.y - electron2.y) * 0.05;
        electron3.x += (nad1.x - electron3.x) * 0.05;
        electron3.y += (nad1.y - electron3.y) * 0.05;
        electron4.x += (nad2.x - electron4.x) * 0.05;
        electron4.y += (nad2.y - electron4.y) * 0.05;
        if (d8 < 180){
          h1.x += (nad1.x - h1.x) * 0.05;
          h1.y += (nad1.y - h1.y) * 0.05;
          h2.x += (nad2.x - h2.x) * 0.05;
          h2.y += (nad2.y - h2.y) * 0.05;
          if (d11 < 180){
            nad1.x = 7000;
            nad2.x = 7000;
            nadh1.x = 500;
            nadh2.x = 680;
            g3p1.x = -100;
            g3p2.x = -100;
            pyruvate1.x = 160;
            pyruvate1.y = 380;
            pyruvate2.x = 340;
            pyruvate2.y = 380;
            h2o1.x = 160;
            h2o1.y = 510;
            h2o2.x = 340;
            h2o2.y = 510;
          }
        }
      }
      pyr = false;
      phosphate1.x += (adp1.x - phosphate1.x) * 0.05;
      phosphate1.y += (adp1.y - phosphate1.y) * 0.05;
      phosphate2.x += (adp2.x - phosphate2.x) * 0.05;
      phosphate2.y += (adp2.y - phosphate2.y) * 0.05;
      phosphate3.x += (adp3.x - phosphate3.x) * 0.05;
      phosphate3.y += (adp3.y - phosphate3.y) * 0.05;
      phosphate4.x += (adp4.x - phosphate4.x) * 0.05;
      phosphate4.y += (adp4.y - phosphate4.y) * 0.05;
      if (d3 < 180 && d4 < 180 && d5 < 180 && d6 < 180){
        adp1.x = 7000;
        adp2.x = 7000;
        adp3.x = 7000;
        adp4.x = 7000;
        atp1.x = 500;
        atp1.y = 265;
        atp2.x = 670;
        atp2.y = 265;
        atp3.x = 500;
        atp3.y = 520;
        atp4.x = 670;
        atp4.y = 520;
      }
    }
  }
  
  // Show Next button when animation is complete (all ATPs formed)
  if (atp1.x == 500){
    push();
    fill("white");
    stroke("black");
    strokeWeight(3);
    rectMode(CORNER);
    rect(width - 170, height - 80, 150, 60, 10);
    fill("black");
    noStroke();
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Next", width - 95, height - 50);
    pop();
    
    // Check for click on Next button
    if (mouseIsPressed && mouseX > width - 170 && mouseX < width - 20 && mouseY > height - 80 && mouseY < height - 20 && !nextClicked){
      nextClicked = true;
      advanceScreen();
    }
  }
}

function leoScreen3(){
  background(255, 213, 128);
  imageMode(CENTER);
  var pyruvate1 = objects[0];
  var pyruvate2 = objects[1];
  var nad1 = objects[2];
  var nad2 = objects[3];
  var electron1 = objects[4];
  var electron2 = objects[5];
  var electron3 = objects[6];
  var electron4 = objects[7];
  var nadh1 = objects[8];
  var nadh2 = objects[9];
  var co21 = objects[10];
  var co22 = objects[11];
  var acetyl1 = objects[12];
  var acetyl2 = objects[13];
  
  image(Mitochondria, 370, 290, ms, ms2);
  mdelay += 1;
  
  if (mdelay > 100 && mdelay < 180){
    ms *= 1.1;   
    ms2 *= 1.1;
  }
  
  if (mdelay > 190){
    textSize(22);
    text(linkdes, 223, 25, 545);
    let d12 = dist(nad1.x, nad1.y, pyruvate2.x, pyruvate2.y);
    let d13 = dist(nad2.x, nad2.y, pyruvate1.x, pyruvate1.y);
    
    if (link == true){
      pyruvate1.x = 160;
      pyruvate1.y = 390;
      pyruvate2.x = 340;
      pyruvate2.y = 390;
      electron1.x = 175;
      electron1.y = 320;
      electron2.x = 355;
      electron2.y = 320;
      electron3.x = 135;
      electron3.y = 320;
      electron4.x = 315;
      electron4.y = 320;
      
      if (nad1.x < 500 && stop == true){
        nad1.x += 4;
        nad2.x += 4;
      }
      else{
        stop = false;
        objects[2].draggable = true;
        objects[3].draggable = true;
        
        if (stop == false){
          if (d12 < 70){
            objects[5].working = false;
            objects[7].working = false;
            objects[11].working = true;
            nadh1.x = nad1.x;
            nadh1.y = nad1.y;
            nad1.x = -1000; // Move NAD+ off screen
            objects[2].working = false; // Make NAD+ disappear
            nadhmove1 = true;
            objects[2].draggable = false;
            pshower = 2;
            if (pshower == 2){
              if(timeRin < 20){
                timeRin += 1;
                particleShower(pyruvate2.x, pyruvate2.y, 500, 0, 40, 0, 0.3, 0, 2, 0, 20, 80, 180, 240, 0, 20);
                objects[1].working = false;
                objects[13].working = true;
              }  
            }  
          }
          if (d13 < 70){
            objects[4].working = false;
            objects[6].working = false;
            objects[10].working = true;
            nadh2.x = nad2.x;
            nadh2.y = nad2.y;
            nad2.x = -1000; // Move NAD+ off screen
            objects[3].working = false; // Make NAD+ disappear
            nadhmove2 = true;
            objects[3].draggable = false;
            pshower = 3;
            if (pshower == 3){
              if(timeRen < 20){
                timeRen += 1;
                particleShower(pyruvate1.x, pyruvate1.y, 500, 0, 40, 0, 0.3, 0, 2, 0, 20, 80, 180, 240, 0, 20); 
                objects[0].working = false;
                objects[12].working = true;
              }  
            } 
          }
          if (nadhmove2 == true && nadhmove1 == true){
            co21.x += 2;
            co21.y += 1;
            co22.x += 2;
            co22.y += 1;
            nadh1.x += 3;
            nadh2.x += 3;
            nadh1.y -= 1;
            nadh2.y -= 1;
            objects[1].working = false;
            objects[0].working = false;
            objects[12].working = true;
          }
        }
        if (d13 > 300){
          textSize(16);
          text("*drag an NAD+ to a Pyruvate molecule, drag the second NAD+ to the second Pyruvate molecule*", 40, 120, 150);
        } 
      }
    }
  }
  
  // Show nextButton() when both reactions are done and NADH is off screen
  if (nadhmove2 == true && nadhmove1 == true && nadh1.x > 600){
    nextButton();
    if (nextBtn.clicked){
      advanceScreen();
    }
  }
}

function advanceScreen(){
  // Advance to next screen
  leoScreen++;
  
  // Reset state variables for new screen
  phosphorylated = false;
  lysis = false;
  oxydation = false;
  link = false;
  phospho = 0;
  phosphoTimer = 0;
  timeRan = 0;
  timeRin = 0;
  timeRen = 0;
  pshower = 0;
  nadhmove1 = false;
  nadhmove2 = false;
  stop = true;
  ms = 80;
  ms2 = 80;
  mdelay = 0;
  nextClicked = false; // Reset next button click state
  
  // Clear objects and remove old button
  objects = [];
  if (leoButton) leoButton.remove();
  if (leoButton2) leoButton2.remove();
  if (leoButton3) leoButton3.remove();
  
  // Setup new screen
  leoSetup();
}

function mouseClicked(){
  // This handles clicking through screens when Next button appears
}