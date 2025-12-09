// Electron Transport Chain Simulation for andre.js

var waterCount = 0

// Tutorial Scene Variables (Simple like maren.js)
var andreScene = 0;
var andreTextboxes = [];
var andreNextBtn;
var andreBackBtn;
var mouseWasReleasedAfterTutorial = false;

// Step-by-step interactive mode
var etcStep = 0; // Current step in step-by-step mode
var etcMaxSteps = 12; // Total steps in step-by-step mode
var stepTriggered = {}; // Track which steps have been triggered (to prevent spam)
var stepActionComplete = {}; // Track if current step's action is complete
var hasCompletedStepMode = false; // Track if user completed step mode or switched modes
var modeSwitchCount = 0; // Track mode switches

// Dragging state for interactive mode
var draggedElement = null;
var dragOffsetX = 0;
var dragOffsetY = 0;
var justDropped = false; // Prevent info panel on drag release

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
    paused: true, // Start paused for step-by-step control
    mode: 'STEP', // STEP, AUTO, or MANUAL - start in STEP mode for interactivity
    selectedElement: null,
    selectedSubtab: null,
    currentHighlight: null // Which element to highlight during step mode
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
            },
            chemiosmosis: {
                name: "Chemiosmosis",
                description: "Chemiosmosis is the process by which ATP is produced using the energy stored in a proton (H+) gradient across the inner mitochondrial membrane. During the ETC, Complexes I, III, and IV pump H+ ions from the matrix into the intermembrane space via active transport, creating an electrochemical gradient. This gradient stores potential energy. When H+ ions flow back through ATP Synthase via facilitated diffusion (down their concentration gradient), the energy released drives the synthesis of ATP from ADP and Pi. This coupling of the proton gradient to ATP synthesis is the essence of chemiosmosis."
            },
            oxidativePhosphorylation: {
                name: "Oxidative Phosphorylation",
                description: "Oxidative phosphorylation is the metabolic pathway where cells use the electron transport chain to oxidize nutrients (via electron carriers NADH and FADH₂) and produce ATP. It consists of two coupled processes: (1) The ETC, where electrons are transferred through protein complexes, releasing energy that pumps H+ ions across the membrane, and (2) Chemiosmosis, where the resulting proton gradient drives ATP Synthase to phosphorylate ADP into ATP. This process produces ~32-34 ATP per glucose - the majority of ATP from cellular respiration. It's called 'oxidative' because oxygen is the final electron acceptor."
            },
            electrochemicalGradient: {
                name: "Electrochemical Gradient",
                description: "An electrochemical gradient is a combination of two gradients across a membrane: (1) A chemical gradient - the difference in H+ ion concentration (higher in the intermembrane space, lower in the matrix), and (2) An electrical gradient - the difference in charge (more positive in the intermembrane space due to H+ accumulation). Together, these create a powerful force called the proton-motive force that drives H+ ions back through ATP Synthase, powering ATP production. The ETC builds this gradient through active transport of H+ ions."
            }
        }
    }
};

// Step descriptions for step-by-step mode - comprehensive walkthrough of each complex
var stepDescriptions = [
    // COMPLEX I
    {
        title: "Step 1: NADH Arrives at Complex I",
        description: "Drag NADH to Complex I (NADH Dehydrogenase). NADH carries high-energy electrons from glycolysis & Krebs cycle.",
        highlight: "complex1",
        action: "drag_nadh"
    },
    {
        title: "Step 2: Complex I - Electron Transfer",
        description: "NADH donates 2 electrons to Complex I and becomes NAD+. The electrons energize the complex.",
        highlight: "complex1",
        action: "watch"
    },
    {
        title: "Step 3: Complex I - Proton Pumping",
        description: "Complex I uses electron energy to pump 4 H+ ions across the membrane via active transport!",
        highlight: "complex1",
        action: "pump_protons"
    },
    // COMPLEX II
    {
        title: "Step 4: FADH₂ Arrives at Complex II",
        description: "Drag FADH₂ to Complex II (Succinate Dehydrogenase). FADH₂ comes from the Krebs cycle.",
        highlight: "complex2",
        action: "drag_fadh2"
    },
    {
        title: "Step 5: Complex II - Electron Transfer",
        description: "FADH₂ donates electrons to Complex II and becomes FAD. Note: Complex II does NOT pump H+!",
        highlight: "complex2",
        action: "watch"
    },
    // COMPLEX III
    {
        title: "Step 6: Electrons Reach Complex III",
        description: "Electrons from both Complex I and II travel via Coenzyme Q to Complex III (Cytochrome bc1).",
        highlight: "complex3",
        action: "electron_transfer"
    },
    {
        title: "Step 7: Complex III - Proton Pumping",
        description: "Complex III pumps 4 H+ ions into the intermembrane space. The gradient is building!",
        highlight: "complex3",
        action: "pump_protons"
    },
    // COMPLEX IV
    {
        title: "Step 8: Electrons Move to Complex IV",
        description: "Cytochrome C carries electrons from Complex III to Complex IV (Cytochrome C Oxidase).",
        highlight: "complex4",
        action: "electron_transfer"
    },
    {
        title: "Step 9: Oxygen - Final Electron Acceptor",
        description: "Drag O₂ to Complex IV. Oxygen accepts electrons - this is why we breathe!",
        highlight: "complex4",
        action: "drag_oxygen"
    },
    {
        title: "Step 10: Water Formation",
        description: "O₂ + 4e⁻ + 4H⁺ → 2H₂O. Complex IV also pumps 2 H+ ions. Water is produced!",
        highlight: "complex4",
        action: "form_water"
    },
    // ATP SYNTHASE
    {
        title: "Step 11: ATP Synthase - Chemiosmosis",
        description: "H+ ions flow down their gradient through ATP Synthase via facilitated diffusion, spinning the enzyme!",
        highlight: "atpSynthase",
        action: "atp_production"
    },
    // FULL AUTO
    {
        title: "Step 12: Complete ETC - Oxidative Phosphorylation",
        description: "Watch the full cycle! ~32-34 ATP produced per glucose. This is oxidative phosphorylation!",
        highlight: null,
        action: "auto"
    }
];

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
    // Create BACK button
    andreBackBtn = new button(150, height - 80, 130, 60);

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
            "Interactive Mode!",
            "Use STEP MODE to control the simulation step-by-step, or AUTO MODE to watch it run.\nClick any element for detailed info! Use 'Show Key' for molecule legend and\n'Vocabulary' button for key terms like chemiosmosis & oxidative phosphorylation!"
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

        // Check for clicks on interactive elements - but NOT during tutorial, on UI buttons, or after drag release
        if (mouseClick && andreScene >= 8 && !isClickOnUIButton() && !justDropped) {
            handleElementClicks();
        }

        // Reset justDropped flag
        if (justDropped && !mouseIsPressed) {
            justDropped = false;
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
    // Intermembrane space (top) - subtle background
    push();
    fill(100, 150, 200, 20);
    noStroke();
    rect(0, 0, width, etcState.membraneY - 50);
    pop();

    // Matrix (bottom) - subtle background
    push();
    fill(150, 100, 150, 20);
    noStroke();
    rect(0, etcState.membraneY + 50, width, height);
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
            ellipse(0, -complex.height / 2 - 15, 12, 12);

            // Pulse effect
            fill(255, 255, 0, 100);
            ellipse(0, -complex.height / 2 - 15, 18 + sin(frameCount * 15) * 4, 18 + sin(frameCount * 15) * 4);
        }

        pop();
    }
}

function drawATPSynthase() {
    let synthase = etcState.atpSynthase;

    push();
    translate(synthase.x, synthase.y);
    imageMode(CENTER);

    let rotationCycle = (synthase.rotation / 30);
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
            let dist = sqrt(dx * dx + dy * dy);

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
            let dist = sqrt(dx * dx + dy * dy);

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
            let dist = sqrt(dx * dx + dy * dy);

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
                let d = sqrt(dx * dx + dy * dy);

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
                let d = sqrt(dx * dx + dy * dy);

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
                    let d = sqrt(dx * dx + dy * dy);

                    // Repel if too close
                    if (d < 180 && d > 0) {
                        let force = sqrt((180 - d) * (180 - d)) / 180 * 5;
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
                let d = sqrt(dx * dx + dy * dy);

                // Increased attraction range and speed - overrides repulsion when close
                if (d < 700) {
                    let attractForce = 0.6 * max(0.5, sqrt((490000 - (d * d))) / 700); // Stronger attraction
                    let attractX = dx / d * attractForce;
                    let attractY = dy / d * attractForce;

                    // Override float velocities near ATP synthase
                    proton.x += attractX;
                    proton.y += attractY;

                    // Much larger capture radius
                    if (d < height / 20) {
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
    fill(0, 0, 0, 150);
    noStroke();
    rect(10, height - 95, 180, 85, 8);

    fill(200);
    textSize(11);
    textAlign(LEFT);
    text("ETC Stats", 20, height - 78);

    fill(255);
    textSize(10);
    text("Electrons: " + etcState.electronCount, 20, height - 60);
    text("ATP: " + etcState.atpCount, 100, height - 60);
    text("H+ Gradient: " + etcState.protons.length, 20, height - 42);
    text("H2O: " + waterCount, 100, height - 42);

    // Hint text
    fill(150);
    textSize(9);
    text("Click elements for info", 20, height - 18);

    pop();
}

function drawControls() {
    // Only show controls after tutorial completes
    if (andreScene >= 8) {
        // Draw next button only after:
        // 1. Mouse released after tutorial AND
        // 2. User completed step mode OR switched modes at least once
        if (mouseWasReleasedAfterTutorial && (hasCompletedStepMode || modeSwitchCount > 0)) {
            nextButton();
        }

        // Draw simple step controls only
        drawStepControls();

        // Handle dragging in step mode
        if (etcState.mode === 'STEP') {
            handleDragging();
        }
    }
}

function handleDragging() {
    // Get current step action
    let currentAction = stepDescriptions[etcStep] ? stepDescriptions[etcStep].action : null;

    // Check for starting a drag
    if (mouseIsPressed && !draggedElement) {
        // Check NADH molecules for drag (action: drag_nadh)
        if (currentAction === 'drag_nadh') {
            for (let i = 0; i < etcState.nadh.length; i++) {
                let nadh = etcState.nadh[i];
                if (nadh.hasElectrons && dist(mouseX, mouseY, nadh.x, nadh.y) < nadh.size) {
                    draggedElement = {type: 'nadh', index: i};
                    dragOffsetX = nadh.x - mouseX;
                    dragOffsetY = nadh.y - mouseY;
                    break;
                }
            }
        }
        // Check FADH2 molecules for drag (action: drag_fadh2)
        if (currentAction === 'drag_fadh2') {
            for (let i = 0; i < etcState.fadh2.length; i++) {
                let fadh = etcState.fadh2[i];
                if (fadh.hasElectrons && dist(mouseX, mouseY, fadh.x, fadh.y) < fadh.size) {
                    draggedElement = {type: 'fadh2', index: i};
                    dragOffsetX = fadh.x - mouseX;
                    dragOffsetY = fadh.y - mouseY;
                    break;
                }
            }
        }
        // Check oxygen molecules for drag (action: drag_oxygen)
        if (currentAction === 'drag_oxygen') {
            for (let i = 0; i < etcState.oxygenMolecules.length; i++) {
                let oxy = etcState.oxygenMolecules[i];
                if (dist(mouseX, mouseY, oxy.x, oxy.y) < oxy.size) {
                    draggedElement = {type: 'oxygen', index: i};
                    dragOffsetX = oxy.x - mouseX;
                    dragOffsetY = oxy.y - mouseY;
                    break;
                }
            }
        }
    }

    // Update dragged element position
    if (draggedElement && mouseIsPressed) {
        if (draggedElement.type === 'nadh') {
            etcState.nadh[draggedElement.index].x = mouseX + dragOffsetX;
            etcState.nadh[draggedElement.index].y = mouseY + dragOffsetY;
        } else if (draggedElement.type === 'fadh2') {
            etcState.fadh2[draggedElement.index].x = mouseX + dragOffsetX;
            etcState.fadh2[draggedElement.index].y = mouseY + dragOffsetY;
        } else if (draggedElement.type === 'oxygen') {
            etcState.oxygenMolecules[draggedElement.index].x = mouseX + dragOffsetX;
            etcState.oxygenMolecules[draggedElement.index].y = mouseY + dragOffsetY;
        }
    }

    // Check for drop
    if (!mouseIsPressed && draggedElement) {
        checkDropZone();
        draggedElement = null;
        justDropped = true; // Prevent info panel from opening
    }

    // Draw drop zone hints
    drawDropZoneHints();
}

function checkDropZone() {
    if (!draggedElement) return;

    let currentAction = stepDescriptions[etcStep] ? stepDescriptions[etcStep].action : null;

    // NADH drop on Complex I (step 0: drag_nadh)
    if (draggedElement.type === 'nadh' && currentAction === 'drag_nadh') {
        let nadh = etcState.nadh[draggedElement.index];
        let complex = etcState.proteinComplexes[0]; // Complex I
        if (dist(nadh.x, nadh.y, complex.x, complex.y) < 60) {
            // Successfully dropped on Complex I!
            nadh.hasElectrons = false;
            etcState.proteinComplexes[0].active = true;
            etcState.electronCount++;

            // Create electron
            etcState.electrons.push({
                x: complex.x,
                y: complex.y,
                size: 8,
                currentComplex: 0,
                targetComplex: 1,
                speed: 1.5
            });

            // Mark action complete and advance
            stepActionComplete[etcStep] = true;
            etcStep++;

            setTimeout(() => {
                etcState.proteinComplexes[0].active = false;
            }, 500);
        }
    }

    // FADH2 drop on Complex II (step 3: drag_fadh2)
    if (draggedElement.type === 'fadh2' && currentAction === 'drag_fadh2') {
        let fadh = etcState.fadh2[draggedElement.index];
        let complex = etcState.proteinComplexes[1]; // Complex II
        if (dist(fadh.x, fadh.y, complex.x, complex.y) < 60) {
            // Successfully dropped on Complex II!
            fadh.hasElectrons = false;
            etcState.proteinComplexes[1].active = true;
            etcState.electronCount++;

            // Create electron
            etcState.electrons.push({
                x: complex.x,
                y: complex.y,
                size: 8,
                currentComplex: 1,
                targetComplex: 2,
                speed: 1.5
            });

            // Mark action complete and advance
            stepActionComplete[etcStep] = true;
            etcStep++;

            setTimeout(() => {
                etcState.proteinComplexes[1].active = false;
            }, 500);
        }
    }

    // Oxygen drop on Complex IV (step 8: drag_oxygen)
    if (draggedElement.type === 'oxygen' && currentAction === 'drag_oxygen') {
        let oxy = etcState.oxygenMolecules[draggedElement.index];
        let complex = etcState.proteinComplexes[3]; // Complex IV
        if (dist(oxy.x, oxy.y, complex.x, complex.y) < 80) {
            // Successfully dropped on Complex IV!
            etcState.proteinComplexes[3].active = true;

            // Create water
            etcState.waterMolecules.push({
                x: complex.x,
                y: complex.y + 50,
                size: 20,
                life: 180
            });
            waterCount++;

            // Remove oxygen
            etcState.oxygenMolecules.splice(draggedElement.index, 1);

            // Mark action complete and advance
            stepActionComplete[etcStep] = true;
            etcStep++;

            setTimeout(() => {
                etcState.proteinComplexes[3].active = false;
            }, 500);
        }
    }
}

function drawDropZoneHints() {
    // Drop zone hints now handled by yellow highlight boxes in drawClickableRegions
    // This function is kept for potential future use
}

function drawStepControls() {
    push();

    // Compact control bar at bottom center
    let barWidth = 280;
    let barHeight = 35;
    let barX = (width - barWidth) / 2;
    let barY = height - 50;

    // Background
    fill(0, 0, 0, 180);
    stroke(100, 150, 200);
    strokeWeight(1);
    rect(barX, barY, barWidth, barHeight, 8);

    let btnW = 50;
    let btnH = 25;
    let btnY = barY + 5;
    let spacing = 55;
    let startX = barX + 15;

    // Prev button
    let hoverPrev = mouseX > startX && mouseX < startX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    fill(hoverPrev ? 80 : 50);
    noStroke();
    rect(startX, btnY, btnW, btnH, 4);
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    text("<", startX + btnW/2, btnY + btnH/2);

    if (mouseClick && hoverPrev && etcState.mode === 'STEP' && etcStep > 0) {
        etcStep--;
        // Reset triggers and action completion for current and future steps
        for (let i = etcStep; i < etcMaxSteps; i++) {
            delete stepTriggered[i];
            delete stepActionComplete[i];
        }
    }

    // Play/Pause button
    let playX = startX + spacing;
    let hoverPlay = mouseX > playX && mouseX < playX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    fill(etcState.paused ? (hoverPlay ? 60 : 40) : (hoverPlay ? 100 : 70),
         etcState.paused ? (hoverPlay ? 140 : 100) : (hoverPlay ? 80 : 50),
         etcState.paused ? (hoverPlay ? 60 : 40) : (hoverPlay ? 60 : 40));
    rect(playX, btnY, btnW, btnH, 4);
    fill(255);
    text(etcState.paused ? "Play" : "Stop", playX + btnW/2, btnY + btnH/2);

    if (mouseClick && hoverPlay) {
        etcState.paused = !etcState.paused;
        if (!etcState.paused) etcState.mode = 'AUTO';
    }

    // Next button - check if current action is complete
    let nextX = startX + spacing * 2;
    let hoverNext = mouseX > nextX && mouseX < nextX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    let canAdvance = stepActionComplete[etcStep] === true;

    // Gray out if can't advance
    if (canAdvance) {
        fill(hoverNext ? 80 : 50);
    } else {
        fill(30); // Grayed out
    }
    rect(nextX, btnY, btnW, btnH, 4);
    fill(canAdvance ? 255 : 100); // Dimmed text if disabled
    text(">", nextX + btnW/2, btnY + btnH/2);

    if (mouseClick && hoverNext && etcState.mode === 'STEP' && etcStep < etcMaxSteps - 1 && canAdvance) {
        etcStep++;
        triggerStepAction(etcStep);
    }

    // Step indicator
    let stepX = startX + spacing * 3 + 10;
    fill(150);
    textSize(10);
    textAlign(LEFT, CENTER);
    if (etcState.mode === 'STEP') {
        text(etcStep + 1 + "/" + etcMaxSteps, stepX, btnY + btnH/2);
    } else {
        fill(100, 200, 100);
        text("Auto", stepX, btnY + btnH/2);
    }

    // Mode toggle - small text button
    let modeX = barX + barWidth - 45;
    let hoverMode = mouseX > modeX && mouseX < modeX + 35 && mouseY > btnY && mouseY < btnY + btnH;
    fill(hoverMode ? 100 : 70, hoverMode ? 70 : 50, hoverMode ? 130 : 100);
    rect(modeX, btnY, 35, btnH, 4);
    fill(255);
    textSize(9);
    textAlign(CENTER, CENTER);
    text(etcState.mode === 'STEP' ? "Auto" : "Step", modeX + 17, btnY + btnH/2);

    if (mouseClick && hoverMode) {
        modeSwitchCount++; // Track that user switched modes
        resetETCState(); // Reset simulation on mode switch

        if (etcState.mode === 'STEP') {
            etcState.mode = 'AUTO';
            etcState.paused = false;
        } else {
            etcState.mode = 'STEP';
            etcState.paused = true;
            etcStep = 0;
            stepTriggered = {};
        }
    }

    pop();

    // Draw step description if in STEP mode - more compact
    if (etcState.mode === 'STEP' && stepDescriptions[etcStep]) {
        drawStepDescription();
        // Ensure molecules exist for current step
        ensureStepMolecules(etcStep);
    }
}

function triggerStepAction(step) {
    // Ensure molecules exist for each step
    ensureStepMolecules(step);
}

function resetETCState() {
    // Reset all molecules
    etcState.electrons = [];
    etcState.protons = [];
    etcState.atpMolecules = [];
    etcState.oxygenMolecules = [];
    etcState.waterMolecules = [];
    waterCount = 0;
    etcState.atpCount = 0;
    etcState.electronCount = 0;

    // Reset NADH and FADH2
    etcState.nadh = [];
    etcState.fadh2 = [];
    for (let i = 0; i < 3; i++) {
        etcState.nadh.push({
            x: 50 + random(0, 30),
            y: etcState.matrixY + random(-30, 30),
            size: 30,
            hasElectrons: true,
            moving: false,
            targetComplex: 0
        });
    }
    etcState.fadh2.push({
        x: 50,
        y: etcState.matrixY + 50,
        size: 30,
        hasElectrons: true,
        moving: false,
        targetComplex: 1
    });

    // Reset complex active states
    for (let i = 0; i < etcState.proteinComplexes.length; i++) {
        etcState.proteinComplexes[i].active = false;
    }
    etcState.atpSynthase.active = false;
    etcState.atpSynthase.rotation = 0;

    // Reset step triggers and action completion
    stepTriggered = {};
    stepActionComplete = {};
}

function ensureStepMolecules(step) {
    let currentAction = stepDescriptions[step] ? stepDescriptions[step].action : null;
    let complexIndex = -1;

    // Determine which complex based on highlight
    let highlight = stepDescriptions[step] ? stepDescriptions[step].highlight : null;
    if (highlight === 'complex1') complexIndex = 0;
    else if (highlight === 'complex2') complexIndex = 1;
    else if (highlight === 'complex3') complexIndex = 2;
    else if (highlight === 'complex4') complexIndex = 3;

    // DRAG ACTIONS - ensure molecules exist
    if (currentAction === 'drag_nadh') {
        let hasNADH = etcState.nadh.some(n => n.hasElectrons);
        if (!hasNADH) {
            etcState.nadh.push({
                x: 100,
                y: etcState.matrixY + 30,
                size: 35,
                hasElectrons: true,
                moving: false,
                targetComplex: 0
            });
        }
    }

    if (currentAction === 'drag_fadh2') {
        let hasFADH2 = etcState.fadh2.some(f => f.hasElectrons);
        if (!hasFADH2) {
            etcState.fadh2.push({
                x: 100,
                y: etcState.matrixY + 80,
                size: 35,
                hasElectrons: true,
                moving: false,
                targetComplex: 1
            });
        }
    }

    if (currentAction === 'drag_oxygen') {
        if (etcState.oxygenMolecules.length < 1) {
            etcState.oxygenMolecules.push({
                x: width - 150,
                y: etcState.matrixY + 30,
                size: 30,
                vx: random(-0.5, 0.5),
                vy: random(-0.5, 0.5)
            });
        }
    }

    // WATCH action - just activate the highlighted complex
    if (currentAction === 'watch' && !stepTriggered[step]) {
        stepTriggered[step] = true;
        stepActionComplete[step] = true; // Watch actions complete immediately
        if (complexIndex >= 0) {
            etcState.proteinComplexes[complexIndex].active = true;
        }
    }

    // PUMP PROTONS action - pump H+ at highlighted complex
    if (currentAction === 'pump_protons' && !stepTriggered[step]) {
        stepTriggered[step] = true;
        stepActionComplete[step] = true; // Pump actions complete immediately
        if (complexIndex >= 0) {
            etcState.proteinComplexes[complexIndex].active = true;
            let numProtons = (complexIndex === 0 || complexIndex === 2) ? 4 : 2; // Complex I & III pump 4, IV pumps 2
            // Create protons directly in intermembrane space (result of pumping)
            for (let j = 0; j < numProtons; j++) {
                etcState.protons.push({
                    x: etcState.proteinComplexes[complexIndex].x + random(-40, 40),
                    y: etcState.intermembraneY + random(-20, 20),
                    size: 12,
                    targetY: etcState.intermembraneY,
                    pumped: true,
                    floatX: random(-0.5, 0.5),
                    floatY: random(-0.5, 0.5)
                });
            }
        }
    }

    // ELECTRON TRANSFER action - show electron at target complex
    if (currentAction === 'electron_transfer' && !stepTriggered[step]) {
        stepTriggered[step] = true;
        stepActionComplete[step] = true; // Electron transfer completes immediately
        if (complexIndex >= 0) {
            etcState.proteinComplexes[complexIndex].active = true;
            // Create electron directly at this complex (result of transfer)
            if (etcState.electrons.length < 3) {
                etcState.electrons.push({
                    x: etcState.proteinComplexes[complexIndex].x,
                    y: etcState.proteinComplexes[complexIndex].y,
                    size: 8,
                    currentComplex: complexIndex,
                    targetComplex: complexIndex + 1,
                    speed: 1.5
                });
                etcState.electronCount++;
            }
        }
    }

    // FORM WATER action - show water and pumped protons immediately
    if (currentAction === 'form_water' && !stepTriggered[step]) {
        stepTriggered[step] = true;
        stepActionComplete[step] = true; // Water formation completes immediately
        etcState.proteinComplexes[3].active = true;
        // Add protons directly to intermembrane space (Complex IV pumps 2)
        for (let j = 0; j < 2; j++) {
            etcState.protons.push({
                x: etcState.proteinComplexes[3].x + random(-40, 40),
                y: etcState.intermembraneY + random(-20, 20),
                size: 12,
                targetY: etcState.intermembraneY,
                pumped: true,
                floatX: random(-0.5, 0.5),
                floatY: random(-0.5, 0.5)
            });
        }
        // Create water immediately
        etcState.waterMolecules.push({
            x: etcState.proteinComplexes[3].x + random(-30, 30),
            y: etcState.proteinComplexes[3].y + 60,
            size: 20,
            life: 9999 // Long life so it stays visible
        });
        waterCount++;
    }

    // ATP PRODUCTION action - show ATP immediately
    if (currentAction === 'atp_production' && !stepTriggered[step]) {
        stepTriggered[step] = true;
        stepActionComplete[step] = true; // ATP production completes immediately
        etcState.atpSynthase.active = true;
        etcState.atpSynthase.rotation += 90;
        // Create ATP molecules immediately (result of chemiosmosis)
        for (let j = 0; j < 3; j++) {
            etcState.atpMolecules.push({
                x: etcState.atpSynthase.x + random(-20, 20),
                y: etcState.atpSynthase.y + 70 + j * 25,
                size: 25,
                life: 9999, // Long life so it stays visible
                vx: 0,
                vy: 0
            });
            etcState.atpCount++;
        }
    }

    // FULL AUTO mode - reset and run full simulation
    if (currentAction === 'auto' && !stepTriggered[step]) {
        stepTriggered[step] = true;
        hasCompletedStepMode = true; // User completed step mode

        resetETCState(); // Reset for fresh auto simulation

        // Start auto mode
        etcState.paused = false;
        etcState.mode = 'AUTO';
    }
}

function drawStepDescription() {
    let step = stepDescriptions[etcStep];

    push();
    // Measure text to fit box properly
    textSize(14);
    let titleWidth = textWidth(step.title);
    textSize(11);
    let descWidth = textWidth(step.description);

    // Calculate box dimensions
    let padding = 30;
    let boxWidth = max(titleWidth, descWidth) + padding * 2;
    boxWidth = min(boxWidth, width - 40); // Max width with margins

    let boxX = (width - boxWidth) / 2;

    // Description box - sized to fit content
    fill(0, 0, 0, 220);
    stroke(255, 200, 100);
    strokeWeight(2);
    rect(boxX, 8, boxWidth, 50, 8);

    // Title
    fill(255, 200, 100);
    textSize(14);
    textAlign(CENTER);
    noStroke();
    text(step.title, width/2, 28);

    // Description
    fill(220);
    textSize(11);
    text(step.description, width/2, 46);

    pop();

    // Set current highlight
    etcState.currentHighlight = step.highlight;
}

// Old unused functions removed

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

    // Check if click is on info panel area (bottom left stats)
    if (mouseX < 195 && mouseY > height - 100) {
        return true;
    }

    // Check if click is on step control bar (bottom center)
    let barWidth = 280;
    let barX = (width - barWidth) / 2;
    if (mouseX > barX - 5 && mouseX < barX + barWidth + 5 && mouseY > height - 55 && mouseY < height - 10) {
        return true;
    }

    // Check if click is on NEXT button area
    if (mouseWasReleasedAfterTutorial) {
        let nextBtnX = nextBtn.x - nextBtn.sizeX / 2;
        let nextBtnY = nextBtn.y - nextBtn.sizeY / 2;
        if (mouseX > nextBtnX && mouseX < nextBtnX + nextBtn.sizeX &&
            mouseY > nextBtnY && mouseY < nextBtnY + nextBtn.sizeY) {
            return true;
        }
    }

    // Check if step description panel is showing (compact box at top)
    if (etcState.mode === 'STEP' && stepDescriptions[etcStep]) {
        if (mouseY > 8 && mouseY < 58) {
            return true;
        }
    }

    return false;
}

function handleElementClicks() {
    // Check complexes
    for (let i = 0; i < etcState.proteinComplexes.length; i++) {
        let complex = etcState.proteinComplexes[i];
        if (mouseX > complex.x - complex.width / 2 && mouseX < complex.x + complex.width / 2 &&
            mouseY > complex.y - complex.height / 2 && mouseY < complex.y + complex.height / 2) {
            etcState.selectedElement = 'complex' + complex.type;
            etcState.selectedSubtab = null;
            return;
        }
    }

    // Check ATP Synthase
    let synthase = etcState.atpSynthase;
    if (mouseX > synthase.x - synthase.width && mouseX < synthase.x + synthase.width &&
        mouseY > synthase.y - synthase.height / 2 && mouseY < synthase.y + synthase.height / 2) {
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
    // Draw step highlights on complexes (no hover tooltips to reduce clutter)
    for (let i = 0; i < etcState.proteinComplexes.length; i++) {
        let complex = etcState.proteinComplexes[i];
        let isHovered = mouseX > complex.x - complex.width / 2 && mouseX < complex.x + complex.width / 2 &&
            mouseY > complex.y - complex.height / 2 && mouseY < complex.y + complex.height / 2;
        let isHighlighted = etcState.currentHighlight === 'complex' + complex.type;

        // Draw highlight for current step
        if (isHighlighted && etcState.mode === 'STEP') {
            noFill();
            stroke(255, 200, 100, 150 + sin(frameCount * 5) * 50);
            strokeWeight(3);
            rect(complex.x - complex.width / 2 - 5, complex.y - complex.height / 2 - 5,
                complex.width + 10, complex.height + 10, 10);
        }

        // Simple hover indicator
        if (isHovered && !isHighlighted) {
            noFill();
            stroke(255, 255, 255, 100);
            strokeWeight(2);
            rect(complex.x - complex.width / 2 - 3, complex.y - complex.height / 2 - 3,
                complex.width + 6, complex.height + 6, 8);
        }
    }

    // ATP Synthase highlight
    let synthase = etcState.atpSynthase;
    let isSynthaseHovered = mouseX > synthase.x - synthase.width && mouseX < synthase.x + synthase.width &&
        mouseY > synthase.y - synthase.height / 2 && mouseY < synthase.y + synthase.height / 2;
    let isSynthaseHighlighted = etcState.currentHighlight === 'atpSynthase';

    if (isSynthaseHighlighted && etcState.mode === 'STEP') {
        noFill();
        stroke(255, 200, 100, 150 + sin(frameCount * 5) * 50);
        strokeWeight(3);
        rect(synthase.x - synthase.width - 5, synthase.y - synthase.height / 2 - 5,
            synthase.width * 2 + 10, synthase.height + 10, 10);
    }

    if (isSynthaseHovered && !isSynthaseHighlighted) {
        noFill();
        stroke(255, 255, 255, 100);
        strokeWeight(2);
        rect(synthase.x - synthase.width - 3, synthase.y - synthase.height / 2 - 3,
            synthase.width * 2 + 6, synthase.height + 6, 8);
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
        } else if (etcState.selectedSubtab === 'chemiosmosis') {
            // Draw diagram showing H+ flow through ATP Synthase
            noStroke();
            fill(100, 150, 200, 100);
            rect(imgX - 80, imgY - 100, 160, 60); // Intermembrane
            fill(150, 100, 150, 100);
            rect(imgX - 80, imgY + 40, 160, 60); // Matrix
            fill(100, 100, 100);
            rect(imgX - 80, imgY - 40, 160, 80); // Membrane

            image(ATPSynthase1, imgX, imgY, 80, 160);

            // H+ arrows
            stroke(255, 200, 100);
            strokeWeight(3);
            line(imgX - 30, imgY - 60, imgX - 30, imgY + 60);
            line(imgX - 30, imgY + 60, imgX - 20, imgY + 50);
            line(imgX - 30, imgY + 60, imgX - 40, imgY + 50);

            fill(255);
            noStroke();
            textSize(12);
            textAlign(CENTER);
            text("H+ flows down gradient", imgX, imgY + 90);
            text("ATP produced!", imgX, imgY + 110);
        } else if (etcState.selectedSubtab === 'oxidativePhosphorylation') {
            // Draw diagram showing the two processes
            noStroke();

            // ETC side
            fill(100, 150, 200);
            rect(imgX - 100, imgY - 80, 90, 160, 10);
            fill(255);
            textSize(12);
            textAlign(CENTER);
            text("ETC", imgX - 55, imgY - 60);
            text("e- flow", imgX - 55, imgY - 40);
            text("H+ pumped", imgX - 55, imgY);

            // Arrow
            stroke(255, 200, 100);
            strokeWeight(3);
            line(imgX - 5, imgY, imgX + 15, imgY);
            line(imgX + 15, imgY, imgX + 5, imgY - 10);
            line(imgX + 15, imgY, imgX + 5, imgY + 10);

            // ATP Synthase side
            noStroke();
            fill(200, 150, 100);
            rect(imgX + 20, imgY - 80, 90, 160, 10);
            fill(255);
            text("ATP", imgX + 65, imgY - 60);
            text("Synthase", imgX + 65, imgY - 40);
            text("ADP+Pi→ATP", imgX + 65, imgY);

            fill(255);
            textSize(14);
            text("= Oxidative Phosphorylation", imgX, imgY + 100);
        } else if (etcState.selectedSubtab === 'electrochemicalGradient') {
            // Draw gradient visualization
            noStroke();

            // High concentration area
            fill(255, 100, 100);
            rect(imgX - 80, imgY - 100, 160, 80, 10);
            fill(255);
            textSize(14);
            textAlign(CENTER);
            text("HIGH H+", imgX, imgY - 70);
            text("(+) charge", imgX, imgY - 50);

            // Membrane
            fill(100, 100, 100);
            rect(imgX - 80, imgY - 20, 160, 40);
            fill(255);
            textSize(12);
            text("MEMBRANE", imgX, imgY + 5);

            // Low concentration area
            fill(100, 100, 255);
            rect(imgX - 80, imgY + 20, 160, 80, 10);
            fill(255);
            textSize(14);
            text("LOW H+", imgX, imgY + 50);
            text("(-) charge", imgX, imgY + 70);

            // Arrow showing force
            stroke(255, 200, 100);
            strokeWeight(4);
            line(imgX + 100, imgY - 60, imgX + 100, imgY + 60);
            line(imgX + 100, imgY + 60, imgX + 90, imgY + 50);
            line(imgX + 100, imgY + 60, imgX + 110, imgY + 50);
            noStroke();
            fill(255, 200, 100);
            textSize(10);
            text("Force", imgX + 100, imgY + 80);
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
        let subtabs = ['nadh', 'fadh2', 'oxygen', 'water', 'atp', 'chemiosmosis', 'oxidativePhosphorylation', 'electrochemicalGradient', 'proteins', 'mitochondria'];
        let subtabNames = ['NADH', 'FADH₂', 'O₂', 'H₂O', 'ATP', 'Chemio.', 'Ox. Phos.', 'Gradient', 'Proteins', 'Mito.'];
        let tabY1 = 430;
        let tabY2 = 470;
        let tabY3 = 510;
        let tabY4 = 550;

        for (let i = 0; i < subtabs.length; i++) {
            let row = Math.floor(i / 4);
            let col = i % 4;
            let tabX = 440 + col * 72;
            let tabY = row === 0 ? tabY1 : row === 1 ? tabY2 : row === 2 ? tabY3 : tabY4;

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
            textSize(9);
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