var leoScreen = 0;
var stop = true;
var lysis = false;
var lysisStarted = false; // controls Lysis animation
var oxydation = false;
var link = false;
var phosphorylated = false;
var phospho = 0;
var phosphoTimer = 0;
var phosphoDelay = 80;
var transition = 0;  // tracks current step
var nadhmove1 = false;
var nadhmove2 = false;
var ms = 80;
var ms2 = 80;
var pyr = true;
var utimer = 0;
var linkdelay = 0;
var timeRan = 0;
var timeRin = 0;
var timeRen = 0;
var mdelay = 0;
var objects = [];

var pdescription =
  "Phosphorylation is the first step in glycolysis, where two ATP " +
  "molecules phosphorylize a glucose molecule by donating it one " +
  "phosphate group each, turning the glucose molecule into a " +
  "glucose-6-phosphate, and the two ATP molecules into ADP. This " +
  "is also known as the energy investment phase";

var linkdes =
  "The Link Reaction is the step connecting Glycolysis to the Krebs cycle. It " +
  "happens in the mitochondria, where each pyruvate from glycolysis is oxidized, " +
  "turning into an acetyl group, releasing CO2 and reducing NAD+ to NADH. The acetyl group is now attached " +
  "to CoA, forming Acetyl CoA, which will go to the Krebs Cycle.";

var odes =
  "The final stage of glycolysis, oxidation, also known as the payoff phase, is " +
  "where G3P gets oxidized, turning into pyruvate. G3P then gets further oxidized, " +
  "reducing NAD+ to NADH. Four phosphate groups are transferred to ADP, making ATP.";

var pdes2 =
  "This is where the two ATP transfer a phosphate group each to the glucose molecule";

var ldes =
  "The second step of glycolysis is lysis, where glucose is broken " +
  "down into two glyceraldehyde-3-phosphates (G3P). The ADPs leave the system.";

var ldes2 = "Here is where the ATP molecules disperse, and G3P remains";

// Setup buttons and objects
function leoSetup() {
  // createCanvas(800, 600);

  button = createButton("Phosphorylation");
  button.position(20, 20);
  button.mousePressed(startPhosphorylation);
  button.style("font-size", "24px");
  button.style("padding", "15px");
  button.style("border-radius", "10px");
  button.style("cursor", "pointer");
  button.hide();

  button1 = createButton("Lysis");
  button1.position(20, 20);
  button1.mousePressed(startLysis);
  button1.style("font-size", "24px");
  button1.style("padding", "15px");
  button1.style("border-radius", "10px");
  button1.style("cursor", "pointer");
  button1.hide();

  button2 = createButton("Oxidation");
  button2.position(20, 20);
  button2.mousePressed(startOxydation);
  button2.style("font-size", "24px");
  button2.style("padding", "15px");
  button2.style("border-radius", "10px");
  button2.style("cursor", "pointer");
  button2.hide();

  button3 = createButton("Link Reaction");
  button3.position(20, 20);
  button3.mousePressed(startLink);
  button3.style("font-size", "24px");
  button3.style("padding", "15px");
  button3.style("border-radius", "10px");
  button3.style("cursor", "pointer");
  button3.hide();

  objects = [];
  // Glucose
  objects.push(new object("Glucose", 100, 380, 120, 120, false, [255,0,0], true, 0));
  // ATP
  objects.push(new object("ATP", 600, 420, 140, 120, false, [], true, 0));
  objects.push(new object("ATP", 650, 320, 140, 120, false, [], true, 0));
  // ADP
  objects.push(new object("ADP", -100, -100, 140, 120, false, [], true, 0));
  objects.push(new object("ADP", -100, -100, 140, 120, false, [], true, 0));
  // Phosphates
  objects.push(new object("Phosphate group", -100, -100, 60, 60, false, [0,255,0], true, 0));
  objects.push(new object("Phosphate group", -100, -100, 60, 60, false, [0,255,0], true, 0));
  // G3P
  objects.push(new object("G3P", -100, -100, 140, 120, false, [], true, 0));
  objects.push(new object("G3P", -100, -100, 140, 130, false, [0,255,0], false, 0));
  // NAD+
  objects.push(new object("NAD+", -570, 390, 100, 100, false, [0,255,0], true, 0));
  objects.push(new object("NAD+", -400, 390, 100, 100, false, [0,255,0], true, 0));
  // Extra phosphates for oxidation
  objects.push(new object("Phosphate group", 220, 390, 50, 50, false, [0,255,0], false, 0));
  objects.push(new object("Phosphate group", -100, -100, 50, 50, false, [0,255,0], false, 0));
  objects.push(new object("Phosphate group", 400, 390, 50, 50, false, [0,255,0], false, 0));
  objects.push(new object("Phosphate group", -100, -100, 50, 50, false, [0,255,0], false, 0));
  // Pyruvate
  objects.push(new object("Pyruvate", 100, 380, 140, 130, false, [0,255,0], false, 0));
  objects.push(new object("Pyruvate", 250, 380, 140, 130, false, [0,255,0], false, 0));
  // H and electrons
  objects.push(new object("H", 175, 345, 45, 45, false, [0,255,0], false, 0));
  objects.push(new object("H", 355, 345, 45, 45, false, [0,255,0], false, 0));
  objects.push(new object("Electron", 175, 345, 45, 45, false, [0,255,0], false, 0));
  objects.push(new object("Electron", 355, 345, 45, 45, false, [0,255,0], false, 0));
  objects.push(new object("Electron", 135, 345, 45, 45, false, [0,255,0], false, 0));
  objects.push(new object("Electron", 315, 345, 45, 45, false, [0,255,0], false, 0));
  // NADH
  objects.push(new object("NADH", -100, 390, 100, 100, false, [0,255,0], false, 0));
  objects.push(new object("NADH", -100, 390, 100, 100, false, [0,255,0], false, 0));
  // ATP for oxidation
  for (let i=0; i<4; i++) objects.push(new object("ATP", -100, -100, 140, 130, false, [0,255,0], false, 0));
  // H2O
  objects.push(new object("H2O", -100, -100, 100, 100, false, [0,255,0], false, 0));
  objects.push(new object("H2O", -100, -100, 100, 100, false, [0,255,0], false, 0));
  // CO2
  objects.push(new object("CO2", 180, 400, 100, 100, false, [0,255,0], false, 0));
  objects.push(new object("CO2", 360, 400, 100, 100, false, [0,255,0], false, 0));
  // Acetyl CoA
  objects.push(new object("Acetyl CoA", 160, 390, 130, 140, false, [0,255,0], false, 0));
  objects.push(new object("Acetyl CoA", 340, 390, 130, 140, false, [0,255,0], false, 0));
}

// Main function
function leo() {
  background(220);
  leoScreen = transition;

  // Step 0: Phosphorylation
  if (leoScreen==0) {
    button.show();
    fill(0); textSize(22); text(pdescription, 260,30,530);
    if(phosphorylated){
      // phosphates appear
      objects[5].x = objects[0].x-20; objects[5].y = objects[0].y-80;
      objects[6].x = objects[0].x+20; objects[6].y = objects[0].y-80;
      // ATPs become ADPs
      objects[1].type="ADP"; objects[2].type="ADP";
      if(phospho==0){ phospho=1; phosphoTimer=0;}
      if(phospho==1){
        phosphoTimer++;
        if(phosphoTimer>=phosphoDelay){
          objects[3].working=true; objects[4].working=true;
          textSize(22); text(pdes2,360,280,400);
          transition=1;
          objects[1].working=false
          objects[2].working=false
        }
      }
    }
  }

  // Step 1: Lysis
  else if (leoScreen==1){
    button1.show(); button.hide();
    text(ldes, 220,30,530);
    text(ldes2,320,320,460);

    if (lysisStarted) { // animation only happens after clicking Lysis
      // ADPs move off-screen
      objects[3].x -= 3; objects[4].x +=3;
      // Show phosphates
      objects[5].x = 210; objects[5].y=335; objects[5].sizeX=50; objects[5].sizeY=50;
      objects[6].x = 250; objects[6].y=335; objects[6].sizeX=50; objects[6].sizeY=50;
      // Show G3P
      objects[7].x=210; objects[7].y=340; objects[8].x=210; objects[8].y=400;

      if(timeRan<20){
        timeRan++;
        particleShower(objects[7].x, objects[7].y,500,0,40,0,0.6,0,2,0,20,0,255,0,0,20);
      }
      if(timeRan>=20) transition=2; // advance transition after animation
    }
  }

  // Step 2: Oxidation
  else if(leoScreen==2){
    button1.hide(); button2.show(); textSize(19); text(odes,200,25,525);
    for(let idx of [9,10,11,12,13,14,17,18,19,20,21,22,23,24,25,26,27,28,29,30]){
      objects[idx].working=true;
    }
    if(oxydation){
      for(let i=3;i<=6;i++){objects[i].x +=5;}
      for(let idx of [9,10,17,18,19,20,21,22]){ objects[idx].x += 3; }
      for(let idx of [11,12,13,14]){
        objects[idx].x += (objects[idx-8].x - objects[idx].x)*0.05;
        objects[idx].y += (objects[idx-8].y - objects[idx].y)*0.05;
      }
      for(var i=0;i<objects.length;i++){
        objects[i].working=false
        
      }
      objects[15].working=true
      objects[16].working=true
      
      
      if(objects[9].x>800-800 && objects[10].x>800-800) transition=3;
    }
  }

  // Step 3: Link reaction
  else if(leoScreen==3){
     imageMode(CENTER);
    image(Mitochondria,370,290,ms,ms2); mdelay++;
    if(mdelay>0 && mdelay<180){
      ms*=1.1; ms2*=1.1;
      
      button2.hide(); button3.show();
    }
    textSize(22); text(linkdes,223,25,545);
    if(mdelay>190){ 
      if(link){
        objects[15].x += (160 - objects[15].x)*0.05; objects[15].y += (390-objects[15].y)*0.05;
        objects[16].x += (340 - objects[16].x)*0.05; objects[16].y += (390-objects[16].y)*0.05;
        // for(let idx of [23,24]){objects[idx].x +=3; objects[idx].y -=1;}
        // for(let idx of [19,20,21,22]){objects[idx].x +=3; objects[idx].y -=1;}
        objects[15].type="Acetyl CoA"
        objects[16].type="Acetyl CoA"
        transition=4
        // if(objects[15].x>159 && objects[16].x>339) transition=4;
      }
                   // print("going")
    }
  }else if(leoScreen==4){
    button3.hide()
    imageMode(CENTER);
    image(Mitochondria,370,290,ms,ms2);
    textSize(22); text(linkdes,223,25,545);
    for(var i=0;i<objects.length;i++){
      objects[i].working=false
    }
    objects[15].working=true
    objects[16].working=true
    nextButton()
  }
}

// Button functions
function startPhosphorylation(){ phosphorylated=true; }
function startLysis(){ lysisStarted=true; }
function startOxydation(){ oxydation=true; }
function startLink(){ link=true; }
