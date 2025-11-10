let zoeIntro;
let zoeSceneIAmInevitable = 1;
let zoeCollisionA;
let zoeCollisionB;
let zoeCollisionC;
let zoeTextboxes = [];
let poop = false;
let usedH

class zoeTextBox {
  constructor(lines, requiredAction) {
    this.lines = lines;
    this.currentIndex = 0;
    this.visible = true;
    this.requiredAction = requiredAction;
  }

  draw() {
    if (this.visible == true) {
     // console.log(this.lines + " is drawing")
      fill(0, 0, 0, 50);
      stroke(255, 255, 255);
      rect(10, 10, 780, 125, 10);

      textSize(20);
      fill(255, 255, 255);
      text(this.lines[this.currentIndex], 20, 30);
      noStroke();
    }
  }

  nextLine() {
    if (this.currentIndex < this.lines.length - 1) {
      this.currentIndex++;
    } else {
      this.visible = false;
      zoeSceneIAmInevitable += 1;
      console.log("Scene: " + zoeSceneIAmInevitable);
    }
  }

  keyPressed() {
    console.log("A key was pressed. Which one was it?????");
    console.log("requried: " + this.requiredAction + " for " + this.lines)
    if (this.requiredAction == "space" && key == " ") {
      console.log("space key pressed!");
      this.nextLine();
    }
  }
}

function zoeSetup() {
  // Draw the phospholipids
  for (let i = 0; i < 800; i += 40) {
    console.log("phospholipids drawn");
    objects[objects.length] = new object(
      "phospholipid",
      i,
      400,
      40,
      80,
      false,
      [0, 0, 0],
      true
    );
  }

  // The second row needs to be flipped
  
  for (i = 0; i < 800; i += 40) {
    console.log("phospholipids drawn");
    objects[objects.length] = new object(
      "phospholipid",
      i,
      500,
      40,
      80,
      false,
      [0, 0, 0],
      true,180
    );
  }

  imageMode(CORNER)
  
  // Draw photosystems

  objects[objects.length] = new object(
    "PSII",
    100,
    450,
    150,
    200,
    false,
    [0, 255, 0],
    true
  );

  objects[objects.length] = new object(
    "PSI",
    500,
    450,
    150,
    200,
    false,
    [0, 255, 0],
    true
  );

  // Draw protein complexes

  objects[objects.length] = new object(
    "Channel Protein",
    300,
    450,
    100,
    200,
    false,
    [255, 0, 255],
    true
  );
  objects[objects.length] = new object(
    "ETC1",
    180,
    400,
    50,
    50,
    false,
    [76, 150, 224],
    true
  );
  objects[objects.length] = new object(
    "ETC2",
    360,
    500,
    50,
    50,
    false,
    [76, 150, 224],
    true
  );
  objects[objects.length] = new object(
    "ETC3",
    600,
    400,
    50,
    50,
    false,
    [76, 150, 224],
    true
  );

  // ATP synthase

  zoeATPSynthase1 = new object(
    "ATPSynthase1",
    725,
    425,
    150,
    300,
    false,
    [255, 0, 255],
    true
  );
  objects.push(zoeATPSynthase1)
  
  zoeATPSynthase2 = new object(
    "ATPSynthase2",
    725,
    425,
    150,
    300,
    false,
    [255, 0, 255],
    false
  );
  objects.push(zoeATPSynthase2)

  // ATP + ADP
  
  zoeATP = new object("ATP",700,275,100,75,false,[0,255,255],false)
  objects.push(zoeATP)
  
  zoeADP = new object("ADP",700,275,100,75,false,[0,255,255],false)
  objects.push(zoeADP)
  
  // Phosphate group
  
  zoePhosphate = new object("Phosphate group",750,275,30,30,false,[0,255,0],false)
  objects.push(zoePhosphate)
  
  // H+ ions

  zoeH = new object("H", 100, 150, 30, 30, false, [255, 0, 0], true);
  objects.push(zoeH);

  zoeHFromWater = new object("H", 60, 550, 30, 30, false, [255, 0, 0], false);
  zoeHFromWater1 = new object("H", 90, 550, 30, 30, false, [255, 0, 0], false);
  objects.push(zoeHFromWater);
  objects.push(zoeHFromWater1);

//   zoeH1Dint = new object("H", 250, 750, 30, 30, false, [255, 0, 0], true);
//   zoeH2Dint = new object("H", 390, 740, 30, 30, false, [255, 0, 0], true);
//   zoeH3Dint = new object("H", 745, 780, 30, 30, false, [255, 0, 0], true);
  
//   objects.push(zoeH1Dint)
//   objects.push(zoeH2Dint)
//   objects.push(zoeH3Dint)
  
  // Draw Photons
  zoePhotonDint = new object(
    "photon",
    35,
    140,
    30,
    30,
    true,
    [255, 255, 0],
    false
  );
  objects.push(zoePhotonDint);

  // Chlorophyll

  zoeChlorophyll = new object(
    "chlorophyll",
    90,
    430,
    50,
    50,
    false,
    [0, 255, 0],
    true
  );
  objects.push(zoeChlorophyll);
  
  objects[objects.length] = new object(
    "chlorophyll",
    500,
    430,
    50,
    50,
    false,
    [0, 255, 0],
    true
  );

  //Unexcited Electron
  zoeElectron = new object(
    "electron",
    75,
    400,
    30,
    30,
    false,
    [0, 0, 255],
    true
  );
  objects.push(zoeElectron);

  zoeElectron2 = new object(
    "electron",
    130,
    550,
    30,
    30,
    false,
    [0, 0, 255],
    false
  );
  objects.push(zoeElectron2);

  // Excited Electron

  zoeExcitedElectron = new object(
    "excited electron",
    75,
    400,
    30,
    30,
    true,
    [0, 0, 255],
    false
  );
  objects.push(zoeExcitedElectron);

  // Water

  zoeWater = new object("H2O", 20, 750, 50, 50, true, [156, 229, 255], false);
  objects.push(zoeWater);

  // Oxygen

  zoeOxygen = new object("O2", 60, 575, 50, 50, false, [208, 230, 238], false);
  objects.push(zoeOxygen);
  
  // NADP+ and NADPH
  
  zoeNADPPlus = new object("NADP+",530,316,100,75,false,[0,255,255], false);
  zoeNADPH = new object("NADPH", 530,316,100,75,false,[0,255,255], false)
  objects.push(zoeNADPPlus)
  objects.push(zoeNADPH)

  // ==================================== LOAD TEXTBOXES ====================================

  zoeIntro = new zoeTextBox(
    [
      "This is the first stage of photosynthesis, the light dependent reactions! (Space to continue)",
      "In the light dependent reactions, photons from the sunlight energy are taken in by organelles\n in the plant's cells called chloroplasts.",
      " The reactants, or inputs, of the reaction is sunlight and water (H2O), and the products, or \noutputs, of the reaction are oxygen in the form of O2, NADPH, which is a primary electron \nacceptor or electron carrier, and ATP, an energy currency for the plant.",
      "This is the thylakoid membrane. In chloroplasts, there are stacks of disk-shaped things called \nthylakoids. These stacks are called grana. Each thylakoid has a membrane covering it. This is\n the side view of the thylakoid membrane.",
      "Photons from the sun come and hit the photosystems, which excites electrons. Those electrons\n then go through an electron transport chain, using energy to pump hydrogen ions against their\n gradient. After that, the electrons go in NADP+ with H+, which makes NADPH. The H+ ions \ngo through the ATP synthase, which rotates and uses that energy to make ATP.",
    ],
    "space"
  );
  zoeTextboxes.push(zoeIntro);

  zoeInstructions1 = new zoeTextBox(
    [
      "First, the energy from the sun shoots into photosystem II. (Drag the photon)",
    ],
    "Photon collides with PSII"
  );
  zoeTextboxes.push(zoeInstructions1);

  zoeInstructions2 = new zoeTextBox(
    [
      "Then, the light energy from the photon excites an electron from a chlorophyll molecule called \nP680, a green pigment inside the photosystem. (Space to continue)",
      "When the electron in the chlorophyll gets excited, it jumps up a level in the chlorophyll\n molecule.",
      "Usually, the electron would go back to its original state and release the energy gained, but\n in the thylakoid membrane, there is a series of proteins that carry the electron in a system \ncalled an electron transport chain.",
    ],
    "space"
  );
  zoeTextboxes.push(zoeInstructions2);

  zoeInstructions3 = new zoeTextBox(
    [
      "The electrons go from the chlorophyll molecule through a series of complex proteins that carry\n the electron and pump Hydrogen ions. (Drag the electron through the protein complexes!)",
    ],
    "electron collides with protein"
  );
  zoeTextboxes.push(zoeInstructions3);

  zoeInstructions4 = new zoeTextBox([
    "The energy from the excited electron gets used to pump H+ into the lumen against its \nelectrochemical gradient, or the H+ ions are going from a low concentration to a high\n concentration of both particles and charge. (Drag the H+ ion)",
    "H+ collides with lumen",
  ]);
  zoeTextboxes.push(zoeInstructions4);

  zoeInstructions5 = new zoeTextBox(
    [
      "Water(H2O) then comes in from the roots of the plants and travels to the leaves using a xylem\n inside the plant's stem. The water goes to PSII. (Drag the water molecule)",
    ],
    "Water collides with PSII"
  );
  zoeTextboxes.push(zoeInstructions5);

  zoeInstructions6 = new zoeTextBox(
    [
      "The water gets split by a water-splitting section in the photosystem into one electron, one \noxygen, and 2 hydrogens. (Space to continue)",
    ],
    "space"
  );
  zoeTextboxes.push(zoeInstructions6);

  zoeInstructions7 = new zoeTextBox(
    ["The H+ ions add to the concentration of H+ ions inside the lumen. (Space to continue)"],
    "space"
  );
  zoeTextboxes.push(zoeInstructions7);

  zoeInstructions8 = new zoeTextBox(
    [
      "The oxygen molecule bonds with another oxygen molecule (once this cycle has happened\n twice) and leaves the plant through pores in the plant's leaves called stomata in the form of O2. \n(Space to continue)",
    ],
    "space"
  );
  zoeTextboxes.push(zoeInstructions8);

  zoeInstructions9 = new zoeTextBox(
    ["The electron goes to replace the lost electron in the chlorophyll. (Space to continue)"],
    "space"
  );
  zoeTextboxes.push(zoeInstructions9);

  zoeInstructions10 = new zoeTextBox(
    [
      "Then, the H+ ions naturally diffuse through the ATP Synthase into the stroma in a process\n called chemiosmosis, the process of H+ ions going down their electrochemical gradient,\n because there is a lower concentration of charge and particles in the stroma. (Drag the H+ ion)",
    ],
    "H+ ions go to ATP synthase"
  );
  zoeTextboxes.push(zoeInstructions10);
  
  zoeInstructions10a = new zoeTextBox(
    [
      "The ATP Synthase rotates, generating power to combine ADP with a third phosphate\n group to make ATP."
    ],
    "ATP animation finishes"
  );
  zoeTextboxes.push(zoeInstructions10a);
  

  zoeInstructions11 = new zoeTextBox(
    ["This ATP is one of the products of the light dependent reactions. At the same time, the excited\n electron keeps going to PSI. (Drag the excited electron)"],
    "Electron collides with PSI"
  );
  zoeTextboxes.push(zoeInstructions11);
  
  zoeInstructions12 = new zoeTextBox(["The electron has now lost all of its energy. (Space to continue)"],"space")
  zoeTextboxes.push(zoeInstructions12)
  
  zoeInstructions13 = new zoeTextBox(["Next, Photosystem I gets hit by another photon.(Drag the photon)"],"Photon collides with PSI")
  zoeTextboxes.push(zoeInstructions13)
  
  zoeInstructions14 = new zoeTextBox(["An electron from a chlorophyll molecule called P700 in PSI gets excited and combines with\n NADP+ and H+ to make NADPH. (Drag the H+ ion and the excited electron)"],"NADP+ collides with H+ and excited electron")
  zoeTextboxes.push(zoeInstructions14)
  
  zoeInstructions15 = new zoeTextBox(["Once the cycle has run twice, there are 2 excited electrons in the NADPH. The NADPH is a\n primary electron acceptor. (Space to continue)","The lost electron from the chlorophyll in PSI gets replaced by the old electron.\n (Space to continue)"], "space")
  zoeTextboxes.push(zoeInstructions15)
  
  zoeInstructions16 = new zoeTextBox(["This is how the thylakoid membrane harnesses sunlight to make ATP and NADPH to be used\n in the calvin cycle! Click the next button to go to the calvin cycle."], "")
  zoeTextboxes.push(zoeInstructions16)
  
}

function zoe() {
  
  text("Scene: " + zoeSceneIAmInevitable,30,750)
  // Labels
  fill(255,255,255)
  text("Lumen (Thylakoid Space)", 300, 650);
  text("Stroma(Space inside the Chloroplast)", 250, 200);
  fill(0,0,0)
  text("Photosystem\n II",50,475)
  text("Photosystem\n I",450,475)
  text("ATP Synthase",675,475)
  text("Proteins",265,450)
  fill(255,255,255)

  if (zoeSceneIAmInevitable == 1) {
    zoeIntro.draw();
  } else if (zoeSceneIAmInevitable == 2) {
    zoeInstructions1.draw();

    zoePhotonDint.working = true;

    for (var i = 0; i < objects.length; i++) {
      if (objects[i].type == "PSII") {
        if (
          zoeDetectCollision(objects[i], zoePhotonDint)) {
          zoeInstructions1.nextLine();
        }
      }
    }
  } else if (zoeSceneIAmInevitable == 3) {
    
    zoeElectron.working = false;
    zoeExcitedElectron.working = true
    zoeExcitedElectron.draggable = false
    zoePhotonDint.working = false;
    zoeInstructions2.draw();
    
  } else if (zoeSceneIAmInevitable == 4) {
    zoeInstructions3.draw();
    zoeExcitedElectron.draggable = true

    for (j = 0; j < objects.length; j++) {
      if (objects[j].type == "Channel Protein") {
        if (
          zoeDetectCollision(objects[j], zoeExcitedElectron)) {
          zoeInstructions3.nextLine();
          zoeExcitedElectron.draggable = false;
        }
      }
    }
  } else if (zoeSceneIAmInevitable == 5) {
    zoeInstructions4.draw();
    zoeH.draggable = true;
    zoeElectron.working = false;

    for (m = 0; m < objects.length; m++) {
      if (objects[m].type == "H") {
        if (objects[m].y > 550) {
          console.log("H moved into the lumen");
          zoeInstructions4.nextLine();
        }
      }
    }
  } else if (zoeSceneIAmInevitable == 6) {
    zoeInstructions5.draw();
    zoeWater.working = true;
    zoeH.draggable = false;

    for (j = 0; j < objects.length; j++) {
      if (objects[j].type == "PSII") {
        if (zoeDetectCollision(objects[j], zoeWater)) {
          zoeInstructions5.nextLine();
        }
      }
    }
  } else if (zoeSceneIAmInevitable == 7) {
    zoeInstructions6.draw();
    zoeWater.working = false;

    zoeHFromWater.working = true;
    zoeHFromWater1.working = true;
    zoeOxygen.working = true;
    zoeElectron2.working = true;
  } else if (zoeSceneIAmInevitable == 8) {
    zoeInstructions7.draw();

    zoeHFromWater.x = 200;
    zoeHFromWater.y = 700;
    zoeHFromWater1.x = 450;
    zoeHFromWater1.y = 675;
  } else if (zoeSceneIAmInevitable == 9) {
    zoeOxygen.working = false;
    zoeInstructions8.draw();
  } else if (zoeSceneIAmInevitable == 10) {
    zoeElectron.working = true;
    zoeElectron2.working = false;
    zoeInstructions9.draw();

  } else if (zoeSceneIAmInevitable == 11) {
    zoeInstructions10.draw();
    zoeH.draggable = true;
    zoeHFromWater.draggable = true;
    zoeHFromWater1.draggable = true;

    for (j = 0; j < objects.length; j++) {
      if (objects[j].type == "ATPSynthase1") {
        if (zoeDetectCollision(objects[j], zoeH) || zoeDetectCollision(objects[j],zoeHFromWater) || zoeDetectCollision(objects[j],zoeHFromWater1)) {
          console.log("inner statemtnsefinfienfeinfsjdkfhsdkj " + zoeHFromWater1);
          if (zoeDetectCollision(objects[j],zoeHFromWater1)) {
            usedH = zoeHFromWater1
          } else if (zoeDetectCollision(objects[j],zoeHFromWater)) {
            usedH = zoeHFromWater
          } else if (zoeDetectCollision(objects[j],zoeH)) {
            usedH = zoeH
          }
          zoeInstructions10.nextLine();
        }
      }
    }
    
  } else if (zoeSceneIAmInevitable == 12) {
    
    zoeInstructions10a.draw()
    
    console.log("Activating animation")
    if (!poop) {
      poop = true
      console.log('zoeAPTAnimation called')
      zoeATPAnimation()
    }
    console.log("Ending animation")    
    
  } else if (zoeSceneIAmInevitable == 13) {
    zoeInstructions11.draw()
    
    // Only for 1267676767
    zoeExcitedElectron.draggable = true
    
    for (j = 0; j < objects.length; j++) {
      if (objects[j].type == "PSI") {
        if (zoeDetectCollision(objects[j], zoeExcitedElectron)) {
          zoeInstructions11.nextLine();
        }
      }
    }
    
    
  } else if (zoeSceneIAmInevitable == 14) {
    
    zoeInstructions12.draw()
    zoeExcitedElectron.working = false
    
    zoePhotonDint.x = 20
    zoePhotonDint.y = 130
    
    zoeElectron2.working = true
    zoeElectron2.x = zoeExcitedElectron.x
    zoeElectron2.y = zoeExcitedElectron.y
    
  } else if (zoeSceneIAmInevitable == 15) {
    
    
    zoePhotonDint.working = true
    
    zoeExcitedElectron.x = 480
    zoeExcitedElectron.y = 400
    
    zoeInstructions13.draw()
    
    for (j = 0; j < objects.length; j++) {
      if (objects[j].type == "PSI") {
        if (zoeDetectCollision(objects[j], zoePhotonDint)) {
          zoeInstructions13.nextLine();
        }
      }
    }
    
  } else if (zoeSceneIAmInevitable == 16) {
    
    zoeInstructions14.draw()
    usedH.draggable = true
    zoeElectron.working = false
    zoePhotonDint.working = false
    
    zoeExcitedElectron.draggable = true
    
    zoeExcitedElectron.working = true
    
    zoeNADPPlus.working = true
    
     for (j = 0; j < objects.length; j++) {
      if (objects[j].type == "NADP+") {
        if (zoeDetectCollision(objects[j], usedH) && zoeDetectCollision(objects[j],zoeExcitedElectron)) {
          zoeInstructions14.nextLine();
        }
      }
    }
    
  } else if (zoeSceneIAmInevitable == 17) {
    zoeInstructions15.draw()
    usedH.working = false
    zoeExcitedElectron.working = false
    zoeNADPPlus.working = false
    zoeNADPH.working = true
    zoeElectron2.x = 475
    zoeElectron2.y = 400
  } else if (zoeSceneIAmInevitable == 18) {
    zoeInstructions16.draw()
    
    nextButton()
  }
  
}

function keyPressed() {

  if (screen == 0) {
    zoeTextboxes[zoeSceneIAmInevitable - 1].keyPressed();
  } else if (screen == 7) { // FOR CONCLUSION
  if (key == " ") {
    if (conclusionNum != 6)
    conclusionNum += 1
  } 
  }
  
}

function zoeDetectCollision(object1, object2) {
  console.log("Detecting collision between: " + object1 + " and: " + object2);
  zoeCollisionA = pow(object2.x - object1.x, 2);
  zoeCollisionB = pow(object2.y - object1.y, 2);
  zoeCollisionC = Math.sqrt(zoeCollisionA + zoeCollisionB);

  if (
    zoeCollisionC <
    (object1.sizeX + object1.sizeY) / 4 + (object2.sizeX + object2.sizeY) / 4
  ) {
    console.log(
      "!*!*@*#@#*@!!!!!!! Collision imminent: " +
        object1 +
        " collided with " +
        object2
    );
    return true;
  } else {
    return false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function zoeATPAnimation() {
     
    // The H ion dissapears and the ADP appears.
    usedH.working = false;
    zoeADP.working = true;
    zoePhosphate.working = true;
    
    // 2 second delay
  await sleep(2000);
    
    for (let k = 0; k < 5; k++) {
      
      // First, the ATP synthase rotates 5 times.
      zoeATPSynthase1.working = true
      zoeATPSynthase2.working = false
      
      await sleep(500)
      
      zoeATPSynthase1.working = false
      zoeATPSynthase2.working = true
      
      await sleep(500)
      
      console.log("cycle " + k + " of ATP synthase")
  }
  
  zoeATPSynthase1.working = true
  zoeATPSynthase2.working = false
    
    // Then, there is a particle shower
    
   particleShower(700, 275, //position
                   100, //Number of Particles
                   10, 23, //Minimum and maximum size of particle
                   0, 10, //Minimum and maximum starting velocity
                   0.9, 0.99, //Min and max velocity ratio (how much it slows down/speeds up)
                   0.85, 0.87, //Min and max size ratio (how much it shrinks/expands over time)
                   255,255,0, //Color (rgb)
                   // 255,0,0, //Color (rgb)
                   10,20 //Min and max lifespan (how long it stays)
                  )
  
    // After the particle shower, it turns into ATP
    zoeADP.working = false
    zoePhosphate.working = false;
    zoeATP.working = true
    
    // Then it waits 2 seconds again and the H ion appears and changes
    await sleep(2000)

    
    usedH.working = true
    usedH.x = 680
    usedH.y = 200
    zoeH.draggable = false
    zoeExcitedElectron.draggable = true
    console.log('poopoop')
    zoeSceneIAmInevitable = 13
}

