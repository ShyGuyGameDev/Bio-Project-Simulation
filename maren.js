// Calvin Cycle - Step-by-Step Interactive Tutorial
// Matches zoe.js textbox style with NEXT button progression

var marenScene = 0;
var marenTextboxes = [];
var marenObjects = [];
var marenAnimationProgress = 0;
var marenNextBtn;

// TextBox class for maren (similar to zoe.js)
class marenTextBox {
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
    text("Step " + (marenScene + 1) + " of 8", 660, 40);
    pop();
  }
}

function marenSetup() {
  // Clear objects array
  objects.length = 0;
  marenObjects = [];
  marenScene = 0;
  marenAnimationProgress = 0;

  // Create NEXT button
  marenNextBtn = new button(width - 150, height - 80, 130, 60);

  // Initialize all textboxes for each scene
  marenTextboxes = [
    new marenTextBox(
      "Welcome to the Calvin Cycle!",
      "The Calvin Cycle is the light-independent reactions of photosynthesis.\nIt uses CO₂ from the air to build glucose, powered by ATP and NADPH\nfrom the light reactions. Let's see how it works!"
    ),
    new marenTextBox(
      "Step 1: Carbon Fixation Begins",
      "CO₂ from the atmosphere enters the chloroplast and approaches RuBP\n(Ribulose bisphosphate), a 5-carbon sugar. The enzyme Rubisco\ncatalyzes their combination."
    ),
    new marenTextBox(
      "Step 2: Forming 3-PGA",
      "When CO₂ combines with RuBP at Rubisco, it creates an unstable\n6-carbon compound that immediately splits into TWO molecules of 3-PGA\n(3-phosphoglycerate). This is carbon fixation!"
    ),
    new marenTextBox(
      "Step 3: Reduction Phase - Energy Input",
      "ATP and NADPH (from the light reactions) now approach the 3-PGA\nmolecules. These energy carriers will power the reduction of 3-PGA\ninto a more useful sugar."
    ),
    new marenTextBox(
      "Step 4: Creating G3P Sugar",
      "Using energy from ATP and electrons from NADPH, the 3-PGA molecules\nare reduced to G3P (glyceraldehyde-3-phosphate). Six G3P molecules\nare produced from three turns of the cycle!"
    ),
    new marenTextBox(
      "Step 5: Exporting G3P for Glucose",
      "One G3P molecule exits the cycle to be used in making glucose.\nTwo G3P molecules combine to form one glucose! The remaining five G3P\nmolecules stay in the cycle for regeneration."
    ),
    new marenTextBox(
      "Step 6: Regenerating RuBP",
      "The five remaining G3P molecules are rearranged and combined\n(using more ATP) to regenerate three RuBP molecules. This allows\nthe cycle to continue!"
    ),
    new marenTextBox(
      "Calvin Cycle Complete!",
      "The cycle is ready to begin again! For every 3 CO₂ molecules fixed,\nthe cycle produces 1 G3P that can be used to build glucose.\nThe cycle continues as long as light reactions provide ATP and NADPH!"
    ),
  ];

  // Scene 0: Show initial components spread out
  setupScene0();
}

function setupScene0() {
  objects.length = 0;

  // Show the three main components - directly add to objects array
  // new object(type, x, y, sizeX, sizeY, draggable, particleColor, working, rotation)
  objects[0] = new object(
    "CO2",
    150,
    400,
    50,
    50,
    false,
    [250, 70, 70],
    true,
    0
  );
  objects[1] = new object(
    "RuBP",
    400,
    400,
    60,
    60,
    false,
    [10, 140, 140],
    true,
    0
  );
  objects[2] = new object(
    "Rubisco",
    600,
    400,
    80,
    80,
    false,
    [250, 100, 50],
    true,
    0
  );
}

function maren() {
  background(240, 250, 255);

  // Draw title
  push();
  fill(50, 100, 150);
  textSize(28);
  textAlign(CENTER);
  text("The Calvin Cycle", width / 2, height - 30);
  pop();

  // Run current scene
  if (marenScene === 0) {
    scene0_Introduction();
  } else if (marenScene === 1) {
    scene1_CarbonFixation();
  } else if (marenScene === 2) {
    scene2_Forming3PGA();
  } else if (marenScene === 3) {
    scene3_EnergyInput();
  } else if (marenScene === 4) {
    scene4_CreateG3P();
  } else if (marenScene === 5) {
    scene5_ExportG3P();
  } else if (marenScene === 6) {
    scene6_RegenerateRuBP();
  } else if (marenScene === 7) {
    scene7_Complete();
  }

  // Draw all objects
  runObjects();

  // Draw textbox for current scene
  marenTextboxes[marenScene].draw();

  // Draw and handle NEXT button
  drawMarenNextButton();
}

function scene0_Introduction() {
  // Just show the objects statically
  marenAnimationProgress = 100; // Scene complete immediately
}

function scene1_CarbonFixation() {
  // Animate CO2 and RuBP moving toward Rubisco
  if (marenAnimationProgress < 100) {
    let co2 = objects[0];
    let rubp = objects[1];
    let rubisco = objects[2];

    let targetX = rubisco.x;
    let targetY = rubisco.y - 40;

    // Move CO2 toward Rubisco
    co2.x += (targetX - co2.x) * 0.03;
    co2.y += (targetY - co2.y) * 0.03;

    // Move RuBP toward Rubisco from other side
    rubp.x += (targetX - rubp.x) * 0.03;
    rubp.y += (targetY + 40 - rubp.y) * 0.03;

    marenAnimationProgress++;

    // Check if reached target
    if (
      dist(co2.x, co2.y, targetX, targetY) < 10 &&
      dist(rubp.x, rubp.y, targetX, targetY + 40) < 10
    ) {
      marenAnimationProgress = 100;
    }
  }
}

function scene2_Forming3PGA() {
  // Replace CO2 and RuBP with 3PGA molecules
  if (marenAnimationProgress === 0) {
    objects.length = 0;

    // Create two 3-PGA molecules where the reaction happened
    let centerX = 600;
    let centerY = 380;

    objects[0] = new object(
      "3PG",
      centerX - 60,
      centerY,
      55,
      55,
      false,
      [180, 180, 220],
      true,
      0
    );
    objects[1] = new object(
      "3PG",
      centerX + 60,
      centerY,
      55,
      55,
      false,
      [180, 180, 220],
      true,
      0
    );
    objects[2] = new object(
      "Rubisco",
      centerX,
      centerY + 80,
      70,
      70,
      false,
      [250, 100, 50],
      true,
      0
    );

    marenAnimationProgress = 100;
  }
}

function scene3_EnergyInput() {
  // Add ATP and NADPH, move them toward 3PGA
  if (marenAnimationProgress === 0) {
    // Add ATP and NADPH to the scene (keep existing 3PGA from scene 2)
    objects[3] = new object(
      "ATP",
      100,
      200,
      45,
      45,
      false,
      [255, 220, 60],
      true,
      0
    );
    objects[4] = new object(
      "NADPH",
      100,
      400,
      45,
      45,
      false,
      [140, 200, 255],
      true,
      0
    );
    marenAnimationProgress = 1;
  }

  if (marenAnimationProgress > 0 && marenAnimationProgress < 100) {
    let atp = objects[3];
    let nadph = objects[4];
    let targetX = 400;
    let targetY = 400;

    // Move toward center
    atp.x += (targetX - 30 - atp.x) * 0.02;
    atp.y += (targetY - 40 - atp.y) * 0.02;

    nadph.x += (targetX + 30 - nadph.x) * 0.02;
    nadph.y += (targetY + 40 - nadph.y) * 0.02;

    marenAnimationProgress++;

    if (
      dist(atp.x, atp.y, targetX - 30, targetY - 40) < 15 &&
      dist(nadph.x, nadph.y, targetX + 30, targetY + 40) < 15
    ) {
      marenAnimationProgress = 100;
    }
  }
}

function scene4_CreateG3P() {
  // Replace 3PGA + ATP + NADPH with 6 G3P molecules
  if (marenAnimationProgress === 0) {
    objects.length = 0;

    // Create 6 G3P molecules in a circle
    let centerX = 400;
    let centerY = 400;
    let radius = 120;

    for (let i = 0; i < 6; i++) {
      let angle = (((i * 360) / 6) * Math.PI) / 180;
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      objects[i] = new object(
        "G3P",
        x,
        y,
        45,
        45,
        false,
        [120, 255, 100],
        true,
        0
      );
    }

    marenAnimationProgress = 100;
  }
}

function scene5_ExportG3P() {
  // Move one G3P out of the cycle
  if (marenAnimationProgress < 100) {
    let exportG3P = objects[0];

    // Move toward top-right corner
    exportG3P.x += (width - 80 - exportG3P.x) * 0.03;
    exportG3P.y += (80 - exportG3P.y) * 0.03;

    marenAnimationProgress++;

    if (dist(exportG3P.x, exportG3P.y, width - 80, 80) < 10) {
      marenAnimationProgress = 100;
    }
  }
}

function scene6_RegenerateRuBP() {
  // Move remaining 5 G3P together and transform to 3 RuBP
  if (marenAnimationProgress < 60) {
    let centerX = 400;
    let centerY = 400;

    // Move G3P molecules toward center (objects 1-5)
    for (let i = 1; i < 6; i++) {
      if (objects[i]) {
        objects[i].x += (centerX - objects[i].x) * 0.02;
        objects[i].y += (centerY - objects[i].y) * 0.02;
      }
    }

    marenAnimationProgress++;
  } else if (marenAnimationProgress === 60) {
    // Replace with 3 RuBP molecules
    objects.length = 0;

    let centerX = 400;
    let centerY = 400;

    for (let i = 0; i < 3; i++) {
      let angle = ((i * 120 + 90) * Math.PI) / 180;
      let x = centerX + 80 * Math.cos(angle);
      let y = centerY + 80 * Math.sin(angle);
      objects[i] = new object(
        "RuBP",
        x,
        y,
        60,
        60,
        false,
        [10, 140, 140],
        true,
        0
      );
    }

    marenAnimationProgress = 100;
  }
}

function scene7_Complete() {
  // Show cycle diagram with all components
  if (marenAnimationProgress === 0) {
    objects.length = 0;

    // Show cycle ready to repeat
    objects[0] = new object(
      "CO2",
      160,
      260,
      45,
      45,
      false,
      [250, 70, 70],
      true,
      0
    );
    objects[1] = new object(
      "RuBP",
      400,
      320,
      55,
      55,
      false,
      [10, 140, 140],
      true,
      0
    );
    objects[2] = new object(
      "Rubisco",
      400,
      470,
      75,
      75,
      false,
      [250, 100, 50],
      true,
      0
    );
    //objects[3] = new object("G3P", 680, 120, 50, 50, false, [120, 255, 100], true, 0);
    //objects[4] = new object("ATP", 120, 220, 40, 40, false, [255, 220, 60], true, 0);
    //objects[5] = new object("NADPH", 120, 320, 40, 40, false, [140, 200, 255], true, 0);

    marenAnimationProgress = 100;
  }
}

function drawMarenNextButton() {
  // Only show button when animation is complete
  if (marenAnimationProgress < 100) {
    return;
  }
  if (marenScene == 7) {
    nextButton();
  } else {
    push();
    translate(marenNextBtn.x, marenNextBtn.y);
    rectMode(CENTER);
    fill("black");
    strokeWeight(10);
    stroke("white");

    if (marenNextBtn.hover) {
      marenNextBtn.sizev = max(0.05, marenNextBtn.sizev);
      scale(marenNextBtn.size, marenNextBtn.size);
    } else {
      marenNextBtn.sizev = min(0.01, marenNextBtn.sizev);
      scale(marenNextBtn.size, marenNextBtn.size);
    }

    rect(0, 0, marenNextBtn.sizeX, marenNextBtn.sizeY, 5);
    textAlign(CENTER);
    textSize(35);
    fill("white");
    noStroke();
    rotate(cos(frameCount * 2) * 5);
    text(
      marenScene >= 7 ? "DONE" : "NEXT",
      0,
      12,
      marenNextBtn.sizeX,
      marenNextBtn.sizeY
    );
    pop();

    marenNextBtn.work();

    if (marenNextBtn.clicked && marenAnimationProgress >= 100) {
      if (marenScene < 7) {
        marenScene++;
        marenAnimationProgress = 0;
      }
    }
  }
}
