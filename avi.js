var aviscreen = 1;
var screen0textline1 =
  "Photorespiration is what happens when in the \nCalvin Cycle, Oxygen goes in as an input \ninstead of carbon dioxide, which creates a \nmajor flaw in the photosynthesis. What happens \nis: when photorespiration happens, the plant \ncan no longer produce its 12 3-PGA, only \n6 3-PGA and 6 Phosphoglycolate, a two carbon \nmolecule. The plant has a net -3 carbons ending \nup with 9 carbons instead of 12, which causes \nthe plant to not be able to produce glucose. For \nthe RuBP to regenerate, the plant needs 10 G3P \ncarbons, and with only 9, it cannot regenerate\n its own carbon fixation system, and doesn't \ncome close to the two more carbons needed to \ncreate glucose. This ends up with the plant not \nbeing able to perform photosynthesis.";
var screen1textline1 = "In C3 plants, there are 6CO2 (C3 for a three carbon molecule) in the initial \nfixation of the calvin cycle. In C4 plants, they have a 4-carbon molecule. \nIn C4, there are “bundle sheath” cells that don’t have direct access to the air; \nthey are more embedded. In the standard calvin cycle, everything happens in the mesophyll. \nIn C4 photosynthesis what happens is; the CO2 comes in and it reacts with \nPhosphoenol Pyruvic acid (PEP), which is a three carbon molecule. You end up \nwith a 4-carbon molecule. This reaction is facilitated by a different enzyme \n(not RuBP), PEP Carboxylase, which cannot react with oxygen. This is \nin turn useful for preventing photorespiration because there is no RuBisCO, \nso it can’t react with oxygen. (**NOTE: Phosphoenol Pyruvic Acid is \ndifferent than PEPC, or Phosphoenolpyruvate Carboxylase. When the CO2 \nand the Pyruvate react , it creates Oxaloacetate. The Oxaloacetate gets \nconverted into another 4-carbon molecule, malate or aspartate. The malate \nwill react to produce CO2. The point to this is because the malate is being \nconverted back into PEP and CO2. This last step prevents photorespiration \nbecause the malate gets transferred into the bundle sheath, through a little \ncell named plasmodesmata. \n \nThe next slide shows a draft of what C4 photosynthesis looks like.  \nPress the next button to go to the next slide. PLEASE DO NOTE THAT \nTHERE IS NO BACK BUTTON, SO MAKE SURE TO READ THIS \nSLIDE CAREFULLY BEFORE PRESSING IT.";
var screen2text1line1 = "CAM (Crassulacean Acid Metabolism) photosynthesis is an adaptation  to \nC4 photosynthesis that saves water. In CAM photosynthesis, plants fix CO2 \nat night by opening their stomata, and storing it as an organic acid in their \nvacuoles (***NOTE: The CO2 is fixed into malate, as demonstrated in C4 \nphotosynthesis. This allows plants to skip a few steps of the C4 process, \nalthough it is shown the same). During the day, the stomata remains closed \nto conserve water, and the stored organic acid is released and used for \nphotosynthesis. This temporal separation of gas exchange and carbon \nfixation allows plants in hot and dry environments to thrive, as seen in \nsucculents like cacti and pineapples. This is a really interesting version of \nphotosynthesis, due to the modification that plants have evolved into, which \nis quite smart and allows them to save water. \n \nThe next slide shows a draft of what C4 photosynthesis looks like.  \nPress the next button to go to the next slide. \n \nPLEASE DO NOTE THAT THERE IS NO BACK BUTTON, SO MAKE \nSURE TO READ THIS SLIDE CAREFULLY BEFORE PRESSING THE \nNEXT BUTTON."
var avinextButton;
var avinextButton2;
var avinextButton3;
var avinextButton4;
var avinextButton5;
var avinextButton6;
function aviSetup() {
  objects[17] = new object("ADP", 75, 270, 70, 70, true, [1, 1, 1], false, 0);
  objects[16] = new object("line1",300,50,100,50,true,[1, 1, 1],false,0);
  objects[15] = new object("pep", 200, 80, 100, 100, true, [1, 1, 1], false, 0);
  objects[14] = new object("downline",200,140,50,50,true,[1, 1, 1],false,180);
  objects[13] = new object("twistline",150,200,50,50,true,[1, 1, 1],false,0);
  objects[12] = new object("curvyline",400,300,450,100,false,[1, 1, 1],false,0);
  objects[11] = new object("downline",600,200,75,75,false,[1, 1, 1],false,0);
  objects[10] = new object("line1",490,80,50,200,false,[1, 1, 1],false,90);
  objects[9] = new object("CO2", 400, 380, 90, 80, false, [110,121,300],false,0);
  objects[8] = new object("circle",400,540,250,250,false,[110, 121, 300],false,0);
  objects[7] = new object("Glucose",400,700,90,80,true,[105, 121, 300],false,0);
  objects[6] = new object("Rubisco",550,480,90,80,true,[105, 121, 300],false,0);
  objects[5] = new object("Malate",600,250,90,80,true,[105, 121, 300],false,0);
  objects[4] = new object("Oxyloacetate",600,125,90,80,true, [105, 60, 67], false, 0);
  objects[3] = new object("Pyruvate",220,200,90,80,true,[105, 60, 67],false,0);
  objects[2] = new object( "PEP carboxylase",360,200,150,130,true,[10, 120, 130],false,0);
  objects[1] = new object("CO2",400,35,90,80,true,[10, 240, 110],false,0);
  objects[0] = new object("ATP",75,200,80,80,true,[10, 240, 110],false,0);
}
function avi() {
  background("white");

  avinextButton = new button(690, 750, 185, 70);
  avinextButton2 = new button(120, 750, 185, 70);
  avinextButton3 = new button(690, 750, 185, 70);
  avinextButton4 = new button(120, 750, 185, 70);
  

  if (aviscreen == 1) {
    fill("black")
    background("white");
    textSize(35);
    text(screen0textline1, 30, 40);
    avinextBtn();
  
  }
  if(aviscreen==2){
    fill("black")
    textSize(25)
    text(screen1textline1,30,40)
    print("screen2")
    avinextBtn2()
  }
  if (aviscreen == 3) {
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
    avinextBtn3();

  }
   if(aviscreen==4){
objects[0].working = false;
objects[1].working = false;
objects[2].working = false;
objects[3].working = false;
objects[4].working = false;
objects[5].working = false;
objects[6].working = false;
objects[7].working = false;
objects[8].working = false;
objects[9].working = false;
objects[10].working = false;
objects[11].working = false;
objects[12].working = false;
objects[13].working = false;
objects[14].working = false;
objects[15].working = false;
objects[16].working = false;
objects[17].working = false;
textSize(25)
text(screen2text1line1,30,40)
print("screen2")
avinextBtn4()
  }
  
  

  if (aviscreen == 5) {
    
    fill(0, 127);
    rect(25, 25, 750, 300);
    fill(150, 150, 0, 127);
    rect(25, 350, 750, 400);
    fill("black");
    textSize(30);
    text("Mesophyll Cell - Night", 490, 60);
    text("Bundle-Sheath Cell - Day", 450, 390);
    text("Stomata", 30, 60);
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
function avinextBtn3() {
  push();
  translate(avinextButton3.x, avinextButton3.y);
  rectMode(CENTER);
  fill("black");
  strokeWeight(10);
  stroke("white");
  if (avinextButton3.hover) {
    avinextButton3.sizev = max(0.05, avinextButton3.sizev);
    scale(avinextButton3.size, avinextButton3.size);
  } else {
    avinextButton3sizev = min(0.01, avinextButton3.sizev);
    scale(avinextButton3.size, avinextButton3.size);
  }
  rect(0, 0, avinextButton3.sizeX, avinextButton3.sizeY, 5);
  textAlign(CENTER);
  textSize(50);
  fill("white");
  noStroke();
  rotate(cos(frameCount * 3) * 5);
  text("NEXT", 0, 13, avinextButton3.sizeX, avinextButton3.sizeY);
  pop();
  avinextButton3.work();
  if (avinextButton3.clicked) {
    aviscreen += 1;
    console.log("Button 3 detected");
  }
} 
function avinextBtn4() {
  push();
  translate(avinextButton4.x, avinextButton4.y);
  rectMode(CENTER);
  fill("black");
  strokeWeight(10);
  stroke("white");
  if (avinextButton4.hover) {
    avinextButton4.sizev = max(0.05, avinextButton4.sizev);
    scale(avinextButton4.size, avinextButton4.size);
  } else {
    avinextButton4sizev = min(0.01, avinextButton4.sizev);
    scale(avinextButton4.size, avinextButton4.size);
  }
  rect(0, 0, avinextButton4.sizeX, avinextButton4.sizeY, 5);
  textAlign(CENTER);
  textSize(50);
  fill("white");
  noStroke();
  rotate(cos(frameCount * 4) * 5);
  text("NEXT", 0, 14, avinextButton4.sizeX, avinextButton4.sizeY);
  pop();
  avinextButton4.work();
  if (avinextButton4.clicked) {
    aviscreen += 1;
    console.log("Button 4 detected");
  }
}
function avinextBtn5() {
  push();
  translate(avinextButton5.x, avinextButton5.y);
  rectMode(CENTER);
  fill("black");
  strokeWeight(10);
  stroke("white");
  if (avinextButton5.hover) {
    avinextButton5.sizev = max(0.05, avinextButton5.sizev);
    scale(avinextButton5.size, avinextButton5.size);
  } else {
    avinextButton5sizev = min(0.01, avinextButton5.sizev);
    scale(avinextButton5.size, avinextButton5.size);
  }
  rect(0, 0, avinextButton5.sizeX, avinextButton5.sizeY, 5);
  textAlign(CENTER);
  textSize(50);
  fill("white");
  noStroke();
  rotate(cos(frameCount * 5) * 5);
  text("NEXT", 0, 15, avinextButton5.sizeX, avinextButton5.sizeY);
  pop();
  avinextButton5.work();
  if (avinextButton5.clicked) {
    aviscreen += 1;
    console.log("Button 5 detected");
  }
}
//done!