function shaayerNextButtonWork(){
  if(shaayerNextAnimation.running && shaayerNextAnimation.count>0){
    shaayerNextAnimation.count+=1
    if(shaayerNextAnimation.currentStage==0){
      // print("happening")
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,shaayerNextAnimation.count*max(width,height)/shaayerNextAnimation.stages[0]*1.5)
      pop()
    }else if(shaayerNextAnimation.currentStage==1){
      // print("Second")
      shaayerScreen+=1
      objects=[]
      shaayerChecks=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
      shaayerCountVariable=0
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      shaayerSetupScreens()
      ellipse(width/2,height/2,shaayerNextAnimation.count*max(width,height)/shaayerNextAnimation.stages[0]*1.5)
      pop()
    }else if(shaayerNextAnimation.currentStage==2){
      // print("third")
      // print("2")
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,max(width,height)*1.5-((shaayerNextAnimation.count-shaayerNextAnimation.stages[0]-shaayerNextAnimation.stages[1])*max(width,height)/shaayerNextAnimation.stages[2])*1.5)
      
      
      
      pop()
    }
  }
}

function shaayerNextButton(){
  push()
  translate(shaayerNxtBtn.x,shaayerNxtBtn.y)
  rectMode(CENTER)
  fill("black")
  strokeWeight(10)
  stroke("white")
  if(shaayerNxtBtn.hover){
    shaayerNxtBtn.sizev=max(0.05,shaayerNxtBtn.sizev);
    scale(shaayerNxtBtn.size,shaayerNxtBtn.size);
  }else{
    shaayerNxtBtn.sizev=min(0.01,shaayerNxtBtn.sizev)
    scale(shaayerNxtBtn.size,shaayerNxtBtn.size)
  }
  rect(0,0,shaayerNxtBtn.sizeX,shaayerNxtBtn.sizeY,5)
  textAlign(CENTER)
  textSize(50)
  fill("white")
  noStroke()
  rotate(cos(frameCount*2)*5)
  text("NEXT",0,12,shaayerNxtBtn.sizeX,shaayerNxtBtn.sizeY)
  pop()
  shaayerNxtBtn.work()
  if(shaayerNxtBtn.clicked){
     shaayerNextAnimation.running=true
    shaayerNextAnimation.count+=1
  }
}



var shaayerScreen=0
var shaayerNextAnimation=new animation([50,1,34])
// var shaayerNextAnimation=new animation([10,1,6])
var shaayerNxtBtn;
var oxalocetateBondingAnimation;
var citrateCreationAnimation=new animation([5])
var shaayerCountVariable=0
shaayerNxtBtn= new button(0,0,185,70)

var shaayerChecks=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

function shaayerSetup(){
  
  objects=[]
  
  
  shaayerNxtBtn.x=800-150
  shaayerNxtBtn.y=800-80
  
  objects[0]=new object("ATP",width/6,500-30+30,width/3,width/3,false,[],true,0)
  objects[1]=new object("NADH",width/6*3,500-30+30,width/3,width/3,false,[],true,0)
  objects[2]=new object("FADH",width/6*5,500-30+30,width/3,width/3,false,[],true,0)
}

function shaayer(){
  resetMatrix()
  if(shaayerScreen==0){
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("The krebs cycle is a critical part of cellular\nrespiration that happens once per Acetyl\nCoA, so twice per Glucose.\nIt happens in the mitochondria, specifically\nthe mitochondrial matrix. It completes the\nbreakdown of glucose in order to produce high\nenergy molcules and energy carriers such as:",width/2,70)
    objects[0].rotation=(cos(frameCount*2.5)*15)
    text("ATP",width/6,650)
    objects[1].rotation=(cos(frameCount*2.5)*15)
    text("NADH",width/6*3,650)
    objects[2].rotation=(cos(frameCount*2.5)*15)
    text("FADH₂",width/6*5,650)
    pop()
    shaayerNextButton()
  }else if(shaayerScreen==1){
    //Acetyl CoA bonds with oxalocetate and water through citrate synthase. This creates CoA and Citrate
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("To start, the Acetyl CoA must be bonded with\nOxyloacetate through Citrate Synthase. This\nalso requires water. It outputs Citrate, which will\nbe used in the Krebs Cycle, and CoA, which\nis given to another system of Cellular Respiration.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("Oxyloacetate",objects[0].x,objects[0].y+115)
      text("H₂O",objects[2].x,objects[2].y+115)
      text("Acetyl CoA",objects[1].x,objects[1].y+115)
      text("Citrate Synthase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[3].x,objects[3].y,objects[0].sizeX,objects[0].sizeY,objects[3].sizeX,objects[3].sizeY) && rectHit(objects[1].x,objects[1].y,objects[3].x,objects[3].y,objects[1].sizeX,objects[1].sizeY,objects[3].sizeX,objects[3].sizeY) && rectHit(objects[2].x,objects[2].y,objects[3].x,objects[3].y,objects[2].sizeX,objects[2].sizeY,objects[3].sizeX,objects[3].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<3;i++){
          objects[i].working=false
        }
        objects[4].working=true
        objects[5].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[4].x+=4
          objects[5].x-=4
          objects[4].y-=2.5
          objects[5].y-=2.5
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Citrate Synthase",width/2,665-30+115)
        text("Citrate",objects[4].x,objects[4].y+115)
        text("Coenzyme A",objects[5].x,objects[4].y+115)
        pop()
      }
    }
  }else if(shaayerScreen==2){
    //Enzyme Aconitase turns citrate into D-Isocitrate through rearrangment
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("Now, the enzyme Aconitase rearranges Citrate\nby both dehydrating it and rehydrating it.\nThis means it requires water but also sends\nout a different water molecule.The main\nmolecule now has five carbons, not six.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("Citrate",objects[0].x,objects[0].y+115)
      text("H₂O",objects[1].x,objects[1].y+115)
      text("Aconitase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[3].x,objects[3].y,objects[0].sizeX,objects[0].sizeY,objects[3].sizeX,objects[3].sizeY) && rectHit(objects[1].x,objects[1].y,objects[3].x,objects[3].y,objects[1].sizeX,objects[1].sizeY,objects[3].sizeX,objects[3].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<3;i++){
          objects[i].working=false
        }
        objects[4].working=true
        objects[5].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[4].x-=4
          objects[5].x+=4
          objects[4].y-=2.5
          objects[5].y-=2.5
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Aconitase",width/2,665-30+115)
        text("H₂O",objects[4].x,objects[4].y+115)
        text("D-Isocitrate",objects[5].x,objects[4].y+115)
        pop()
      }
    }
  }else if(shaayerScreen==3){
    //input isocitrate and NAD+ into isocitrate dehydrogenase to get alpha-ketoglutarate, CO2, NADH, and a proton
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("Isocitrate Dehydrogenase takes in D-Isocitrate\nand NAD⁺ to create Alpha-Ketoglutarate(oxidized\nfrom D-Isocitrate), now the main molecule, CO₂,\na byproduct, a proton, another byproduct, and\nan NADH(reduced from NAD⁺), an electron\ncarrier going to the electron transport chain.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("D-Isocitrate",objects[0].x,objects[0].y+115)
      text("NAD⁺",objects[1].x,objects[1].y+115)
      text("Isocitrate Dehydrogenase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[2].x,objects[2].y,objects[0].sizeX,objects[0].sizeY,objects[2].sizeX,objects[2].sizeY) && rectHit(objects[1].x,objects[1].y,objects[2].x,objects[2].y,objects[1].sizeX,objects[1].sizeY,objects[2].sizeX,objects[2].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<2;i++){
          objects[i].working=false
        }
        objects[3].working=true
        objects[4].working=true
        objects[5].working=true
        objects[6].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[3].x-=0.68*5
          objects[4].x+=0.68*5
          objects[3].y-=0.6*5
          objects[4].y-=0.6*5
          objects[5].x+=0
          objects[5].y-=0.65*4
          objects[6].x-=1*4.5
          // objects[5].y-=0.65*5
          
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Isocitrate Dehydrogenase",width/2,665-30+115)
        text("Alpha-Ketoglutarate",objects[3].x,objects[3].y+115)
        text("CO₂",objects[4].x,objects[4].y+115)
        text("NADH",objects[5].x,objects[5].y+115)
        text("Proton",objects[6].x,objects[6].y+115)
        pop()
      }
    }
  }else if(shaayerScreen==4){
    //Alpha-Ketoglutarate Dehydrogenase takes in Alpha Ketoglutarate and rearranges it with a CoA to Succinyl-CoA. It also reduces an NAD+ to NADH and produces the byproduces CO2 and a proton.
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("Alpha-Ketoglutarate Dehydrogenase takes in\nAlpha-Ketoglutarate and rearranges it with\na CoA. It also reduces an NAD+ to NADH\nwhile oxidizing the main molecule into\nSuccinyl-CoA and produces the byproducts\nCO2 and a proton.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("Alpha-Ketoglutarate",objects[0].x,objects[0].y+115)
      text("NAD⁺",objects[1].x,objects[1].y+115)
      text("CoA",objects[2].x,objects[2].y+115)
      text("Alpha-Ketoglutarate Dehydrogenase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[3].x,objects[3].y,objects[0].sizeX,objects[0].sizeY,objects[3].sizeX,objects[3].sizeY) && rectHit(objects[1].x,objects[1].y,objects[3].x,objects[3].y,objects[1].sizeX,objects[1].sizeY,objects[3].sizeX,objects[3].sizeY) && rectHit(objects[2].x,objects[2].y,objects[3].x,objects[3].y,objects[2].sizeX,objects[2].sizeY,objects[3].sizeX,objects[3].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<3;i++){
          objects[i].working=false
        }
        objects[4].working=true
        objects[5].working=true
        objects[6].working=true
        objects[7].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[4].x-=0.68*5
          objects[5].x+=0.68*5
          objects[4].y-=0.6*5
          objects[5].y-=0.6*5
          objects[6].x+=0
          objects[6].y-=0.75*4
          objects[7].x-=1*4.5
          objects[7].y-=0.1*4.5
          // objects[5].y-=0.65*5
          
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Alpha-Ketoglutarate Dehydrogenase",width/2,665-30+115)
        text("Succinyl-CoA",objects[4].x,objects[4].y+115)
        text("CO₂",objects[5].x,objects[5].y+115)
        text("NADH",objects[6].x,objects[6].y+115)
        text("Proton",objects[7].x,objects[7].y+115)
        pop()
      }
    }
  }else if(shaayerScreen==5){
    //Succinyl-CoA, GDP, and inorganic phosophate go into Succinyl-CoA Synthetase to make Succinate, CoA, and GTP, which is a high energy molecule similar to ATP.
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("Succinyl-CoA, GDP, and inorganic phosphate go\ninto the enzyme Succinyl-CoA Synthetase to\nmake Succinate, CoA, and GTP, which is a\nhigh energy molecule similar to ATP.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("Succinyl-CoA",objects[0].x,objects[0].y+115)
      text("GDP",objects[1].x,objects[1].y+115)
      text("Inorganic Phosphate",objects[2].x,objects[2].y+115)
      text("Succinyl-CoA Synthetase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[3].x,objects[3].y,objects[0].sizeX,objects[0].sizeY,objects[3].sizeX,objects[3].sizeY) && rectHit(objects[1].x,objects[1].y,objects[3].x,objects[3].y,objects[1].sizeX,objects[1].sizeY,objects[3].sizeX,objects[3].sizeY) && rectHit(objects[2].x,objects[2].y,objects[3].x,objects[3].y,objects[2].sizeX,objects[2].sizeY,objects[3].sizeX,objects[3].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<3;i++){
          objects[i].working=false
        }
        objects[4].working=true
        objects[5].working=true
        objects[6].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[4].x-=0.68*5
          objects[5].x+=0.68*5
          objects[4].y-=0.6*5
          objects[5].y-=0.6*5
          objects[6].x+=0
          objects[6].y-=0.75*4
          // objects[5].y-=0.65*5
          
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Succinyl-CoA Synthetase",width/2,665-30+115)
        text("Succinyl",objects[4].x,objects[4].y+115)
        text("CoA",objects[5].x,objects[5].y+115)
        text("GTP",objects[6].x,objects[6].y+115)
        pop()
      }
    }
  }else if(shaayerScreen==6){
    //The enzyme Succinic Dehydrogenase takes in Succinate and FAD to turn the Succinate into Fumarate while reducing the FAD into FADH₂, an electron carrier.
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("The enzyme Succinic Dehydrogenase takes in\nSuccinate and FAD to turn the Succinate into\nFumarate while reducing the FAD\ninto FADH₂, an electron carrier.\nhigh energy molecule similar to ATP.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("Succinate",objects[0].x,objects[0].y+115)
      text("FAD",objects[1].x,objects[1].y+115)
      text("Succinic Dehydrogenase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[2].x,objects[2].y,objects[0].sizeX,objects[0].sizeY,objects[2].sizeX,objects[2].sizeY) && rectHit(objects[1].x,objects[1].y,objects[2].x,objects[2].y,objects[1].sizeX,objects[1].sizeY,objects[2].sizeX,objects[2].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<2;i++){
          objects[i].working=false
        }
        objects[3].working=true
        objects[4].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[3].x-=4
          objects[4].x+=4
          objects[3].y-=2.5
          objects[4].y-=2.5
          
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Succinic Dehydrogenase",width/2,665-30+115)
        text("Fumarate",objects[3].x,objects[3].y+115)
        text("FADH₂",objects[4].x,objects[4].y+115)
        pop()
      }
    }
  }else if(shaayerScreen==7){
    //The enzyme Fumarase turns Fumarate into Malate using water.
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("The enzyme Fumarase turns\nFumarate into Malate using water.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("Fumarate",objects[0].x,objects[0].y+115)
      text("H₂O",objects[1].x,objects[1].y+115)
      text("Fumarase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[2].x,objects[2].y,objects[0].sizeX,objects[0].sizeY,objects[2].sizeX,objects[2].sizeY) && rectHit(objects[1].x,objects[1].y,objects[2].x,objects[2].y,objects[1].sizeX,objects[1].sizeY,objects[2].sizeX,objects[2].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<2;i++){
          objects[i].working=false
        }
        objects[3].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[3].y-=0.9*4
          
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Fumarase",width/2,665-30+115)
        text("Malate",objects[3].x,objects[3].y+115)
        pop()
      }
    }
  }else if(shaayerScreen==8){
    //Malate + NAD+ --> Malate Dehydrogenase --> Oxaloacetate + NADH + Proton
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("For the Krebs Cycle to actually be a cycle, it\nhas to recreate the starting molecule in the final\nstep. Using Malate Dehydrogenase, Oxaloacetate\nis recreated from Malate as an NAD⁺ is reduced\nto NADH and a Proton is created as a byproduct.\nCreate this process!",width/2,70)
    pop()
    if(shaayerChecks[0]==false){
      push()
      textSize(40)
      textAlign(CENTER)
      fill("white")
      text("NAD⁺",objects[0].x,objects[0].y+115)
      text("Malate",objects[1].x,objects[1].y+115)
      text("Malate Dehydrogenase",width/2,665-30+115)
      pop()
      if(rectHit(objects[0].x,objects[0].y,objects[2].x,objects[2].y,objects[0].sizeX,objects[0].sizeY,objects[2].sizeX,objects[2].sizeY) && rectHit(objects[1].x,objects[1].y,objects[2].x,objects[2].y,objects[1].sizeX,objects[1].sizeY,objects[2].sizeX,objects[2].sizeY)){
        shaayerChecks[0]=true
        citrateCreationAnimation.running=true
      }
    }else{
      if(shaayerChecks[1]==false){
        for(var i=0;i<2;i++){
          objects[i].working=false
        }
        objects[3].working=true
        objects[4].working=true
        objects[5].working=true
        // 
        shaayerCountVariable+=1
        if(shaayerCountVariable<70){
          objects[3].x-=0.68*5
          objects[4].x+=0.68*5
          objects[3].y-=0.6*5
          objects[4].y-=0.6*5
          objects[5].x+=0
          objects[5].y-=0.75*4
          
        }else{
          shaayerNextButton()
        }
        push()
        textSize(40)
        textAlign(CENTER)
        fill("white")
        text("Malate Dehydrogenase",width/2,665-30+115)
        text("NADH",objects[3].x,objects[3].y+115)
        text("Oxaloacetate",objects[4].x,objects[4].y+115)
        text("Proton",objects[5].x,objects[5].y+115)
        
        pop()
      }
    }
  }else if(shaayerScreen==9){
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("The Krebs Cycle, also known as the Citric\nAcid Cycle, is an incredibly important step of\ncellular respiration that occurs in the\nmitochondrial matrix. With it, 1 GTP, a high\nenergy molecule, 3 NADHs, electron carriers, and\n1 FADH₂,another electron carrier, are\ncreated. To complete the cycle, only 1 Acetyl\nCoA, 2 H₂Os, 3 NAD⁺s, 1 FAD, 1 GDP,\nand 1 inorganic phosphate are needed.\n\nAfter this final step, the first step repeats\nitself, making the Krebs cycle truly a cycle.",width/2,70)
    pop()
    // imageMode(CENTER)
    // image(Krebs,width/2-240,650-175,340*0.9,320*0.9)
    // image(Krebs,0,0,width,height)
    nextButton()
  }
  
  // shaayerNextButton()
  shaayerNextButtonWork()
  shaayerNextAnimation.work()
}




function shaayerSetupScreens(){
  objects=[]
  if(shaayerScreen==1){
    oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("Oxyloacetate",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("Acetyl CoA",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("H2O",width/2,665-240,180,180,true,[46, 168, 217],true,0)
    objects[3]=new object("Nitrate Synthase",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[4]=new object("Citrate",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[5]=new object("Coenzyme A",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
  if(shaayerScreen==2){
    // oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("Citrate",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("H2O",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("H2O",width/2-13245678,665-240-132456789,180,180,true,[46, 168, 217],true,0)
    // obj,
    objects[3]=new object("Aconitic",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[4]=new object("H2O",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[5]=new object("D-Isositrate",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
  if(shaayerScreen==3){
    // oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("D-Isositrate",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("NADPlus",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("Isositrate Dehydrogenase",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[3]=new object("Alpha-K",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[4]=new object("CO2",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[5]=new object("NADH",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[6]=new object("H",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
  if(shaayerScreen==4){
    oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("Alpha-K",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("NAD+",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("Coenzyme A",width/2,665-240,180,180,true,[46, 168, 217],true,0)
    objects[3]=new object("Alpha-ketogistalate dehydronase",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[4]=new object("Succinyl CoA",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[5]=new object("CO2",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[6]=new object("NADH",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[7]=new object("H",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
  if(shaayerScreen==5){
    // oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("Succinyl CoA",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("GDP",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("Pi",width/2,665-240,180,180,true,[46, 168, 217],true,0)
    objects[3]=new object("Succinyl CoA Synthase",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[4]=new object("Succinyl",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[5]=new object("Coenzyme A",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[6]=new object("GTP",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
  if(shaayerScreen==6){
    // oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("Succinyl",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("FAD",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("Nitrate Synthase",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[3]=new object("Fumerate",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[4]=new object("FADH2",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
  if(shaayerScreen==7){
    // oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("Fumerate",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("H2O",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("Fumeras",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[3]=new object("Malate",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
  if(shaayerScreen==8){
    // oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    objects[0]=new object("NAD+",width/6*5,665-200,180,180,true,[46, 168, 217],true,0)
    objects[1]=new object("Malate",width/6,665-200,180,180,true,[46, 168, 217],true,0)
    objects[2]=new object("Isositrate Dehydrogenase",width/2,665-30,190,190,false,[46, 168, 217],true,0)
    objects[3]=new object("NADH",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[4]=new object("Oxyloacetate",width/2,665-30,180,180,false,[46,168,217],false,0)
    objects[5]=new object("H",width/2,665-30,180,180,false,[46,168,217],false,0)
  }
}