// Electron Transport Chain Simulation for andre.js

var waterCount = 0

// Tutorial Scene Variables (Simple like maren.js)
var andreScene = 0;
var andreTextboxes = [];
var andreNextBtn;
var mouseWasReleasedAfterTutorial = false;

// ETC State Variables
var etcState = {
  initialized: false,
  proteinComplexes: [],
  electrons: [],
  protons: [],
  atpMolecules: [],
  oxygenMolecules: [],
  waterMolecules: [],
  nadh: [],
  fadh2: [],
  atpSynthase: null,
  membraneY: 0,
  matrixY: 0,
  intermembraneY: 0,
  protonGradient: 0,
  atpCount: 0,
  electronCount: 0,
  timeCounter: 0,
  paused: false,
  mode: 'AUTO', // AUTO or MANUAL after tutorial
  selectedElement: null,
  selectedSubtab: null
};

// Information database for all elements
var elementInfo = {
  complex1: {
    name: "Complex I (NADH Dehydrogenase)",
    description: "Complex I is the first and largest protein complex in the electron transport chain. It accepts electrons from NADH (which becomes NAD+) and pumps 4 H+ ions (protons) across the inner mitochondrial membrane into the intermembrane space through active transport. This creates part of the electrochemical gradient used to produce ATP through chemiosmosis."
  },
  complex2: {
    name: "Complex II (Succinate Dehydrogenase)",
    description: "Complex II is a protein complex that accepts electrons from FADH2 (which becomes FAD) produced during the Krebs cycle. Unlike other complexes, Complex II does not pump protons across the membrane, but it still plays a crucial role in transferring electrons (e-) to Coenzyme Q in the electron transport chain."
  },
  complex3: {
    name: "Complex III (Cytochrome bc1 Complex)",
    description: "Complex III is a protein complex that receives electrons from Coenzyme Q and transfers them to Cytochrome C. During this process, it uses active transport to pump 4 H+ ions (protons) across the inner mitochondrial membrane, contributing to the electrochemical gradient. This complex uses the Q-cycle mechanism for electron transfer."
  },
  complex4: {
    name: "Complex IV (Cytochrome C Oxidase)",
    description: "Complex IV is the final protein complex in the electron transport chain. It transfers electrons (e-) to oxygen (O2), the final electron acceptor, forming water (H2O). It also pumps 2 H+ ions across the membrane through active transport. Without oxygen, the entire electron transport chain stops, which is why we need to breathe!"
  },
  atpSynthase: {
    name: "ATP Synthase",
    description: "ATP Synthase is a protein complex and molecular machine that produces ATP through oxidative phosphorylation. As H+ ions (protons) flow back through ATP Synthase via facilitated diffusion from the intermembrane space to the mitochondrial matrix, the enzyme rotates and catalyzes: ADP + Pi → ATP. This process is called chemiosmosis."
  },
  intermembrane: {
    name: "Intermembrane Space",
    description: "The intermembrane space is the region between the inner and outer membranes of the mitochondria. During the electron transport chain, H+ ions (protons) accumulate here through active transport, creating a high concentration. This electrochemical gradient (both electrical and chemical) stores potential energy that drives ATP synthesis."
  },
  matrix: {
    name: "Mitochondrial Matrix",
    description: "The mitochondrial matrix is the innermost compartment of the mitochondrion (plural: mitochondria). It contains enzymes for the Krebs cycle and is where NADH and FADH2 are produced. The matrix has a lower H+ concentration than the intermembrane space, creating the electrochemical gradient needed for ATP synthesis through the inner mitochondrial membrane.",
    subtabs: {
      nadh: {
        name: "NADH / NAD+ (Electron Carrier)",
        description: "NADH (reduced form) is an electron carrier produced during glycolysis and the Krebs cycle. It carries high-energy electrons (e-) to Complex I in the inner mitochondrial membrane, where it becomes NAD+ (oxidized form). Approximately 10 NADH molecules are used per glucose, contributing to ~25 ATP through oxidative phosphorylation."
      },
      fadh2: {
        name: "FADH₂ / FAD (Electron Carrier)",
        description: "FADH₂ (reduced form) is an electron carrier produced during the Krebs cycle. It delivers electrons (e-) to Complex II in the inner mitochondrial membrane, where it becomes FAD (oxidized form). Approximately 2 FADH2 molecules are used per glucose, entering the ETC later than NADH and contributing to ~3 ATP through oxidative phosphorylation."
      },
      oxygen: {
        name: "Oxygen (O₂) - Final Electron Acceptor",
        description: "Oxygen is the final electron acceptor in the electron transport chain. At Complex IV, O2 combines with electrons (e-) and H+ ions (protons) to form water (H₂O): O2 + 4e- + 4H+ → 2H2O. About 6 O2 molecules are used per glucose. Oxygen's high electronegativity makes it an excellent electron acceptor, which is why aerobic respiration is so efficient and why we need to breathe!"
      },
      water: {
        name: "Water (H₂O) - Product",
        description: "Water is the byproduct formed when oxygen accepts electrons at Complex IV. The reaction is: O2 + 4e- + 4H+ → 2H2O. Approximately 6 water molecules are produced per glucose molecule during cellular respiration. This metabolic water is actually part of the water your body produces and is mixed with the water you exhale with each breath!"
      },
      atp: {
        name: "ATP / ADP (Energy Currency)",
        description: "ATP (adenosine triphosphate) is the cell's energy currency. It's produced when ADP (adenosine diphosphate) combines with inorganic phosphate (Pi) through oxidative phosphorylation at ATP Synthase: ADP + Pi → ATP. The ETC produces approximately 32-34 ATP per glucose molecule - the most of any cellular respiration stage!"
      },
      proteins: {
        name: "Proteins in the ETC",
        description: "Protein complexes in the inner mitochondrial membrane (Complexes I, II, III, IV, and ATP Synthase) facilitate electron transport and ATP production. These proteins use active transport to pump H+ ions and facilitated diffusion (at ATP Synthase) to harness the electrochemical gradient for chemiosmosis."
      },
      mitochondria: {
        name: "Mitochondria - The Powerhouse",
        description: "Mitochondria (singular: mitochondrion) are organelles known as the 'powerhouse of the cell.' They contain an outer membrane, inner mitochondrial membrane (where the ETC occurs), intermembrane space, and mitochondrial matrix. The ETC in mitochondria produces most of the cell's ATP through oxidative phosphorylation and chemiosmosis."
      }
    }
  }
};

// TextBox class for andre (similar to maren.js)
class andreTextBox {
  constructor(title, lines) {
    this.title = title;
    this.lines = lines;
  }

  draw() {
    push();
    // Background box
    fill(0, 0, 0, 50);
    stroke(255, 255, 255);
    strokeWeight(3);
    rect(10, 10, 780, 140, 10);

    // Title
    textSize(24);
    fill(100, 200, 255);
    noStroke();
    textAlign(LEFT);
    text(this.title, 25, 40);

    // Description
    textSize(18);
    fill(255, 255, 255);
    text(this.lines, 25, 70, 750, 100);

    // Progress indicator
    textSize(16);
    fill(200, 200, 200);
    text("Step " + (andreScene + 1) + " of 8", 660, 40);
    pop();
  }
}

function andreSetup() {
  // Create NEXT button
  andreNextBtn = new button(width - 150, height - 80, 130, 60);

  // Initialize textboxes for tutorial
  andreTextboxes = [
    new andreTextBox(
      "Welcome to the Electron Transport Chain!",
      "The ETC is the final stage of cellular respiration, occurring in the\nmitochondria. It uses electrons from NADH and FADH₂ to pump H⁺ ions,\ncreating an electrochemical gradient that powers ATP production."
    ),
    new andreTextBox(
      "Inputs: NADH and FADH₂",
      "NADH (10 molecules) and FADH₂ (2 molecules) from glycolysis and the Krebs\ncycle donate electrons to the ETC. NADH becomes NAD⁺ and FADH₂ becomes\nFAD after releasing electrons. O₂ (6 molecules) is also required!"
    ),
    new andreTextBox(
      "Electron Flow & Active Transport",
      "Electrons (e⁻) from NADH enter Complex I, while FADH₂ electrons enter\nComplex II. As electrons move through protein complexes in the inner\nmitochondrial membrane, H⁺ ions are actively transported into the intermembrane space."
    ),
    new andreTextBox(
      "Building the Electrochemical Gradient",
      "Complexes I, III, and IV pump H⁺ ions from the mitochondrial matrix to the\nintermembrane space, creating a concentration gradient. This electrochemical\ngradient stores potential energy through chemiosmosis."
    ),
    new andreTextBox(
      "Why Oxygen is Essential",
      "O₂ is the final electron acceptor at Complex IV. Without oxygen, electrons\nwould back up and the entire ETC would stop! When O₂ accepts electrons and\nH⁺, it forms H₂O (water) - producing about 6 H₂O molecules per glucose."
    ),
    new andreTextBox(
      "ATP Synthase: Facilitated Diffusion",
      "H⁺ ions flow back through ATP Synthase via facilitated diffusion, moving\ndown their gradient. This rotates the enzyme, catalyzing oxidative\nphosphorylation: ADP + Pi → ATP (producing ~32-34 ATP per glucose!)."
    ),
    new andreTextBox(
      "Summary: Inputs → Outputs",
      "INPUTS: 10 NADH, 2 FADH₂, 6 O₂, ~34 ADP + Pi\nOUTPUTS: 10 NAD⁺, 2 FAD, 6 H₂O, ~32-34 ATP\nThe ETC produces the MOST ATP of any cellular respiration stage!"
    ),
    new andreTextBox(
      "Tutorial Complete!",
      "Click on any complex, ATP Synthase, or compartment to learn more.\nExplore vocabulary like mitochondria, proteins, chemiosmosis, and more!"
    )
  ];

  andreScene = 0;
}

function initializeETC() {
  etcState.initialized = true;
  etcState.membraneY = height * 0.5;
  etcState.matrixY = height * 0.7;
  etcState.intermembraneY = height * 0.3;
  
  // Create 4 protein complexes in the membrane
  let totalWidth = width - 300; // Leave space on both sides
  let spacing = totalWidth / 5;
  for (let i = 0; i < 4; i++) {
    etcState.proteinComplexes.push({
      x: 150 + spacing * (i + 1),
      y: etcState.membraneY,
      width: 80,
      height: 100,
      active: false,
      type: i + 1,
      electronQueue: []
    });
  }
  
  // ATP Synthase on the far right with more spacing
  etcState.atpSynthase = {
    x: width - 100,
    y: etcState.membraneY,
    width: 60,
    height: 120,
    rotation: 0,
    active: false
  };
  
  // Starting NADH and FADH2
  for (let i = 0; i < 3; i++) {
    etcState.nadh.push({
      x: 80,
      y: etcState.matrixY + random(-20, 20),
      size: 30,
      hasElectrons: true,
      moving: false,
      targetComplex: 0
    });
  }

  etcState.fadh2.push({
    x: 80,
    y: etcState.matrixY + 40,
    size: 30,
    hasElectrons: true,
    moving: false,
    targetComplex: 1
  });
}

function andre() {
  // Initialize tutorial if not done yet
  if (andreTextboxes.length === 0) {
    andreSetup();
  }

  if (!etcState.initialized) {
    initializeETC();
  }

  etcState.timeCounter++;

  // Track mouse release after tutorial finishes - must be released at least once
  if (andreScene >= 8 && !mouseWasReleasedAfterTutorial && !mouseIsPressed) {
    mouseWasReleasedAfterTutorial = true;
  }

  // Draw info panel if element is selected
  if (etcState.selectedElement) {
    drawElementInfo();
  } else {
    // Always draw the simulation

    // Draw membrane
    drawMembrane();

    // Draw protein complexes
    drawProteinComplexes();

    // Draw ATP Synthase
    drawATPSynthase();

    // Update and draw all molecules
    updateNADH();
    updateFADH2();
    updateElectrons();
    updateProtons();
    updateOxygen();
    updateWater();
    updateATP();

    // Auto-generate NADH/FADH2 periodically - only in AUTO mode
    if (!etcState.paused && etcState.mode === 'AUTO' && etcState.timeCounter % 180 == 0) {
      if (etcState.nadh.length < 5) {
        etcState.nadh.push({
          x: 50,
          y: etcState.matrixY + random(-30, 30),
          size: 30,
          hasElectrons: true,
          moving: false,
          targetComplex: 0
        });
      }
    }

    if (!etcState.paused && etcState.mode === 'AUTO' && etcState.timeCounter % 300 == 0) {
      if (etcState.fadh2.length < 3) {
        etcState.fadh2.push({
          x: 50,
          y: etcState.matrixY + 50,
          size: 30,
          hasElectrons: true,
          moving: false,
          targetComplex: 1
        });
      }
    }

    // Auto-add oxygen - much more frequently - only in AUTO mode
    if (!etcState.paused && etcState.mode === 'AUTO' /* && etcState.timeCounter % 15 == 0*/) {
      if (etcState.oxygenMolecules.length < 20) {
        etcState.oxygenMolecules.push({
          x: etcState.proteinComplexes[3].x + random(80, 150),
          y: etcState.matrixY + random(-40, 40),
          size: 25,
          vx: random(-0.5, 0.5),
          vy: random(-0.5, 0.5)
        });
      }
    }

    // Draw compartment labels and backgrounds
    drawCompartments();

    // Draw UI elements
    drawInfoPanel();
    drawControls();

    // Draw clickable hotspots
    drawClickableRegions();

    // Check for clicks on interactive elements - but NOT during tutorial or on UI buttons
    if (mouseClick && andreScene >= 8 && !isClickOnUIButton()) {
      handleElementClicks();
    }
  }

  // Tutorial textbox overlay (if still in tutorial) - DRAW LAST so it's on top
  if (andreScene < 8 && andreTextboxes[andreScene]) {
    andreTextboxes[andreScene].draw();
    if (andreNextBtn) {
      drawAndreNextButton();
    }
  }
}

function drawCompartments() {
  // Intermembrane space (top)
  push();
  fill(100, 150, 200, 30);
  noStroke();
  rect(0, 0, width, etcState.membraneY - 50);

  // Only show labels after tutorial to avoid overlap with tutorial textbox
  if (andreScene >= 8) {
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Intermembrane Space", 20, 30);
    text("H+ Concentration: " + etcState.protons.length, 20, 50);
  }
  pop();

  // Matrix (bottom)
  push();
  fill(150, 100, 150, 30);
  noStroke();
  rect(0, etcState.membraneY + 50, width, height);

  // Only show label after tutorial
  if (andreScene >= 8) {
    fill(255);
    textSize(15);
    textAlign(LEFT);
    text("Mitochondrial Matrix", 20, etcState.membraneY + 80);
  }
  pop();
}

function drawMembrane() {
  push();
  
  // Draw phospholipid bilayer - only inner 2 layers
  imageMode(CENTER);
  
  let membraneCenter = etcState.membraneY;
  let phospholipidSize = 40;
  
  // Calculate how many phospholipids fit across
  let numAcross = Math.ceil(width / phospholipidSize) + 1;
  
  // Draw only 2 rows - one above center, one below center
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < numAcross; col++) {
      let x = col * phospholipidSize;
      let y = membraneCenter + (row === 0 ? -20 : 20); // Position above and below center
      
      push();
      translate(x, y);
      
      // Flip orientation - heads pointing out, tails pointing in
      // Top row points down (heads up), bottom row points up (heads down)
      if (row === 0) {
        rotate(0); // Top row - heads point up (out to intermembrane space)
      } else {
        rotate(180); // Bottom row - heads point down (out to matrix)
      }
      
      tint(255, 150); // Semi-transparent
      image(Phospholipid, 0, 0, phospholipidSize * 1.2, phospholipidSize * 1.2);
      noTint();
      pop();
    }
  }
  
  // Label
  fill(0, 0, 0, 150);
  noStroke();
  //rect(10, etcState.membraneY - 75, 320, 30, 5);
  
  fill(255, 240);
  textSize(14);
  textAlign(LEFT, CENTER);
  textSize(15);
  text("Inner Mitochondrial Membrane", 15, etcState.membraneY);
  pop();
}

function drawProteinComplexes() {
  for (let i = 0; i < etcState.proteinComplexes.length; i++) {
    let complex = etcState.proteinComplexes[i];
    
    push();
    translate(complex.x, complex.y);
    imageMode(CENTER);
    
    // Apply tint if active
    if (complex.active) {
      tint(255, 220, 150);
    }
    
    // Draw appropriate complex image
    if (complex.type == 1) {
      image(ComplexOne, 0, 0, complex.width, complex.height);
    } else if (complex.type == 2) {
      image(ComplexTwo, 0, 0, complex.width, complex.height);
    } else if (complex.type == 3) {
      image(ComplexThree, 0, 0, complex.width, complex.height);
    } else if (complex.type == 4) {
      image(ComplexFour, 0, 0, complex.width, complex.height);
    }
    
    noTint();
    
    // Activity indicator
    if (complex.active) {
      fill(255, 200, 0);
      noStroke();
      ellipse(0, -complex.height/2 - 15, 12, 12);
      
      // Pulse effect
      fill(255, 255, 0, 100);
      ellipse(0, -complex.height/2 - 15, 18 + sin(frameCount * 15) * 4, 18 + sin(frameCount * 15) * 4);
    }
    
    pop();
  }
}

function drawATPSynthase() {
  let synthase = etcState.atpSynthase;
  
  push();
  translate(synthase.x, synthase.y);
  imageMode(CENTER);
  
  let rotationCycle = (synthase.rotation/30);
  //console.log(rotationCycle);
  if (rotationCycle % 2 === 0) {
    image(ATPSynthase1, 0, 0, synthase.width * 1.5, synthase.height);
  } else {
    image(ATPSynthase2, 0, 0, synthase.width * 1.5, synthase.height);
  }
  
  pop();
  
  // Label
  push();
  fill(255);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text("ATP Synthase", synthase.x - 75, synthase.y);
  pop();
}

function updateNADH() {
  for (let i = etcState.nadh.length - 1; i >= 0; i--) {
    let nadh = etcState.nadh[i];
    
    // Draw NADH
    push();
    imageMode(CENTER);
    if (nadh.hasElectrons) {
      image(NADPH, nadh.x, nadh.y, nadh.size * 1.2, nadh.size * 1.2);
    } else {
      image(NADPlus, nadh.x, nadh.y, nadh.size * 1.2, nadh.size * 1.2);
    }
    pop();
    
    if (etcState.paused) continue;
    
    // Move toward Complex I
    if (nadh.hasElectrons && !nadh.moving && etcState.timeCounter % 60 == 0) {
      nadh.moving = true;
    }
    
    if (nadh.moving) {
      let target = etcState.proteinComplexes[nadh.targetComplex];
      let dx = target.x - nadh.x;
      let dy = target.y + 40 - nadh.y;
      let dist = sqrt(dx*dx + dy*dy);
      
      if (dist > 5) {
        nadh.x += dx / dist * 2;
        nadh.y += dy / dist * 2;
      } else {
        // Deliver electrons
        if (nadh.hasElectrons) {
          nadh.hasElectrons = false;
          nadh.moving = false;
          
          // Create electron
          etcState.electrons.push({
            x: nadh.x,
            y: nadh.y,
            size: 8,
            currentComplex: 0,
            targetComplex: 1,
            speed: 1.5
          });
          
          etcState.proteinComplexes[0].active = true;
          etcState.electronCount++;
          
          // Deactivate after a short time
          setTimeout(() => {
            etcState.proteinComplexes[0].active = false;
          }, 500);
          
          // Create protons
          for (let j = 0; j < 2; j++) {
            setTimeout(() => {
              etcState.protons.push({
                x: target.x + random(-20, 20),
                y: target.y,
                size: 12,
                targetY: etcState.intermembraneY,
                pumped: false
              });
            }, j * 300);
          }
        }
        
        // Move back to matrix
        if (!nadh.hasElectrons) {
          nadh.x = 50;
          nadh.y = etcState.matrixY + random(-30, 30);
          nadh.hasElectrons = true;
        }
      }
    }
  }
}

function updateFADH2() {
  for (let i = etcState.fadh2.length - 1; i >= 0; i--) {
    let fadh = etcState.fadh2[i];
    
    // Draw FADH2
    push();
    imageMode(CENTER);
    if (fadh.hasElectrons) {
      image(FADH, fadh.x, fadh.y, fadh.size * 1.2, fadh.size * 1.2);
    } else {
      image(FAD, fadh.x, fadh.y, fadh.size * 1.2, fadh.size * 1.2);
    }
    pop();
    
    if (etcState.paused) continue;
    
    // Move toward Complex II
    if (fadh.hasElectrons && !fadh.moving && etcState.timeCounter % 90 == 0) {
      fadh.moving = true;
    }
    
    if (fadh.moving) {
      let target = etcState.proteinComplexes[1];
      let dx = target.x - fadh.x;
      let dy = target.y + 40 - fadh.y;
      let dist = sqrt(dx*dx + dy*dy);
      
      if (dist > 5) {
        fadh.x += dx / dist * 2;
        fadh.y += dy / dist * 2;
      } else {
        if (fadh.hasElectrons) {
          fadh.hasElectrons = false;
          fadh.moving = false;
          
          etcState.electrons.push({
            x: fadh.x,
            y: fadh.y,
            size: 8,
            currentComplex: 1,
            targetComplex: 2,
            speed: 1.5
          });
          
          etcState.proteinComplexes[1].active = true;
          etcState.electronCount++;
          
          // Deactivate after a short time
          setTimeout(() => {
            etcState.proteinComplexes[1].active = false;
          }, 500);
        }
        
        if (!fadh.hasElectrons) {
          fadh.x = 50;
          fadh.y = etcState.matrixY + 50;
          fadh.hasElectrons = true;
        }
      }
    }
  }
}

function updateElectrons() {
  for (let i = etcState.electrons.length - 1; i >= 0; i--) {
    let electron = etcState.electrons[i];
    
    // Draw electron
    push();
    imageMode(CENTER);
    image(Electron, electron.x, electron.y, electron.size * 2.5, electron.size * 2.5);
    
    // Glow effect
    noStroke();
    fill(255, 255, 0, 30);
    ellipse(electron.x, electron.y, electron.size * 4);
    pop();
    
    if (etcState.paused) continue;
    
    // Move to next complex
    if (electron.targetComplex < etcState.proteinComplexes.length) {
      let target = etcState.proteinComplexes[electron.targetComplex];
      let dx = target.x - electron.x;
      let dy = target.y - electron.y;
      let dist = sqrt(dx*dx + dy*dy);

      if (dist > 5) {
        electron.x += dx / dist * electron.speed;
        electron.y += dy / dist * electron.speed;
      } else {
        electron.currentComplex = electron.targetComplex;
        electron.targetComplex++;

        etcState.proteinComplexes[electron.currentComplex].active = true;

        // Pump protons at complexes 0, 2, 3
        if (electron.currentComplex == 0 || electron.currentComplex == 2 || electron.currentComplex == 3) {
          for (let j = 0; j < 2; j++) {
            setTimeout(() => {
              etcState.protons.push({
                x: target.x + random(-20, 20),
                y: target.y,
                size: 12,
                targetY: etcState.intermembraneY,
                pumped: false
              });
            }, j * 200);
          }
        }

        setTimeout(() => {
          etcState.proteinComplexes[electron.currentComplex].active = false;
        }, 500);

        // Mark that electron has finished complexes
        if (electron.targetComplex >= etcState.proteinComplexes.length) {
          electron.seekingOxygen = true;
        }
      }
    }

    // Electron has finished all complexes - seek oxygen
    if (electron.seekingOxygen || electron.targetComplex >= etcState.proteinComplexes.length) {
      // Electron reaches oxygen - actively seek it out
      let nearestOxygen = null;
      let minDist = Infinity;
      
      for (let j = 0; j < etcState.oxygenMolecules.length; j++) {
        let oxy = etcState.oxygenMolecules[j];
        let d = dist(electron.x, electron.y, oxy.x, oxy.y);
        if (d < minDist) {
          minDist = d;
          nearestOxygen = j;
        }
      }
      
      if (nearestOxygen !== null) {
        let oxy = etcState.oxygenMolecules[nearestOxygen];
        let dx = oxy.x - electron.x;
        let dy = oxy.y - electron.y;
        let d = sqrt(dx*dx + dy*dy);
        
        // Increased capture range and speed
        if (d > 10) {
          electron.x += dx / d * (electron.speed * 1.5);
          electron.y += dy / d * (electron.speed * 1.5);
        } else {
          // Create water
          etcState.waterMolecules.push({
            x: electron.x,
            y: electron.y,
            size: 20,
            life: 180
          });
          waterCount++
          
          etcState.electrons.splice(i, 1);
          etcState.oxygenMolecules.splice(nearestOxygen, 1);
        }
      } else {
        // No oxygen available - move toward typical oxygen zone
        let targetX = etcState.proteinComplexes[3].x + 120;
        let targetY = etcState.matrixY;
        let dx = targetX - electron.x;
        let dy = targetY - electron.y;
        let d = sqrt(dx*dx + dy*dy);
        
        if (d > 5) {
          electron.x += dx / d * 0.5;
          electron.y += dy / d * 0.5;
        }
      }
    }
  }
}

function updateProtons() {
  for (let i = etcState.protons.length - 1; i >= 0; i--) {
    let proton = etcState.protons[i];
    
    // Draw proton
    push();
    imageMode(CENTER);
    image(H, proton.x, proton.y, proton.size * 1.8, proton.size * 1.8);
    pop();
    
    if (etcState.paused) continue;
    
    // Pump to intermembrane space
    if (!proton.pumped && proton.y > proton.targetY) {
      proton.y -= 1.5;
      if (proton.y <= proton.targetY) {
        proton.pumped = true;
        proton.floatX = random(-0.5, 0.5);
        proton.floatY = random(-0.5, 0.5);
      }
    }
    
    // Float in intermembrane space
    if (proton.pumped) {
      proton.x += proton.floatX;
      proton.y += proton.floatY;

      // Apply downward force to all protons
      proton.y += 0.3;

      // Proton-proton repulsion
      for (let j = 0; j < etcState.protons.length; j++) {
        if (i !== j && etcState.protons[j].pumped) {
          let other = etcState.protons[j];
          let dx = proton.x - other.x;
          let dy = proton.y - other.y;
          let d = sqrt(dx*dx + dy*dy);

          // Repel if too close
          if (d < 180 && d > 0) {
            let force = sqrt((180 - d)*(180 - d))/180 * 5;
            proton.x += (dx / d) * force;
            proton.y += (dy / d) * force;
          }
        }
      }
      
      // Keep protons in bounds
      let margin = proton.size;
      if (proton.x < margin) {
        proton.x = margin;
        proton.floatX = abs(proton.floatX);
      }
      if (proton.x > width - margin) {
        proton.x = width - margin;
        proton.floatX = -abs(proton.floatX);
      }
      if (proton.y < margin) {
        proton.y = margin;
        proton.floatY = abs(proton.floatY);
      }
      if (proton.y > etcState.membraneY - 50) {
        proton.y = etcState.membraneY - 50;
        proton.floatY = -abs(proton.floatY);
      }
      
      // Attracted to ATP Synthase - reduced threshold for activation
      if (etcState.protons.length > 3) {
        let dx = etcState.atpSynthase.x - proton.x;
        let dy = etcState.atpSynthase.y - 40 - proton.y;
        let d = sqrt(dx*dx + dy*dy);
        
        // Increased attraction range and speed - overrides repulsion when close
        if (d < 700) {
          let attractForce = 0.6 * max(0.5, sqrt((490000 - (d*d)))/700); // Stronger attraction
          let attractX = dx / d * attractForce;
          let attractY = dy / d * attractForce;
          
          // Override float velocities near ATP synthase
          proton.x += attractX;
          proton.y += attractY;
          
          // Much larger capture radius
          if (d < height/20) {
            // Proton goes through ATP Synthase
            proton.y = etcState.matrixY - 80;
            proton.pumped = false;
            etcState.atpSynthase.active = true;
            etcState.atpSynthase.rotation += 30;
            
            // Create ATP
            etcState.atpMolecules.push({
              x: etcState.atpSynthase.x,
              y: etcState.atpSynthase.y + 60,
              size: 25,
              life: 200,
              vx: random(-1, 1),
              vy: random(0.5, 1.5)
            });
            
            etcState.atpCount++;
            etcState.protons.splice(i, 1);
          }
        }
      }
    }
  }
}

function updateOxygen() {
  for (let i = 0; i < etcState.oxygenMolecules.length; i++) {
    let oxy = etcState.oxygenMolecules[i];
    
    // Draw oxygen
    push();
    imageMode(CENTER);
    image(OTwo, oxy.x, oxy.y, oxy.size * 1.8, oxy.size * 1.8);
    pop();
    
    if (!etcState.paused) {
      oxy.x += oxy.vx;
      oxy.y += oxy.vy;
      
      // Boundary check
      if (oxy.x < 0 || oxy.x > width) oxy.vx *= -1;
      if (oxy.y < etcState.membraneY + 50 || oxy.y > height) oxy.vy *= -1;
    }
  }
}

function updateWater() {
  for (let i = etcState.waterMolecules.length - 1; i >= 0; i--) {
    let water = etcState.waterMolecules[i];
    
    // Draw water
    push();
    imageMode(CENTER);
    tint(255, map(water.life, 0, 180, 100, 255));
    image(HTwoO, water.x, water.y, water.size * 1.5, water.size * 1.5);
    noTint();
    pop();
    
    water.life--;
    if (water.life <= 0) {
      etcState.waterMolecules.splice(i, 1);
    }
  }
}

function updateATP() {
  for (let i = etcState.atpMolecules.length - 1; i >= 0; i--) {
    let atp = etcState.atpMolecules[i];
    
    // Draw ATP
    push();
    imageMode(CENTER);
    tint(255, map(atp.life, 0, 200, 120, 255));
    image(Atp, atp.x + 8, atp.y, 35, 25);
    noTint();
    pop();
    
    if (!etcState.paused) {
      atp.x += atp.vx;
      atp.y += atp.vy;
      atp.life--;
    }
    
    if (atp.life <= 0) {
      etcState.atpMolecules.splice(i, 1);
    }
  }
}

function drawInfoPanel() {
  push();
  fill(0, 0, 0, 180);
  noStroke();
  rect(10, height - 120, 250, 110, 10);

  fill(255);
  textSize(14);
  textAlign(LEFT);
  text("Electron Transport Chain", 20, height - 100);
  textSize(12);
  text("Electrons: " + etcState.electronCount, 20, height - 75);
  text("ATP Produced: " + etcState.atpCount, 20, height - 55);
  text("H+ Gradient: " + etcState.protons.length, 20, height - 35);
  text("Water Made: " + waterCount, 20, height - 15);

  pop();
}

function drawControls() {
  // Only show controls after tutorial completes
  if (andreScene >= 8) {
    // Draw next button only after mouse has been released at least once after tutorial
    if (mouseWasReleasedAfterTutorial) {
      nextButton();
    }
  }
}

function drawModeToggle() {
  let btnX = 20;
  let btnY = height - 60;
  let btnW = 120;
  let btnH = 40;

  push();
  let hovering = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;

  if (etcState.mode === 'AUTO') {
    fill(hovering ? 120 : 100, hovering ? 220 : 200, hovering ? 120 : 100);
  } else {
    fill(hovering ? 220 : 200, hovering ? 180 : 160, hovering ? 100 : 80);
  }

  stroke(255);
  strokeWeight(2);
  rect(btnX, btnY, btnW, btnH, 8);

  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(etcState.mode + " MODE", btnX + btnW/2, btnY + btnH/2);
  pop();

  // Handle click to toggle
  if (mouseClick && hovering) {
    etcState.mode = etcState.mode === 'AUTO' ? 'MANUAL' : 'AUTO';
  }
}

function drawManualControls() {
  let startX = 160;
  let btnY = height - 60;
  let btnW = 100;
  let btnH = 40;
  let spacing = 110;

  // Add NADH button
  push();
  let hoverNADH = mouseX > startX && mouseX < startX + btnW && mouseY > btnY && mouseY < btnY + btnH;
  fill(hoverNADH ? 150 : 120, hoverNADH ? 220 : 200, hoverNADH ? 150 : 120);
  stroke(255);
  strokeWeight(2);
  rect(startX, btnY, btnW, btnH, 8);
  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Add NADH", startX + btnW/2, btnY + btnH/2);
  pop();

  if (mouseClick && hoverNADH) {
    etcState.nadh.push({
      x: 50,
      y: etcState.matrixY + random(-30, 30),
      size: 30,
      hasElectrons: true,
      moving: false,
      targetComplex: 0
    });
  }

  // Add FADH2 button
  push();
  let hoverFADH = mouseX > startX + spacing && mouseX < startX + spacing + btnW && mouseY > btnY && mouseY < btnY + btnH;
  fill(hoverFADH ? 120 : 100, hoverFADH ? 180 : 160, hoverFADH ? 240 : 220);
  stroke(255);
  strokeWeight(2);
  rect(startX + spacing, btnY, btnW, btnH, 8);
  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Add FADH₂", startX + spacing + btnW/2, btnY + btnH/2);
  pop();

  if (mouseClick && hoverFADH) {
    etcState.fadh2.push({
      x: 50,
      y: etcState.matrixY + 50,
      size: 30,
      hasElectrons: true,
      moving: false,
      targetComplex: 1
    });
  }

  // Add O2 button
  push();
  let hoverO2 = mouseX > startX + spacing * 2 && mouseX < startX + spacing * 2 + btnW && mouseY > btnY && mouseY < btnY + btnH;
  fill(hoverO2 ? 240 : 220, hoverO2 ? 120 : 100, hoverO2 ? 120 : 100);
  stroke(255);
  strokeWeight(2);
  rect(startX + spacing * 2, btnY, btnW, btnH, 8);
  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Add O₂", startX + spacing * 2 + btnW/2, btnY + btnH/2);
  pop();

  if (mouseClick && hoverO2) {
    etcState.oxygenMolecules.push({
      x: etcState.proteinComplexes[3].x + random(80, 150),
      y: etcState.matrixY + random(-40, 40),
      size: 25,
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5)
    });
  }
}

function isClickOnUIButton() {
  // Check if click is on tutorial textbox area
  if (andreScene < 8) {
    if (mouseX > 10 && mouseX < 790 && mouseY > 10 && mouseY < 150) {
      return true;
    }
  }

  // Check if click is on tutorial NEXT button
  if (andreScene < 8 && andreNextBtn) {
    let btnSize = andreNextBtn.sizeX;
    let btnX = andreNextBtn.x - btnSize / 2;
    let btnY = andreNextBtn.y - andreNextBtn.sizeY / 2;
    if (mouseX > btnX && mouseX < btnX + btnSize &&
        mouseY > btnY && mouseY < btnY + andreNextBtn.sizeY) {
      return true;
    }
  }

  // Check if click is on info panel area (to avoid triggering element selection)
  if (mouseX < 270 && mouseY > height - 130) {
    return true;
  }

  return false;
}

function handleElementClicks() {
  // Check complexes
  for (let i = 0; i < etcState.proteinComplexes.length; i++) {
    let complex = etcState.proteinComplexes[i];
    if (mouseX > complex.x - complex.width/2 && mouseX < complex.x + complex.width/2 &&
        mouseY > complex.y - complex.height/2 && mouseY < complex.y + complex.height/2) {
      etcState.selectedElement = 'complex' + complex.type;
      etcState.selectedSubtab = null;
      return;
    }
  }
  
  // Check ATP Synthase
  let synthase = etcState.atpSynthase;
  if (mouseX > synthase.x - synthase.width && mouseX < synthase.x + synthase.width &&
      mouseY > synthase.y - synthase.height/2 && mouseY < synthase.y + synthase.height/2) {
    etcState.selectedElement = 'atpSynthase';
    etcState.selectedSubtab = null;
    return;
  }
  
  // Check intermembrane space
  if (mouseY < etcState.membraneY - 50) {
    etcState.selectedElement = 'intermembrane';
    etcState.selectedSubtab = null;
    return;
  }
  
  // Check mitochondrial matrix
  if (mouseY > etcState.membraneY + 50) {
    etcState.selectedElement = 'matrix';
    etcState.selectedSubtab = 'nadh';
    return;
  }
}

function drawClickableRegions() {
  push();
  // Draw subtle hover indicators on complexes
  for (let i = 0; i < etcState.proteinComplexes.length; i++) {
    let complex = etcState.proteinComplexes[i];
    if (mouseX > complex.x - complex.width/2 && mouseX < complex.x + complex.width/2 &&
        mouseY > complex.y - complex.height/2 && mouseY < complex.y + complex.height/2) {
      noFill();
      stroke(255, 255, 0, 150);
      strokeWeight(3);
      rect(complex.x - complex.width/2 - 5, complex.y - complex.height/2 - 5, 
           complex.width + 10, complex.height + 10, 12);
    }
  }
  
  // ATP Synthase hover
  let synthase = etcState.atpSynthase;
  if (mouseX > synthase.x - synthase.width && mouseX < synthase.x + synthase.width &&
      mouseY > synthase.y - synthase.height/2 && mouseY < synthase.y + synthase.height/2) {
    noFill();
    stroke(255, 255, 0, 150);
    strokeWeight(3);
    rect(synthase.x - synthase.width - 5, synthase.y - synthase.height/2 - 5,
         synthase.width * 2 + 10, synthase.height + 10, 12);
  }
  pop();
}

// ===== TUTORIAL NEXT BUTTON =====

function drawAndreNextButton() {
  push();
  translate(andreNextBtn.x, andreNextBtn.y);
  rectMode(CENTER);
  fill("black");
  strokeWeight(10);
  stroke("white");

  if (andreNextBtn.hover) {
    andreNextBtn.sizev = max(0.05, andreNextBtn.sizev);
    scale(andreNextBtn.size, andreNextBtn.size);
  } else {
    andreNextBtn.sizev = min(0.01, andreNextBtn.sizev);
    scale(andreNextBtn.size, andreNextBtn.size);
  }

  rect(0, 0, andreNextBtn.sizeX, andreNextBtn.sizeY, 5);
  textAlign(CENTER);
  textSize(35);
  fill("white");
  noStroke();
  rotate(cos(frameCount * 2) * 5);
  text(andreScene >= 7 ? "FINISH" : "NEXT", 0, 12, andreNextBtn.sizeX, andreNextBtn.sizeY);
  pop();

  andreNextBtn.work();

  if (andreNextBtn.clicked && andreScene < 8) {
    andreScene++;
    // Note: mouseWasReleasedAfterTutorial stays false until mouse is released
  }
}

function drawElementInfo() {
  // Dim background
  push();
  fill(0, 0, 0, 200);
  noStroke();
  rect(0, 0, width, height);
  pop();
  
  let info = elementInfo[etcState.selectedElement];
  
  // Left panel - Enlarged image
  push();
  fill(40, 40, 50);
  stroke(100, 150, 200);
  strokeWeight(3);
  rect(50, 100, 350, 500, 15);
  
  imageMode(CENTER);
  let imgX = 225;
  let imgY = 350;
  
  // Draw appropriate enlarged image
  if (etcState.selectedElement === 'complex1') {
    image(ComplexOne, imgX, imgY, 200, 250);
  } else if (etcState.selectedElement === 'complex2') {
    image(ComplexTwo, imgX, imgY, 200, 250);
  } else if (etcState.selectedElement === 'complex3') {
    image(ComplexThree, imgX, imgY, 200, 250);
  } else if (etcState.selectedElement === 'complex4') {
    image(ComplexFour, imgX, imgY, 200, 250);
  } else if (etcState.selectedElement === 'atpSynthase') {
    image(ATPSynthase1, imgX, imgY, 150, 300);
  } else if (etcState.selectedElement === 'matrix') {
    // Draw subtab images
    if (etcState.selectedSubtab === 'nadh') {
      image(NADPH, imgX, imgY, 200, 200);
    } else if (etcState.selectedSubtab === 'fadh2') {
      image(FADH, imgX, imgY, 200, 200);
    } else if (etcState.selectedSubtab === 'oxygen') {
      image(OTwo, imgX, imgY, 200, 200);
    } else if (etcState.selectedSubtab === 'water') {
      image(HTwoO, imgX, imgY, 200, 200);
    } else if (etcState.selectedSubtab === 'atp') {
      image(Atp, imgX, imgY, 250, 180);
    } else if (etcState.selectedSubtab === 'proteins') {
      image(ComplexOne, imgX, imgY, 200, 250);
    } else if (etcState.selectedSubtab === 'mitochondria') {
      // Draw a simple representation of mitochondria using shapes
      fill(100, 60, 100);
      ellipse(imgX, imgY, 250, 150);
      fill(120, 80, 120);
      ellipse(imgX, imgY, 200, 100);
      fill(255);
      textSize(16);
      text("Mitochondrion", imgX, imgY + 100);
    }
  } else if (etcState.selectedElement === 'intermembrane') {
    image(H, imgX, imgY, 150, 150);
  }
  
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text(etcState.selectedElement === 'matrix' ? 
       info.subtabs[etcState.selectedSubtab].name : info.name, 
       225, 150);
  pop();
  
  // Right panel - Description
  push();
  fill(40, 40, 50);
  stroke(100, 150, 200);
  strokeWeight(3);
  rect(420, 100, 330, 500, 15);
  
  fill(255);
  textSize(14);
  textAlign(LEFT, TOP);
  let desc = etcState.selectedElement === 'matrix' ? 
             info.subtabs[etcState.selectedSubtab].description : 
             info.description;
  text(desc, 440, 130, 290, 400);
  
  // Draw subtabs for matrix
  if (etcState.selectedElement === 'matrix') {
    let subtabs = ['nadh', 'fadh2', 'oxygen', 'water', 'atp', 'proteins', 'mitochondria'];
    let subtabNames = ['NADH', 'FADH₂', 'O₂', 'H₂O', 'ATP', 'Proteins', 'Mito.'];
    let tabY1 = 470;
    let tabY2 = 510;

    for (let i = 0; i < subtabs.length; i++) {
      let row = Math.floor(i / 4);
      let col = i % 4;
      let tabX = 440 + col * 72;
      let tabY = row === 0 ? tabY1 : tabY2;

      if (etcState.selectedSubtab === subtabs[i]) {
        fill(100, 150, 200);
      } else {
        fill(60, 60, 70);
      }

      stroke(150);
      strokeWeight(2);
      rect(tabX, tabY, 65, 35, 5);

      fill(255);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      text(subtabNames[i], tabX + 32, tabY + 17);

      // Check for clicks on subtabs
      if (mouseClick && mouseX > tabX && mouseX < tabX + 65 &&
          mouseY > tabY && mouseY < tabY + 35) {
        etcState.selectedSubtab = subtabs[i];
      }
    }
  }
  pop();
  
  // Close button
  push();
  fill(200, 50, 50);
  stroke(255);
  strokeWeight(2);
  rect(width - 100, 50, 70, 40, 8);
  
  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Close", width - 65, 70);
  
  // Check for close button click
  if (mouseClick && mouseX > width - 100 && mouseX < width - 30 &&
      mouseY > 50 && mouseY < 90) {
    etcState.selectedElement = null;
    etcState.selectedSubtab = null;
  }
  pop();
}