// function nextAnimation(){
//   // if()
//   if(nextMoving){
//     nextAnimationSequence.work()
//     if(nextAnimationSequence.currentStage==0){
//       ellipse(nextAnimationSequence.totalCount/100*600)
//     }
//   }
// }

var buttonCounterVar=0

function nextButtonWork(){
  if(nextAnimationSequence.running && nextAnimationSequence.count>0){
    nextAnimationSequence.count+=1
    if(nextAnimationSequence.currentStage==0){
      // print("happening")
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,nextAnimationSequence.count*max(width,height)/nextAnimationSequence.stages[0]*1.5)
      pop()
    }else if(nextAnimationSequence.currentStage==1){
      screen+=1
      objects=[]
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,nextAnimationSequence.count*max(width,height)/nextAnimationSequence.stages[0]*1.5)
      pop()
    }else if(nextAnimationSequence.currentStage==2){
      // print("2")
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,max(width,height)*1.5-((nextAnimationSequence.count-nextAnimationSequence.stages[0]-nextAnimationSequence.stages[1])*max(width,height)/nextAnimationSequence.stages[2])*1.5)
      pop()
    }
  }
}

function nextButton(){
  push()
  translate(nextBtn.x,nextBtn.y)
  rectMode(CENTER)
  fill("black")
  strokeWeight(10)
  stroke("white")
  if(nextBtn.hover){
    nextBtn.sizev=max(0.05,nextBtn.sizev);
    scale(nextBtn.size,nextBtn.size);
  }else{
    nextBtn.sizev=min(0.01,nextBtn.sizev)
    scale(nextBtn.size,nextBtn.size)
  }
  rect(0,0,nextBtn.sizeX,nextBtn.sizeY,5)
  textAlign(CENTER)
  textSize(50)
  fill("white")
  noStroke()
  rotate(cos(frameCount*2)*5)
  text("NEXT",0,12,nextBtn.sizeX,nextBtn.sizeY)
  pop()
  nextBtn.work()
  if(nextBtn.clicked){
    if(buttonCounterVar<1){
      nextAnimationSequence.running=true
    nextAnimationSequence.count+=1
    }
     buttonCounterVar+=1
  }else{
    buttonCounterVar=0
  }
  
   // if (avinextButton.clicked) {
   //  if(aviCountVar<100)
   //  aviCountVar+=1
   //  aviscreen += 1;
   //  console.log("Button detected");
    
  // }else{
  //   // print("workrkk")
  //   aviCountVar=0
  // }
}

class animation{
  constructor(a){
    this.stages=a
    this.count=0
    this.currentStage=0
    this.totalCount=0
    this.running=false
  }
  work(){
    if(this.running){
      // print(this.count)
      this.currentStage=undefined
      for(var i=0;i<this.stages.length;i++){
      this.totalCount+=this.stages[i]
      if(this.count<this.totalCount && this.currentStage==undefined){
        this.currentStage=i
      }
      
      if(this.currentStage==this.stages.length-1 && this.count==this.totalCount-1){
        this.running=false
        this.count=0
        this.currentStage=0
        this.totalCount=0
      }
    }
    }
    this.totalCount=0 
  }
}

function runObjects(){
  for(var i=0;i<objects.length;i++){
    objects[i].work()
  }
}

function convertNumberToWord(numStr, numberWords){
  if(numberWords[numStr]){
    return numberWords[numStr]
  }
  var result = ""
  for(var i = 0; i < numStr.length; i++){
    if(numStr[i] === "0"){
      result += "Zero"
    } else if(numStr[i] === "1"){
      result += "One"
    } else if(numStr[i] === "2"){
      result += "Two"
    } else if(numStr[i] === "3"){
      result += "Three"
    } else if(numStr[i] === "4"){
      result += "Four"
    } else if(numStr[i] === "5"){
      result += "Five"
    } else if(numStr[i] === "6"){
      result += "Six"
    } else if(numStr[i] === "7"){
      result += "Seven"
    } else if(numStr[i] === "8"){
      result += "Eight"
    } else if(numStr[i] === "9"){
      result += "Nine"
    }
  }
  return result
}

function processWord(word, romanNumerals, numberWords){
  if(romanNumerals[word]){
    return romanNumerals[word]
  }
  
  if(word === "sheeth"){
    return "Sheeth"
  }
  
  if(!word.match(/[0-9]/)){ // match checks if the string has any digits using regex
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // charAt gets the character at index 0, toUpperCase makes it uppercase, slice gets everything from index 1 onward, toLowerCase makes it lowercase
  }
  
  var result = ""
  var currentPart = ""
  for(var i = 0; i < word.length; i++){
    if(word[i].match(/[0-9]/)){
      if(currentPart.length > 0){
        result += currentPart.charAt(0).toUpperCase() + currentPart.slice(1).toLowerCase()
        currentPart = ""
      }
      var numStart = i
      while(i < word.length && word[i].match(/[0-9]/)){
        i++
      }
      i--
      var numStr = word.substring(numStart, i + 1) // substring gets the part of the string between two indexes
      result += convertNumberToWord(numStr, numberWords)
    } else {
      currentPart += word[i]
    }
  }
  if(currentPart.length > 0){
    result += currentPart.charAt(0).toUpperCase() + currentPart.slice(1).toLowerCase()
  }
  return result
}

class object{
  constructor(a,b,c,d,e,f,g,h,i){
    this.type=a
    this.x=b
    this.y=c
    this.sizeX=d
    this.sizeY=e
    this.dragging=false
    this.clicks=0
    this.mouseOffsetX=0
    this.mouseOffsetY=0
    this.preX=a
    this.preY=b
    this.draggable=f
    this.working=h
    this.particleColor=g //if this is set to [], no particles. For particles, it has to be a list of three colors(can be "random")
    // print("wsg")
    this.rotation=i
  }
  display(){
    push()
    translate(this.x,this.y)
    angleMode(DEGREES)
    rotate(this.rotation)
    translate(-this.x,-this.y)
    imageMode(CENTER)
    
    // Commented out the old dynamic image loading code
    // var varName = this.typeToVariableName(this.type)
    // var img = window[varName]
    // 
    // if(img){
    //   image(img, this.x, this.y, this.sizeX, this.sizeY)
    // } else {
    //   ellipseMode(CENTER)
    //   if(this.particleColor=="random"){
    //     fill(random(0,255),random(0,255),random(0,255))
    //   }else if(this.particleColor==[]){
    //     fill("white")
    //   }else{
    //     fill(this.particleColor[0],this.particleColor[1],this.particleColor[2])
    //   }
    //   ellipse(this.x,this.y,this.sizeX,this.sizeY)
    // }
    
    // Hardcoded image display for each type
    if(this.type=="3 Carbon Chain"){
      image(ThreeCarbonChain, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="3Biphosphoglycerate"){
      image(ThreeBiphospholgycerate, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="3PG"){
      image(ThreePG, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="ADP"){
      image(ADP, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="ATP Synthase 1" || this.type=="ATPSynthase1"){
      image(ATPSynthase1, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="ATP Synthase 2" || this.type=="ATPSynthase2"){
      image(ATPSynthase2, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="ATP" || this.type=="Atp"){
      image(Atp, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Acetyl CoA"){
      image(AcetylCoA, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Aconitic"){
      image(Aconitic, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Alpha-K"){
      image(AlphaK, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Alpha-ketogistalate dehydronase"){
      image(AlphaKetogistalateDehydronase, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Bundle sheeth" || this.type=="Bundle Sheeth"){
      image(BundleSheeth, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="CO2" || this.type=="COTwo"){
      image(COTwo, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Channel protein" || this.type=="Channel Protein"){
      image(ChannelProtein, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Chlorophyll" || this.type=="chlorophyll"){
      image(Chlorophyll, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Cis Aconitic"){
      image(CisAconitic, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Citrate"){
      image(Citrate, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Coenzyme A"){
      image(CoenzymeA, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Coenzyme Q"){
      image(CoenzymeQ, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Complex I" || this.type=="ComplexOne"){
      image(ComplexOne, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Complex II" || this.type=="ComplexTwo"){
      image(ComplexTwo, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Complex III" || this.type=="ComplexThree"){
      image(ComplexThree, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Complex IV" || this.type=="ComplexFour"){
      image(ComplexFour, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Cytochrome C"){
      image(CytochromeC, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="D-Isositrate"){
      image(DIsositrate, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Electron" || this.type=="electron"){
      image(Electron, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Excited electron" || this.type=="excited electron"){
      image(ExcitedElectron, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="FAD"){
      image(FAD, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="FADH" || this.type=="FADH2"){
      image(FADH, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Fumeras"){
      image(Fumeras, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Fumerate"){
      image(Fumerate, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="G3P"){
      image(GThreeP, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="GDP"){
      image(GDP, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="GTP"){
      image(GTP, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Glucose"){
      image(Glucose, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="H"){
      image(H, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="H2O" || this.type=="HTwoO"){
      image(HTwoO, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Isositrate Dehydrogenase"){
      image(IsositrateDehydrogenase, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Malate"){
      image(Malate, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Mesophyll1" || this.type=="Mesophyll One"){
      image(MesophyllOne, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Mesophyll2" || this.type=="Mesophyll Two"){
      image(MesophyllTwo, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Moon"){
      image(Moon, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="NADP+" || this.type=="NADPlus"){
      image(NADPPlus, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="NAD+" || this.type=="NADPlus"){
      image(NADPlus,this.x,this.y,this.sizeX,this.sizeY)
    }else if(this.type=="NADPH"){
      image(NADPH, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="NADH"){
      image(NADH, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Nitrate Synthase"){
      image(NitrateSynthase, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="O2" || this.type=="OTwo"){
      image(OTwo, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Oxyloacetate"){
      image(Oxyloacetate, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="PEP carboxylase"){
      image(PEPCarboxylase, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Phosphate group"){
      image(PhosphateGroup, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Phospholipid" || this.type=="phospholipid"){
      image(Phospholipid, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Photon" || this.type=="photon"){
      image(Photon, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Photosystem" || this.type=="PSI" || this.type=="PSII"){
      image(Photosystem, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Pi"){
      image(Pi, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Pyruvate"){
      image(Pyruvate, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="QH2" || this.type=="QHTwo"){
      image(QHTwo, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="RuBP" || this.type=="RUBP"){
      image(RuBP, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Rubisco"){
      image(Rubisco, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Succinyl CoA Synthase"){
      image(SuccinylCoASynthase, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Succinyl CoA"){
      image(SuccinylCoa, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Succinyl"){
      image(Succinyl, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Sun"){
      image(Sun, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="Ubiquinose"){
      image(Ubiquinose, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="circle"){
      image(Circle,this.x,this.y,this.sizeX,this.sizeY)
    }else if(this.type=="line1"){
      image(Line1,this.x,this.y,this.sizeX,this.sizeY)
    }else if(this.type=="downline"){
      image(Downline, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="curvyline"){
      image(Curvyline, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="twistline"){
      image(Twistline, this.x, this.y, this.sizeX, this.sizeY)
    }else if(this.type=="pep"){
      image(Pep, this.x, this.y, this.sizeX, this.sizeY)
    }else{
      // Fallback to ellipse if no image matches
      ellipseMode(CENTER)
      if(this.particleColor=="random"){
        fill(random(0,255),random(0,255),random(0,255))
      }else if(this.particleColor==[]){
        fill("white")
      }else{
        fill(this.particleColor[0],this.particleColor[1],this.particleColor[2])
      }
      ellipse(this.x,this.y,this.sizeX,this.sizeY)
    }
    pop()
  }
  typeToVariableName(typeStr){
    if(typeStr === "PSI" || typeStr === "PSII"){
      return "Photosystem"
    }
    
    var romanNumerals = {
      "I": "One",
      "II": "Two",
      "III": "Three",
      "VI": "Four"
    }
    
    var numberWords = {
      "2": "Two",
      "3": "Three"
    }
    
    var words = typeStr.split(/[\s\-]+/)
    var result = ""
    
    for(var i = 0; i < words.length; i++){
      if(words[i].length > 0){
        result += processWord(words[i], romanNumerals, numberWords)
      }
    }
    
    return result
  }
  work(){
    if(this.working){
      this.drag()
    this.click()
    this.display()
    this.preY=this.y
    this.preX=this.x
    }
    
  }
  drag(){
    // print(mouseIsPressed)
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0.5,0.5) && mouseIsPressed && !this.dragging && this.draggable){
      this.dragging=true
      this.mouseOffsetX=this.x-mouseX
      this.mouseOffsetY=this.y-mouseY
    }
    if(this.dragging && !mouseIsPressed){
      this.dragging=false
      
    }
    if(this.dragging && ((this.x==this.preX)||(this.y==this.preY))){
        this.x=pmouseX+this.mouseOffsetX
      this.y=pmouseY+this.mouseOffsetY
      if(this.particleColor != [] && this.particleColor.length>0 && frameCount%2==0){
        // print("particle")
        // print(this.particleColor)
        particleShower(this.x, this.y, 25, 5, max(this.sizeX,this.sizeY)*0.9/2, 0, sqrt((abs(this.x-this.preX))^2+(abs(this.y-this.preY))^2), 0.9, 0.99, 0.85, 0.87, this.particleColor[0],this.particleColor[1],this.particleColor[2], 15,29)
      }
      
      
    }
    
  }
  click(){
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0.5,0.5) && mouseClick){
      this.clicks+=1
      particleShower(this.x, this.y, 100, 3, 15, 0, 4, 0.9, 0.99, 0.85, 0.87, this.particleColor[0],this.particleColor[1],this.particleColor[2], 10,20)
    }
  }
}

function runParticles(){
  for(var i=0;i<particles.length;i++){
    particles[i].work()
  }
  killParticles()
}

function particleShower(x,y,number,dMin,dMax,vMin,vMax,speedRatioMin,speedRatioMax,sizeRatioMin,sizeRatioMax,r,g,b,lifespanMin,lifespanMax){
  for(var i=0;i<number;i++){
    var velocity=random(vMin,vMax)
    var diameter=random(dMin,dMax)
    var angle=random(0,360)
    var xSpeed=cos(angle)*velocity
    var ySpeed=sin(angle)*velocity
    var speedRatio=random(speedRatioMin,speedRatioMax)
    var sizeRatio=random(sizeRatioMin,sizeRatioMax)
    var R=r
    var G=g
    var B=b
    if(r=="random"){
      R=random(0,255)
    }
    if(g=="random"){
      G=random(0,255)
    }
    if(b=="random"){
      B=random(0,255)
    }
    var lifespan=random(lifespanMin,lifespanMax)
    particles[particles.length]=new particle(x,y,diameter,xSpeed,ySpeed,speedRatio,sizeRatio,R+random(-80,80),G+random(-80,80),B+random(-80,80),lifespan)
  }
}

function killParticles(){
  for(var i=0;i<particles.length;i++){
    if(particles[i].lifespan<=0){
      particles.splice(i,1)
      i--
    }
  }
}

class particle{
  constructor(a,b,c,d,e,f,g,h,i,j,k){
    this.x=a
    this.y=b
    this.diameter=c
    this.xSpeed=d
    this.ySpeed=e
    this.speedRatio=f
    this.sizeRatio=g
    this.r=h //(r,g,b)
    this.g=i
    this.b=j
    this.lifespan=k
    this.ogLifespan=k
    this.opacity=80
  }
  display(){
    push()
    fill(this.r,this.g,this.b,this.opacity)//might be weird
    // fill("red")
    noStroke()
    ellipseMode(CENTER)
    ellipse(this.x,this.y,this.diameter)
    // ellipse(this.x,this.y,100)
    pop()
  }
  work(){
    this.x+=this.xSpeed + random(-0.05*this.xSpeed,0.05*this.xSpeed)
    this.y+=this.ySpeed + random(-0.05*this.ySpeed,0.05*this.ySpeed)
    this.xSpeed*=this.speedRatio
    this.ySpeed*=this.speedRatio
    // this.diameter*=this.sizeRatio
    // this.opacity=(this.lifespan/this.ogLifespan)*100
    this.opacity=255
    this.lifespan-=1
    this.display()
    this.isDead()
  }
  isDead(){
    if(this.diameter<0){
      this.lifespan=-100000
    }
  }
}

//Credit to Hanson
class button{
  constructor(a,b,c,d){
    this.x=a;
    this.y=b;
    this.sizeX=c;
    this.sizeY=d;
    this.size=1;
    this.sizev=0.1;
    this.dragv = 1.5;
    this.drag = 1.4;
    this.clicks = 0;
    this.clicked = false;
    this.hover = false;
    this.last = false;
    this.held = false;
    this.heldFor = 0;
    this.state = false;
  }
  work(){
    //this.size-=sin((frameCount-1)/20)/50;
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)){
      this.sizev=max(0.05,this.sizev);
      this.hover = true;
    }else{
      this.hover = false;
    }
    this.sizev/=this.drag;
    this.size=1+(this.size-1)/this.drag;
    this.size+=this.sizev;
    //this.size+=sin(frameCount/20)/50;
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)&&!this.last&&mouseIsPressed){
      this.last = true;
      this.clicked = true;
      this.clicks++;
      this.state=!this.state;
      this.sizev=this.sizev+=0.1;
    }else{
      this.clicked = false;
    }
    if(!rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)||!mouseIsPressed){
      this.last = false;
    }
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)&&mouseIsPressed){
      this.held = true;
      this.heldFor++;
      this.sizev=max(0.08,this.sizev);
    }else{
      this.held = false;
      this.heldFor = 0;
    }
  }
}

//Credit to Hanson
function rectHit(x,y,x2,y2,xs,ys,xs2,ys2){
  return(abs(x-x2)<xs/2+xs2/2&&abs(y-y2)<ys/2+ys2/2);
}