// Calvin Cycle - Interactive Educational Simulation

var calvinStep = 0;
var calvinStepTriggered = {};
var calvinCompleted = false;
var calvinJustDropped = false;

// Dragging
var calvinDragging = null;
var calvinDragOffsetX = 0;
var calvinDragOffsetY = 0;

// Animation
var calvinFadeIn = 0;
var calvinPulse = 0;

// State
var calvinState = {
    initialized: false,
    co2: [],
    rubp: [],
    pga: [],
    bpg: [],
    g3p: [],
    atp: [],
    nadph: [],
    rubiscoX: 0,
    rubiscoY: 0,
    center: { x: 400, y: 380 },
    selectedElement: null,
    dropsThisStep: 0
};

// Step definitions - merged explanation and action
var calvinSteps = [
    {
        phase: "Welcome",
        title: "The Calvin Cycle",
        text: "This is where plants turn CO₂ into sugar! The Calvin Cycle occurs in the chloroplast stroma, using ATP and NADPH from the light reactions.",
        action: null,
        setup: function () {
            // Show Rubisco and initial RuBP
            calvinState.rubp = [{
                x: calvinState.rubiscoX + 100,
                y: calvinState.rubiscoY - 20,
                size: 60
            }];
        }
    },
    {
        phase: "Carbon Fixation",
        title: "Step 1: CO₂ Arrives",
        text: "CO₂ enters through tiny pores called stomata. Drag the CO₂ molecule to Rubisco, the enzyme that will 'fix' it.",
        action: "drag_co2",
        setup: function () {
            calvinState.co2 = [{
                x: 100,
                y: calvinState.center.y,
                size: 55,
                draggable: true
            }];
        }
    },
    {
        phase: "Carbon Fixation",
        title: "Step 2: Carbon Fixation",
        text: "Rubisco combines CO₂ with RuBP (5 carbons) to make an unstable 6-carbon molecule that immediately splits into TWO 3-PGA molecules (3 carbons each).",
        action: null,
        setup: function () {
            calvinState.co2 = [];
            calvinState.rubp = [];
            calvinState.pga = [
                { x: calvinState.rubiscoX - 80, y: calvinState.rubiscoY - 100, size: 55 },
                { x: calvinState.rubiscoX + 80, y: calvinState.rubiscoY - 100, size: 55 }
            ];
        }
    },
    {
        phase: "Reduction",
        title: "Step 3: Energy Transfer",
        text: "Now we need energy! Drag BOTH ATP molecules to the 3-PGA molecules. ATP will donate phosphate groups, transforming 3-PGA into 1,3-BPG.",
        action: "drag_atp",
        requiredDrops: 2,
        setup: function () {
            calvinState.atp = [
                { x: 80, y: calvinState.center.y + 80, size: 55, draggable: true },
                { x: 80, y: calvinState.center.y + 150, size: 55, draggable: true }
            ];
        }
    },
    {
        phase: "Reduction",
        title: "Step 4: Electron Donation",
        text: "Drag BOTH NADPH molecules to provide high-energy electrons. NADPH reduces 1,3-BPG to G3P, the actual sugar product!",
        action: "drag_nadph",
        requiredDrops: 2,
        setup: function () {
            calvinState.atp = [];
            calvinState.pga = [];
            calvinState.bpg = [
                { x: calvinState.center.x - 70, y: calvinState.center.y - 120, size: 55 },
                { x: calvinState.center.x + 70, y: calvinState.center.y - 120, size: 55 }
            ];
            calvinState.nadph = [
                { x: 80, y: calvinState.center.y + 80, size: 50, draggable: true },
                { x: 80, y: calvinState.center.y + 150, size: 50, draggable: true }
            ];
        }
    },
    {
        phase: "Reduction",
        title: "Step 5: G3P Produced!",
        text: "G3P (glyceraldehyde-3-phosphate) is formed! For every 3 CO₂ fixed, 6 G3P molecules are made. This is the sugar that plants use to build everything!",
        action: null,
        setup: function () {
            calvinState.nadph = [];
            calvinState.bpg = [];
            calvinState.g3p = [];
            for (let i = 0; i < 6; i++) {
                let angle = (i * 60 - 90) * PI / 180;
                calvinState.g3p.push({
                    x: calvinState.center.x + 110 * cos(angle),
                    y: calvinState.center.y - 30 + 90 * sin(angle),
                    size: 50
                });
            }
        }
    },
    {
        phase: "Output",
        title: "Step 6: Sugar Export",
        text: "Here's the key: only 1 out of 6 G3P molecules leaves the cycle! This G3P is used to make glucose, sucrose, starch, and other organic molecules. The other 5 stay behind...",
        action: null,
        setup: function () {
            // Move one G3P to the exit
            if (calvinState.g3p.length > 0) {
                calvinState.g3p[0].x = width - 120;
                calvinState.g3p[0].y = 120;
                calvinState.g3p[0].exported = true;
            }
        }
    },
    {
        phase: "Regeneration",
        title: "Step 7: Regeneration",
        text: "The remaining 5 G3P molecules are rearranged in a complex series of reactions. Drag ATP to power the regeneration of RuBP!",
        action: "drag_atp_regen",
        setup: function () {
            calvinState.g3p = calvinState.g3p.filter(g => !g.exported);
            // Arrange remaining G3P
            let remaining = calvinState.g3p.slice(0, 5);
            for (let i = 0; i < remaining.length; i++) {
                remaining[i].x = calvinState.center.x - 80 + (i % 3) * 80;
                remaining[i].y = calvinState.center.y - 80 + Math.floor(i / 3) * 70;
            }
            calvinState.g3p = remaining;
            calvinState.atp = [{
                x: 100,
                y: calvinState.center.y + 100,
                size: 55,
                draggable: true
            }];
        }
    },
    {
        phase: "Regeneration",
        title: "Step 8: Cycle Complete!",
        text: "RuBP is regenerated and ready to accept more CO₂! The cycle continues as long as light provides ATP and NADPH. Summary: 3 CO₂ + 9 ATP + 6 NADPH → 1 G3P (net output)",
        action: null,
        setup: function () {
            calvinState.g3p = [];
            calvinState.atp = [];
            calvinState.rubp = [];
            for (let i = 0; i < 3; i++) {
                let angle = (i * 120 - 90) * PI / 180;
                calvinState.rubp.push({
                    x: calvinState.center.x + 100 * cos(angle),
                    y: calvinState.center.y + 80 * sin(angle),
                    size: 60
                });
            }
        }
    },
    {
        phase: "Summary",
        title: "The Calvin Cycle",
        text: "You've completed the Calvin Cycle! This is how plants convert CO₂ and sunlight into the sugars that fuel almost all life on Earth. Two G3P → one glucose. Click any molecule to learn more!",
        action: null,
        setup: function () {
            calvinCompleted = true;
            // Show all molecules arranged nicely
            let cx = calvinState.center.x;
            let cy = calvinState.center.y;

            // CO2 on the left
            calvinState.co2 = [{ x: 60, y: cy - 60, size: 50 }];

            // RuBP near top
            calvinState.rubp = [{ x: cx - 100, y: cy - 120, size: 55 }];

            // 3-PGA
            calvinState.pga = [{ x: cx + 100, y: cy - 120, size: 50 }];

            // 1,3-BPG
            calvinState.bpg = [{ x: cx + 140, y: cy - 40, size: 50 }];

            // G3P (the product!)
            calvinState.g3p = [
                { x: cx + 100, y: cy + 60, size: 55 },
                { x: width - 80, y: cy - 80, size: 50, exported: true }
            ];

            // ATP on left side
            calvinState.atp = [{ x: 60, y: cy + 60, size: 50 }];

            // NADPH below ATP
            calvinState.nadph = [{ x: 60, y: cy + 130, size: 45 }];
        }
    }
];

// Element info
var calvinInfo = {
    co2: {
        name: "Carbon Dioxide (CO₂)",
        desc: "CO₂ enters through stomata. Each molecule has 1 carbon that gets 'fixed' into organic form. 6 CO₂ are needed for 1 glucose."
    },
    rubp: {
        name: "RuBP",
        desc: "Ribulose-1,5-bisphosphate. A 5-carbon sugar that accepts CO₂. Named after Melvin Calvin who discovered this cycle in the 1950s."
    },
    rubisco: {
        name: "Rubisco",
        desc: "The most abundant enzyme on Earth! Catalyzes CO₂ + RuBP → 2 × 3-PGA. Slow (~3/sec) but incredibly important."
    },
    pga: {
        name: "3-PGA",
        desc: "3-Phosphoglycerate. A 3-carbon molecule. Two are made when Rubisco fixes one CO₂ with one RuBP."
    },
    bpg: {
        name: "1,3-BPG",
        desc: "1,3-Bisphosphoglycerate. Formed when ATP adds a phosphate to 3-PGA. A high-energy intermediate."
    },
    g3p: {
        name: "G3P",
        desc: "Glyceraldehyde-3-phosphate. THE sugar product! 2 G3P → 1 glucose. Only 1 in 6 exits; the rest regenerate RuBP."
    },
    atp: {
        name: "ATP",
        desc: "Adenosine triphosphate. Energy currency from light reactions. 9 ATP needed per 3 CO₂ fixed (6 for reduction, 3 for regeneration)."
    },
    nadph: {
        name: "NADPH",
        desc: "Electron carrier from light reactions. Provides reducing power to convert 1,3-BPG → G3P. 6 NADPH per 3 CO₂."
    }
};

function marenSetup() {
    calvinStep = 0;
    calvinStepTriggered = {};
    calvinCompleted = false;
    calvinFadeIn = 0;
    initCalvin();
}

function initCalvin() {
    calvinState.initialized = true;
    calvinState.center = { x: width / 2, y: height / 2 };
    calvinState.rubiscoX = calvinState.center.x;
    calvinState.rubiscoY = calvinState.center.y + 60;

    // Clear all
    calvinState.co2 = [];
    calvinState.rubp = [];
    calvinState.pga = [];
    calvinState.bpg = [];
    calvinState.g3p = [];
    calvinState.atp = [];
    calvinState.nadph = [];
    calvinState.selectedElement = null;

    // Run initial setup
    if (calvinSteps[0].setup) {
        calvinSteps[0].setup();
    }
}

function maren() {
    // Soft gradient background
    drawCalvinBackground();

    if (!calvinState.initialized) {
        marenSetup();
    }

    calvinFadeIn = min(calvinFadeIn + 0.02, 1);
    calvinPulse = (calvinPulse + 0.05) % (TWO_PI);

    if (calvinState.selectedElement) {
        drawCalvinInfo();
    } else {
        // Draw cycle visualization
        drawCalvinCycle();

        // Draw molecules
        drawCalvinMolecules();

        // Draw instruction panel
        drawCalvinInstruction();

        // Handle interactions
        handleCalvinInteraction();

        // Handle clicks on molecules
        if (mouseClick && !calvinJustDropped && !isClickOnInstruction()) {
            handleCalvinClick();
        }
    }

    if (calvinJustDropped && !mouseIsPressed) {
        calvinJustDropped = false;
    }

    // Show NEXT button when complete
    if (calvinCompleted) {
        nextButton();
    }
}

function drawCalvinBackground() {
    // Soft green gradient suggesting chloroplast stroma
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(color(220, 240, 220), color(180, 220, 180), inter);
        stroke(c);
        line(0, y, width, y);
    }

    // Subtle pattern
    noStroke();
    fill(255, 255, 255, 15);
    for (let i = 0; i < 20; i++) {
        let x = (i * 137 + frameCount * 0.1) % (width + 100) - 50;
        let y = (i * 89) % height;
        ellipse(x, y, 80 + sin(frameCount * 0.02 + i) * 20);
    }
}

function drawCalvinCycle() {
    push();

    // Cycle ring
    noFill();
    stroke(100, 160, 100, 80);
    strokeWeight(3);
    ellipse(calvinState.center.x, calvinState.center.y, 320, 320);

    // Inner glow
    for (let i = 0; i < 3; i++) {
        stroke(100, 180, 100, 30 - i * 10);
        strokeWeight(8 - i * 2);
        ellipse(calvinState.center.x, calvinState.center.y, 320 + i * 10, 320 + i * 10);
    }

    // Phase labels around cycle
    fill(80, 130, 80);
    noStroke();
    textSize(11);
    textAlign(CENTER);

    let step = calvinSteps[calvinStep];
    if (step.phase === "Carbon Fixation") {
        fill(80, 130, 80, 200);
        text("CARBON FIXATION", calvinState.center.x, calvinState.center.y - 180);
    } else if (step.phase === "Reduction") {
        fill(80, 130, 80, 200);
        text("REDUCTION", calvinState.center.x - 160, calvinState.center.y);
    } else if (step.phase === "Regeneration" || step.phase === "Output") {
        fill(80, 130, 80, 200);
        text("REGENERATION", calvinState.center.x, calvinState.center.y + 190);
    }

    // Rubisco enzyme (always visible)
    drawRubisco();

    pop();
}

function drawRubisco() {
    push();
    imageMode(CENTER);

    // Highlight when relevant
    let step = calvinSteps[calvinStep];
    if (step.action === "drag_co2") {
        // Pulsing highlight
        let pulse = sin(calvinPulse * 2) * 0.3 + 0.7;
        noFill();
        stroke(255, 200, 100, 150 * pulse);
        strokeWeight(4);
        ellipse(calvinState.rubiscoX, calvinState.rubiscoY, 110, 110);
    }

    image(Rubisco, calvinState.rubiscoX, calvinState.rubiscoY, 90, 90);

    // Label
    fill(60, 100, 60);
    noStroke();
    textSize(13);
    textAlign(CENTER);
    textStyle(BOLD);
    text("Rubisco", calvinState.rubiscoX, calvinState.rubiscoY + 60);
    textStyle(NORMAL);
    pop();
}

function drawCalvinMolecules() {
    push();
    imageMode(CENTER);

    let step = calvinSteps[calvinStep];

    // RuBP
    for (let m of calvinState.rubp) {
        if (step.phase === "Regeneration" && calvinStep === 8) {
            // Highlight regenerated RuBP
            noFill();
            stroke(100, 200, 100, 100 + sin(calvinPulse * 2) * 50);
            strokeWeight(3);
            ellipse(m.x, m.y, m.size + 15, m.size + 15);
        }
        image(RuBP, m.x, m.y, m.size, m.size);
    }

    // CO2
    for (let m of calvinState.co2) {
        image(COTwo, m.x, m.y, m.size, m.size);
    }

    // 3-PGA
    for (let m of calvinState.pga) {
        if (step.action === "drag_atp" && !m.hasATP) {
            noFill();
            stroke(255, 200, 100, 100 + sin(calvinPulse * 2) * 50);
            strokeWeight(2);
            ellipse(m.x, m.y, m.size + 12, m.size + 12);
        }
        if (m.hasATP) {
            tint(255, 150); // Faded if already has ATP
        }
        image(ThreePG, m.x, m.y, m.size, m.size);
        noTint();
    }

    // 1,3-BPG
    for (let m of calvinState.bpg) {
        if (step.action === "drag_nadph" && !m.hasNADPH) {
            noFill();
            stroke(255, 200, 100, 100 + sin(calvinPulse * 2) * 50);
            strokeWeight(2);
            ellipse(m.x, m.y, m.size + 12, m.size + 12);
        }
        if (m.hasNADPH) {
            tint(255, 150); // Faded if already has NADPH
        }
        image(ThreeBiphospholgycerate, m.x, m.y, m.size, m.size);
        noTint();
    }

    // G3P
    for (let m of calvinState.g3p) {
        if (m.exported) {
            // Special styling for exported G3P
            fill(255, 255, 200, 50);
            noStroke();
            ellipse(m.x, m.y, m.size + 20, m.size + 20);
        }
        image(GThreeP, m.x, m.y, m.size, m.size);
        if (m.exported) {
            fill(80, 130, 80);
            textSize(10);
            textAlign(CENTER);
            text("→ Glucose!", m.x, m.y + 40);
        }
    }

    // ATP
    for (let m of calvinState.atp) {
        if (m.used) {
            tint(255, 100); // Faded if used
        }
        image(Atp, m.x, m.y, m.size, m.size * 0.7);
        noTint();
    }

    // NADPH
    for (let m of calvinState.nadph) {
        if (m.used) {
            tint(255, 100); // Faded if used
        }
        image(NADPH, m.x, m.y, m.size, m.size);
        noTint();
    }

    // Add labels on summary screen
    if (calvinCompleted) {
        fill(60, 100, 60);
        textSize(10);
        textAlign(CENTER);
        noStroke();

        // Label each molecule type
        if (calvinState.co2.length > 0) {
            text("CO₂", calvinState.co2[0].x, calvinState.co2[0].y + 35);
        }
        if (calvinState.rubp.length > 0) {
            text("RuBP", calvinState.rubp[0].x, calvinState.rubp[0].y + 38);
        }
        if (calvinState.pga.length > 0) {
            text("3-PGA", calvinState.pga[0].x, calvinState.pga[0].y + 35);
        }
        if (calvinState.bpg.length > 0) {
            text("1,3-BPG", calvinState.bpg[0].x, calvinState.bpg[0].y + 35);
        }
        if (calvinState.g3p.length > 0) {
            for (let g of calvinState.g3p) {
                if (!g.exported) {
                    text("G3P", g.x, g.y + 38);
                }
            }
        }
        if (calvinState.atp.length > 0) {
            text("ATP", calvinState.atp[0].x, calvinState.atp[0].y + 32);
        }
        if (calvinState.nadph.length > 0) {
            text("NADPH", calvinState.nadph[0].x, calvinState.nadph[0].y + 32);
        }
    }

    pop();
}

function drawCalvinInstruction() {
    let step = calvinSteps[calvinStep];

    push();

    // Instruction panel at top
    let panelHeight = 100;

    // Semi-transparent panel
    fill(255, 255, 255, 230);
    noStroke();
    rect(20, 15, width - 40, panelHeight, 15);

    // Accent line
    fill(100, 180, 100);
    noStroke();
    rect(20, 15, 6, panelHeight, 15, 0, 0, 15);

    // Phase indicator
    fill(100, 160, 100);
    textSize(11);
    textAlign(LEFT);
    textStyle(BOLD);
    text(step.phase.toUpperCase(), 40, 38);
    textStyle(NORMAL);

    // Step counter
    fill(150);
    textSize(11);
    textAlign(RIGHT);
    text((calvinStep + 1) + " / " + calvinSteps.length, width - 35, 38);

    // Title
    fill(50, 90, 50);
    textSize(18);
    textAlign(LEFT);
    textStyle(BOLD);
    text(step.title, 40, 62);
    textStyle(NORMAL);

    // Description
    fill(70, 70, 70);
    textSize(13);
    textAlign(LEFT);
    text(step.text, 40, 82, width - 80, 50);

    // Action hint
    if (step.action) {
        fill(180, 130, 50);
        textSize(11);
        textAlign(RIGHT);
        textStyle(ITALIC);
        let requiredDrops = step.requiredDrops || 1;
        if (requiredDrops > 1) {
            text("(" + calvinState.dropsThisStep + "/" + requiredDrops + ") Drag both molecules!", width - 35, 105);
        } else {
            text("Drag the molecule!", width - 35, 105);
        }
        textStyle(NORMAL);
    } else if (!calvinCompleted && calvinStep < calvinSteps.length - 1) {
        fill(100, 160, 100);
        textSize(11);
        textAlign(RIGHT);
        textStyle(ITALIC);
        text("Click to continue →", width - 35, 105);
        textStyle(NORMAL);
    }

    pop();

    // Hint to click molecules
    if (calvinStep > 0) {
        push();
        fill(100, 100, 100, 150);
        textSize(10);
        textAlign(LEFT);
        text("Click any molecule for more info", 25, height - 20);
        pop();
    }
}

function handleCalvinInteraction() {
    let step = calvinSteps[calvinStep];

    // Handle dragging
    if (step.action) {
        // Start drag
        if (mouseIsPressed && !calvinDragging) {
            let targets = [];
            if (step.action === "drag_co2") targets = calvinState.co2;
            else if (step.action === "drag_atp" || step.action === "drag_atp_regen") targets = calvinState.atp;
            else if (step.action === "drag_nadph") targets = calvinState.nadph;

            for (let m of targets) {
                if (m.draggable && dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 15) {
                    calvinDragging = m;
                    calvinDragOffsetX = m.x - mouseX;
                    calvinDragOffsetY = m.y - mouseY;
                    break;
                }
            }
        }

        // Update drag position
        if (calvinDragging && mouseIsPressed) {
            calvinDragging.x = mouseX + calvinDragOffsetX;
            calvinDragging.y = mouseY + calvinDragOffsetY;
        }

        // Drop
        if (calvinDragging && !mouseIsPressed) {
            checkCalvinDrop(step);
            calvinDragging = null;
            calvinJustDropped = true;
        }
    }
}

function checkCalvinDrop(step) {
    if (!calvinDragging) return;

    let success = false;
    let targetIndex = -1;

    if (step.action === "drag_co2") {
        // Drop on Rubisco
        if (dist(calvinDragging.x, calvinDragging.y, calvinState.rubiscoX, calvinState.rubiscoY) < 70) {
            success = true;
        }
    } else if (step.action === "drag_atp") {
        // Drop on 3-PGA (match to specific one)
        for (let i = 0; i < calvinState.pga.length; i++) {
            let pga = calvinState.pga[i];
            if (!pga.hasATP && dist(calvinDragging.x, calvinDragging.y, pga.x, pga.y) < 60) {
                success = true;
                targetIndex = i;
                break;
            }
        }
    } else if (step.action === "drag_nadph") {
        // Drop on 1,3-BPG (match to specific one)
        for (let i = 0; i < calvinState.bpg.length; i++) {
            let bpg = calvinState.bpg[i];
            if (!bpg.hasNADPH && dist(calvinDragging.x, calvinDragging.y, bpg.x, bpg.y) < 60) {
                success = true;
                targetIndex = i;
                break;
            }
        }
    } else if (step.action === "drag_atp_regen") {
        // Drop near center/G3P area
        if (dist(calvinDragging.x, calvinDragging.y, calvinState.center.x, calvinState.center.y - 50) < 120) {
            success = true;
        }
    }

    if (success) {
        // Mark this molecule as used
        calvinDragging.draggable = false;
        calvinDragging.used = true;

        // Mark target as receiving molecule
        if (step.action === "drag_atp" && targetIndex >= 0) {
            calvinState.pga[targetIndex].hasATP = true;
        } else if (step.action === "drag_nadph" && targetIndex >= 0) {
            calvinState.bpg[targetIndex].hasNADPH = true;
        }

        calvinState.dropsThisStep++;

        // Check if we have enough drops to advance
        let requiredDrops = step.requiredDrops || 1;
        if (calvinState.dropsThisStep >= requiredDrops) {
            advanceCalvinStep();
        }
    }
}

function advanceCalvinStep() {
    if (calvinStep < calvinSteps.length - 1) {
        calvinStep++;
        calvinState.dropsThisStep = 0;
        if (calvinSteps[calvinStep].setup) {
            calvinSteps[calvinStep].setup();
        }
    }
}

function isClickOnInstruction() {
    return mouseY < 125;
}

function handleCalvinClick() {
    // Check if clicking to advance (for non-action steps)
    let step = calvinSteps[calvinStep];
    if (!step.action && calvinStep < calvinSteps.length - 1) {
        advanceCalvinStep();
        return;
    }

    // Check molecule clicks for info
    if (dist(mouseX, mouseY, calvinState.rubiscoX, calvinState.rubiscoY) < 50) {
        calvinState.selectedElement = "rubisco";
        return;
    }

    for (let m of calvinState.co2) {
        if (dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 5) {
            calvinState.selectedElement = "co2";
            return;
        }
    }

    for (let m of calvinState.rubp) {
        if (dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 5) {
            calvinState.selectedElement = "rubp";
            return;
        }
    }

    for (let m of calvinState.pga) {
        if (dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 5) {
            calvinState.selectedElement = "pga";
            return;
        }
    }

    for (let m of calvinState.bpg) {
        if (dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 5) {
            calvinState.selectedElement = "bpg";
            return;
        }
    }

    for (let m of calvinState.g3p) {
        if (dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 5) {
            calvinState.selectedElement = "g3p";
            return;
        }
    }

    for (let m of calvinState.atp) {
        if (dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 5) {
            calvinState.selectedElement = "atp";
            return;
        }
    }

    for (let m of calvinState.nadph) {
        if (dist(mouseX, mouseY, m.x, m.y) < m.size / 2 + 5) {
            calvinState.selectedElement = "nadph";
            return;
        }
    }
}

function drawCalvinInfo() {
    let info = calvinInfo[calvinState.selectedElement];
    if (!info) {
        calvinState.selectedElement = null;
        return;
    }

    push();

    // Dim background
    fill(0, 0, 0, 150);
    noStroke();
    rect(0, 0, width, height);

    // Info card
    let cardW = 500;
    let cardH = 320;
    let cardX = (width - cardW) / 2;
    let cardY = (height - cardH) / 2;

    // Card shadow
    fill(0, 0, 0, 30);
    rect(cardX + 8, cardY + 8, cardW, cardH, 20);

    // Card background
    fill(255);
    stroke(100, 180, 100);
    strokeWeight(3);
    rect(cardX, cardY, cardW, cardH, 20);

    // Image area
    fill(240, 250, 240);
    noStroke();
    rect(cardX + 20, cardY + 20, 180, 180, 15);

    imageMode(CENTER);
    let imgX = cardX + 110;
    let imgY = cardY + 110;

    if (calvinState.selectedElement === "rubisco") {
        image(Rubisco, imgX, imgY, 140, 140);
    } else if (calvinState.selectedElement === "co2") {
        image(COTwo, imgX, imgY, 120, 120);
    } else if (calvinState.selectedElement === "rubp") {
        image(RuBP, imgX, imgY, 120, 120);
    } else if (calvinState.selectedElement === "pga") {
        image(ThreePG, imgX, imgY, 120, 120);
    } else if (calvinState.selectedElement === "bpg") {
        image(ThreeBiphospholgycerate, imgX, imgY, 120, 120);
    } else if (calvinState.selectedElement === "g3p") {
        image(GThreeP, imgX, imgY, 120, 120);
    } else if (calvinState.selectedElement === "atp") {
        image(Atp, imgX, imgY, 140, 100);
    } else if (calvinState.selectedElement === "nadph") {
        image(NADPH, imgX, imgY, 120, 120);
    }

    // Title
    fill(50, 100, 50);
    textSize(22);
    textAlign(LEFT);
    textStyle(BOLD);
    text(info.name, cardX + 220, cardY + 50);
    textStyle(NORMAL);

    // Description
    fill(60, 60, 60);
    textSize(15);
    textAlign(LEFT, TOP);
    text(info.desc, cardX + 220, cardY + 70, 250, 200);

    // Close button
    let closeX = cardX + cardW - 50;
    let closeY = cardY + 20;
    let closeHover = dist(mouseX, mouseY, closeX + 15, closeY + 15) < 20;

    fill(closeHover ? color(220, 80, 80) : color(180, 80, 80));
    noStroke();
    ellipse(closeX + 15, closeY + 15, 35, 35);

    stroke(255);
    strokeWeight(2);
    line(closeX + 8, closeY + 8, closeX + 22, closeY + 22);
    line(closeX + 22, closeY + 8, closeX + 8, closeY + 22);

    if (mouseClick && closeHover) {
        calvinState.selectedElement = null;
    }

    // Click anywhere to close hint
    fill(200);
    textSize(11);
    textAlign(CENTER);
    noStroke();
    text("Click anywhere to close", width / 2, cardY + cardH + 30);

    // Close on click outside
    if (mouseClick && !closeHover &&
        (mouseX < cardX || mouseX > cardX + cardW || mouseY < cardY || mouseY > cardY + cardH)) {
        calvinState.selectedElement = null;
    }

    pop();
}
