var aviscreen = 1;
var screen0textline1 =
  "Photorespiration is what happens when in the \nCalvin Cycle, Oxygen goes in as an input \ninstead of carbon dioxide, which creates a \nmajor flaw in the photosyntheis. What happens \nis: when photorespiration happens, the plant \ncan no longer produce its 12 3-PGA, only \n6 3-PGA and 6 Phosphoglycolate, a two carbon \nmolecule. The plant has a net -3 carbons ending \nup with 9 carbons instead of 12, which causes \nthe plant to not be able to produce glucose. For \nthe RuBP to regenerate, the plant needs 10 G3P \ncarbons, and with only 9, it cannot regenerate\n its own carbon fixation system, and doesn't \ncome close to the two more carbons needed to \ncreate glucose. This ends up with the plant not \nbeing able to perform photosynthesis.";
var screen1textline1 = "blah blah blah";

var avinextButton;
var avinextButton2;

function aviSetup() {
  fill("black")
  objects[17] = new object("ADP", 75, 270, 70, 70, true, [1, 1, 1], false, 0);
  objects[16] = new object(
    "line1",
    300,
    50,
    100,
    50,
    false,
    [1, 1, 1],
    false,
    0
  );
  objects[15] = new object("pep", 200, 80, 100, 100, true, [1, 1, 1], false, 0);
  objects[14] = new object(
    "downline",
    200,
    140,
    50,
    50,
    false,
    [1, 1, 1],
    false,
    180
  );
  objects[13] = new object(
    "twistline",
    150,
    200,
    50,
    50,
    false,
    [1, 1, 1],
    false,
    0
  );
  objects[12] = new object(
    "curvyline",
    400,
    300,
    450,
    100,
    false,
    [1, 1, 1],
    false,
    0
  );
  objects[11] = new object(
    "downline",
    600,
    200,
    75,
    75,
    false,
    [1, 1, 1],
    false,
    0
  );
  objects[10] = new object(
    "line1",
    490,
    80,
    50,
    200,
    false,
    [1, 1, 1],
    false,
    90
  );
  objects[9] = new object("CO2", 400, 380, 90, 80, false, [
    110,
    121,
    300,
    false,
    0,
  ]);
  objects[8] = new object(
    "circle",
    400,
    540,
    250,
    250,
    false,
    [110, 121, 300],
    false,
    0
  );
  objects[7] = new object(
    "Glucose",
    400,
    700,
    90,
    80,
    false,
    [105, 121, 300],
    false,
    0
  );
  objects[6] = new object(
    "Rubisco",
    550,
    480,
    90,
    80,
    false,
    [105, 121, 300],
    false,
    0
  );
  objects[5] = new object(
    "Malate",
    600,
    250,
    90,
    80,
    false,
    [105, 121, 300],
    false,
    0
  );
  objects[4] = new object(
    "Oxyloacetate",
    600,
    125,
    90,
    80,
    false,
    [105, 60, 67],
    false,
    0
  );
  objects[3] = new object(
    "Pyruvate",
    220,
    200,
    90,
    80,
    false,
    [105, 60, 67],
    false,
    0
  );
  objects[2] = new object(
    "PEP carboxylase",
    360,
    200,
    150,
    130,
    false,
    [10, 120, 130],
    false,
    0
  );
  objects[1] = new object(
    "CO2",
    400,
    35,
    90,
    80,
    false,
    [10, 240, 110],
    false,
    0
  );
  objects[0] = new object(
    "ATP",
    75,
    200,
    80,
    80,
    false,
    [10, 240, 110],
    false,
    0
  );
}
function avi() {
  background("white");

  avinextButton = new button(690, 750, 185, 70);
  avinextButton2 = new button(120, 750, 185, 70);

  if (aviscreen == 1) {
    background("white");
    textSize(35);
    text(screen0textline1, 30, 40);
    avinextBtn();
  }
  if (aviscreen == 2) {
    background("white");
    fill(0, 255, 0, 127);
    rect(25, 25, 750, 300);
    fill(10, 150, 10, 127);
    rect(25, 350, 750, 400);
    fill("black");
    textSize(30);
    text("Mesophyll Cell", 580, 60);
    text("Bundle-Sheath Cell", 530, 390);
    objects[0].working = true;
    objects[1].working = true;
    objects[2].working = true;
    objects[3].working = true;
    objects[4].working = true;
    objects[5].working = true;
    objects[6].working = true;
    objects[7].working = true;
    objects[8].working = true;
    objects[9].working = true;
    objects[10].working = true;
    objects[11].working = true;
    objects[12].working = true;
    objects[13].working = true;
    objects[14].working = true;
    objects[15].working = true;
    objects[16].working = true;
    objects[17].working = true;
    avinextBtn2();
  }

  if (aviscreen == 3) {
    fill(0, 127);
    rect(25, 25, 750, 300);
    fill(150, 150, 0, 127);
    rect(25, 350, 750, 400);
    fill("black");
    textSize(30);
    text("Mesophyll Cell - Night", 490, 60);
    text("Bundle-Sheath Cell - Day", 450, 390);
    objects[0].working = true;
    objects[1].working = true;
    objects[2].working = true;
    objects[3].working = true;
    objects[4].working = true;
    objects[5].working = true;
    objects[6].working = true;
    objects[7].working = true;
    objects[8].working = true;
    objects[9].working = true;
    objects[10].working = true;
    objects[11].working = true;
    objects[12].working = true;
    objects[13].working = true;
    objects[14].working = true;
    objects[15].working = true;
    objects[16].working = true;
    
    
    nextButton()
    
  }
}

function avinextBtn() {
  push();
  translate(avinextButton.x, avinextButton.y);
  rectMode(CENTER);
  fill("black");
  strokeWeight(10);
  stroke("white");
  if (avinextButton.hover) {
    avinextButton.sizev = max(0.05, avinextButton.sizev);
    scale(avinextButton.size, avinextButton.size);
  } else {
    avinextButton.sizev = min(0.01, avinextButton.sizev);
    scale(avinextButton.size, avinextButton.size);
  }
  rect(0, 0, avinextButton.sizeX, avinextButton.sizeY, 5);
  textAlign(CENTER);
  textSize(50);
  fill("white");
  noStroke();
  rotate(cos(frameCount * 2) * 5);
  text("NEXT", 0, 12, avinextButton.sizeX, avinextButton.sizeY);
  pop();
  avinextButton.work();
  if (avinextButton.clicked) {
    aviscreen += 1;
    console.log("Button detected");
  }
}

function avinextBtn2() {
  push();
  translate(avinextButton2.x, avinextButton2.y);
  rectMode(CENTER);
  fill("black");
  strokeWeight(10);
  stroke("white");
  if (avinextButton2.hover) {
    avinextButton2.sizev = max(0.05, avinextButton2.sizev);
    scale(avinextButton2.size, avinextButton2.size);
  } else {
    avinextButton2sizev = min(0.01, avinextButton2.sizev);
    scale(avinextButton2.size, avinextButton2.size);
  }
  rect(0, 0, avinextButton2.sizeX, avinextButton2.sizeY, 5);
  textAlign(CENTER);
  textSize(50);
  fill("white");
  noStroke();
  rotate(cos(frameCount * 2) * 5);
  text("NEXT", 0, 12, avinextButton2.sizeX, avinextButton2.sizeY);
  pop();
  avinextButton2.work();
  if (avinextButton2.clicked) {
    aviscreen += 1;
    console.log("Button 2 detected");
  }
}
