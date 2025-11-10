function start(){
  push()
    fill("white")
    textSize(27)
    textAlign(CENTER)
  // Shaayer I hope you don't mind, but I added some more detail to this. - Zoe
    text("Photosynthesis and cellular respiration are\nvital processes in order for plants\nand animals alike to create energy.\nPhotosynthesis is used by plants to create their\nown glucose or animals eat food to obtain\nother glucose. From there, cellular respiration\nbreaks down glucose into usable energy.\nPhotosynthesis happens in the chloroplast and\ncellular respiration happens in the mitochondria, which are both\n organelles inside the plant's cells.\nBoth of these organelles have special structures\nto maximize surface area for the processes. \nIn mitochondrions, the inner membrane is folded \nand in chloroplasts, there are stacks \nof disks called thylakoids. This makes it so that the organelle \nmaximizes the surface area for the inner membrane \nand the thylakoid membrane, where there are\n key things that make photosynthesis and \ncellular respiration possible.",width/2,50)
    pop()
  nextButton()
}


var conclusionNum = 0
var conclusionCount=0


function conclusion(){
  // background(0,mouseX/2,mouseY/2)
  push()
  fill("white")
      textSize(27)
  textAlign(CENTER)
  
// var conclusionTextsForConclusionScreen = [""]

// conclusionCount+=1


  // console.log("Thing")
  // fill(255,255,255)
  textSize(27)
  //text("Test",30,30)
  text("You have successfully finished photosynthesis and cellular\n respiration! These cycles go over and over inside a \nplant and for cellular respiration, also animal. They are very amazing\nand important for all life. To go over some key points, the \noverall equation for photosynthesis is\n 6H2O + 6CO2 + sunlight → C6H12O6 + ATP, and the equation for \ncellular respiration is ATP + C6H12O6 → 6H2O + 6CO2 + O2.\nTwo similarities in photosynthesis and cellular respiration is\nthat they both make ATP, or energy for the organism, and \nthat they are very important for all living things. However, some\ndifferences are that photosynthesis happens in the chloroplast\nand cellular respiration happens in the mitochondria, and that\n photosynthesis makes food(glucose) while cellular respiration breaks\nglucose to make energy for the plant!We hope you enjoyed this fun \nsimulation of photosynthesis and cellular respiration!\nThe End\n\n(Of our simulation, not photosynthesis/\ncellular respiration, because in reality,\n the cycles goes on and on inside \nthe organisms's cells until the\n organism dies.)",width/2,70-conclusionCount)
  
// push()
//     fill("white")
//     textSize(40)
//     textAlign(CENTER)
//     text("",width/2,70)
//     pop()
//   nextButton()
  
  pop()
  
}

function photosynthesis(){
  
  push()
    fill("white")
    textSize(27)
    textAlign(CENTER)
    text("Photosynthesis happens first, in the chloroplasts. \nThe main goal of photosynthesis is to make food \nin the form of glucose for the plant. \nThere are two phases. The first one is the \nlight dependent reactions, which happens in the \nthylakoid membrane. Sunlight energy is harnessed\n and it is used to make NADPH and ATP, \nwhich are energy currencies in the plant cell. These are used in the \nsecond phase of photosynthesis, which is the calvin cycle. \nIn the calvin cycle, there is a series of chemical reactions \nthat make 6 G3Ps that turn into \none molecule of glucose.\nEquation: 6CO₂ + 6H₂O + ATP Energy --> C₆H₁₂O₆ + 6O₂\nClick the next button to start with the light dependent reactions... ",width/2,70)
    pop()
  nextButton()
}

function cellularRespiration(){
  // Someone needs to do cellular respiration!
  push()
    fill("white")
    textSize(27)
    textAlign(CENTER)
    text("Unlike photosynthesis which is only for plants, cellular\nrespiration happens in animals and plants alike. This\nis when glucose is broken down to create usuable energy,\nin the form of ATP. Cellular respiration is\nbuilt of the steps glycolsis, the link reaction, the Krebs\ncycle, and the electron transport chain. We will be\ngoing into the details of each step over the rest of this simulation.\nEquation: C₆H₁₂O + 6O₂ --> 6CO₂ + 6H₂O + ATP Energy.\nClick the next button to start with glycolsis...",width/2,70)
    pop()
  nextButton()
}
