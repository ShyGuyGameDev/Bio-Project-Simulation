var screen = 5
var particles=[]
var mouseClick=false
var objects=[]
var nextBtn;
var nextAnim=[50,1,34]
var nextAnimationSequence=new animation(nextAnim)
var setupRun=[false,false,false,false,false]
  
var Mitochondria;
var ThreeCarbonChain;
var ThreeBiphosphoglycerate;
var ThreePG;
var ADP;
var ATPSynthaseOne;
var ATPSynthaseTwo;
var ATP;
var AcetylCoA;
var Aconitic;
var AlphaK;
var AlphaKetogistalateDehydronase;
var BundleSheeth;
var COTwo;
var ChannelProtein;
var Chlorophyll;
var CisAconitic;
var Citrate;
var CoenzymeA;
var CoenzymeQ;
var ComplexOne;
var ComplexTwo;
var ComplexThree
var ComplexFour;
var CytochromeC;
var DIsositrate;
var Electron;
var ExcitedElectron;
var FAD;
var FADH;
var Fumeras;
var Fumerate;
var GThreeP;
var GDP;
var GTP;
var Glucose;
var H;
var HTwoO;
var IsositrateDehydrogenase;
var Malate;
var MesophyllOne;
var MesophyllTwo;
var Moon;
var NADPlus;
var NADPH;
var NADH;
var NADPPlus;
var NitrateSynthase;
var OTwo;
var Oxyloacetate;
var PEPCarboxylase;
var PhosphateGroup;
var Phospholipid;
var Photon;
var Photosystem;
var Pi;
var Pyruvate;
var QHTwo;
var RuBP;
var Rubisco;
var SuccinylCoASynthase;
var SuccinylCoA;
var Succinyl;
var Sun;
var Ubiquinose;
var Circle;
var Line1;
var Downline;
var Curvyline;
var Twistline;
var Pep;
var Krebs;





function preload(){
  Mitochondria=loadImage("Art/download__22_-removebg-preview.png")
  ThreeCarbonChain=loadImage("Art/3 Carbon Chain.png")
  ThreeBiphospholgycerate=loadImage("Art/3Biphosphoglycerate.png")
  ThreePG=loadImage("Art/3PG.png")
  ADP=loadImage("Art/ADP.png")
  ATPSynthase1=loadImage("Art/ATP Synthase 1.png")
  ATPSynthase2=loadImage("Art/ATP Synthase 2.png")
  Atp=loadImage("Art/Atp.png")
  AcetylCoA=loadImage("Art/Acetyl CoA.png")
  Aconitic=loadImage("Art/Aconitic.png")
  AlphaK=loadImage("Art/Alpha-K.png")
  AlphaKetogistalateDehydronase=loadImage("Art/Alpha-ketogistalate dehydronase.png")
  BundleSheeth=loadImage("Art/Bundle sheeth.png")
  COTwo=loadImage("Art/CO2.png")
  ChannelProtein=loadImage("Art/Channel protein.png")
  Chlorophyll=loadImage("Art/Chlorophyll.png")
  CisAconitic=loadImage("Art/Cis Aconitic.png")
  Citrate=loadImage("Art/Citrate.png")
  CoenzymeA=loadImage("Art/Coenzyme A.png")
  CoenzymeQ=loadImage("Art/Coenzyme Q.png")
  ComplexOne=loadImage("Art/Complex I.png")
  ComplexTwo=loadImage("Art/Complex II.png")
  ComplexThree=loadImage("Art/Complex III.png")
  ComplexFour=loadImage("Art/Complex IV.png")
  CytochromeC=loadImage("Art/Cytochrome C.png")
  DIsositrate=loadImage("Art/D-Isositrate.png")
  Electron=loadImage("Art/Electron.png")
  ExcitedElectron=loadImage("Art/Excited electron.png")
  FAD=loadImage("Art/FAD.png")
  FADH=loadImage("Art/FADH.png")
  Fumeras=loadImage("Art/Fumeras.png")
  Fumerate=loadImage("Art/Fumerate.png")
  GThreeP=loadImage("Art/G3P.png")
  GDP=loadImage("Art/GDP.png")
  GTP=loadImage("Art/GTP.png")
  Glucose=loadImage("Art/Glucose.png")
  H=loadImage("Art/H.png")
  HTwoO=loadImage("Art/H2O.png")
  IsositrateDehydrogenase=loadImage("Art/Isositrate Dehydrogenase.png")
  Malate=loadImage("Art/Malate.png")
  MesophyllOne=loadImage("Art/Mesophyll1.png")
  MesophyllTwo=loadImage("Art/Mesophyll2.png")
  Moon=loadImage("Art/Moon.png")
  NADPPlus=loadImage("Art/NADP+.png")
  NADPH=loadImage("Art/NADPH.png")
  NADH=loadImage("Art/NADH.png")
  NADPlus=loadImage("Art/NAD+.png")
  NitrateSynthase=loadImage("Art/Nitrate Synthase.png")
  OTwo=loadImage("Art/O2.png")
  Oxyloacetate=loadImage("Art/Oxyloacetate.png")
  PEPCarboxylase=loadImage("Art/PEP carboxylase.png")
  PhosphateGroup=loadImage("Art/Phosphate group.png")
  Phospholipid=loadImage("Art/Phospholipid.png")
  Photon=loadImage("Art/Photon.png")
  Photosystem=loadImage("Art/Photosystem.png")
  Pi=loadImage("Art/Pi.png")
  Pyruvate=loadImage("Art/Pyruvate.png")
  QHTwo=loadImage("Art/QH2.png")
  RuBP=loadImage("Art/RuBP.png")
  Rubisco=loadImage("Art/Rubisco.png")
  SuccinylCoASynthase=loadImage("Art/Succinyl CoA Synthase.png")
  SuccinylCoa=loadImage("Art/Succinyl CoA.png")
  Succinyl=loadImage("Art/Succinyl.png")
  Sun=loadImage("Art/Sun.png")
  Ubiquinose=loadImage("Art/Ubiquinose.png")
  Circle=loadImage("Art/circle.png")
  Line1=loadImage("Art/line1.png")
  Downline=loadImage("Art/downline.png")
  Curvyline=loadImage("Art/curvyline.png")
  Twistline=loadImage("Art/twistline.png")
  Pep=loadImage("Art/pep.png")
  Krebs=loadImage("Art/download (1).png")
}

function setup() {
  createCanvas(800, 800);
  noStroke()
  angleMode(DEGREES)
  background(22)
  // objects[0]= new object("hi",width/2,height/2,20,20,true,[50,100,70])
  nextBtn= new button(width-150,height-80,185,70)
  textFont("Itim")
}



function draw() {
  background(22);
  // imageMode(CENTER)
  // image(CoenzymeA,width/2,height/2,width,height)
//   particleDemo();
  
  if(screen==-2){
    
    start()
    runParticles()
  runObjects()
  }else if(screen==-1){
    photosynthesis()
    runParticles()
  runObjects()
  }else if(screen==0){
    if(setupRun[0]==false){
      zoeSetup()
      setupRun[0]=true
    }
    
    zoe()
    runParticles()
  runObjects()
    
  }else if(screen==1){
    if(setupRun[1]==false){
      marenSetup()
      setupRun[1]=true
    }
    
    maren()
    runParticles()
  runObjects()
  }else if(screen==2){
    if(setupRun[2]==false){
      aviSetup()
      setupRun[2]=true
    }
    
    avi()
    runParticles()
  runObjects()
  }else if(screen==3){
    
    cellularRespiration()
    
  }else if(screen==4){
    if(setupRun[3]==false){
      leoSetup()
      setupRun[3]=true
    }
    
    leo()
    runParticles()
  runObjects()
  }else if(screen==5){
    if(setupRun[4]==false){
      shaayerSetup()
      setupRun[4]=true
    }
    runParticles()
  runObjects()
    shaayer()
  }else if(screen==6){
    andre()
  }else if(screen==7){
    conclusion()
  }
  
  
  
  nextAnimationSequence.work()
  nextButtonWork()
  mouseClick=false
}

function mouseClicked(){
  mouseClick=true
  console.log("Mouse X:" + mouseX + ", Mouse Y:" + mouseY)
}