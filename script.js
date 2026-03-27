const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionText = document.getElementById('questionText');
const subText = document.getElementById('subText');
const heroImage = document.querySelector('.hero-image');

// Setup Audio safely via the HTML element to guarantee it plays on all mobile phones!
const bgMusic = document.getElementById('bgMusic');
bgMusic.loop = true;
let musicStarted = false;

function tryPlayMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(e => console.log("Can't play audio:", e));
        musicStarted = true;
    }
}

// Global states
let yesClickedTimes = 0;
let noClickCount = 0;

// All the generated cat image URLs we can swap to!
const catImages = {
    normal: "images/cat_normal.png",
    shocked: "images/cat_shocked.png",
    sad: "images/cat_sad.png",
    grumpy: "images/cat_grumpy.png"
};

// Extended NO Sequence
const noSequence = [
    { text: "Are you really sure?", sub: "Think hard about this...", img: catImages.shocked },
    { text: "Think about it! I have a stethoscope!", sub: "I can heal your broken heart.", img: catImages.normal },
    { text: "Don't break my heart!", sub: "Please?", img: catImages.sad },
    { text: "My tiny kitten tears are falling...", sub: "I'm literally crying right now.", img: catImages.sad },
    { text: "Getting a little grumpy now...", sub: "You're pushing your luck!", img: catImages.grumpy },
    { text: "Are you seriously still clicking this?", sub: "I'm giving you the silent treatment.", img: catImages.grumpy },
    { text: "Okay, I see how it is.", sub: "Last chance to make the right choice.", img: catImages.sad },
    { text: "I'm begging you now!", sub: "Look at these eyes!", img: catImages.shocked }
];

// Extended YES Sequence
const yesSequence = [
    { text: "Wait, so fast? Are you sure?", sub: "I mean, I'm cute, but take a second! 😏", img: catImages.shocked },
    { text: "Oh really? I dare you to click No!", sub: "Just to see what happens...", img: catImages.normal },
    { text: "Final answer?", sub: "You won't regret this!", img: catImages.sad }
];

yesBtn.addEventListener('click', () => {
    tryPlayMusic();
    
    // Quick pop animation
    yesBtn.style.transform = "scale(0.95)";
    setTimeout(() => yesBtn.style.transform = "translateY(-2px)", 150);

    if (yesClickedTimes < yesSequence.length) {
        // Step through the yes dare/confirmation messages
        const current = yesSequence[yesClickedTimes];
        questionText.innerHTML = current.text;
        subText.innerHTML = current.sub;
        heroImage.src = current.img;
        
        // Shake NO button to tempt her
        noBtn.classList.add('shake');
        setTimeout(() => noBtn.classList.remove('shake'), 400);
        
        yesClickedTimes++;
    } else {
        // Final Win when yes sequence is fully completed
        questionText.innerHTML = "I knew you always liked me. 💖💍";
        subText.innerHTML = "Best decision ever made.";
        heroImage.src = catImages.normal;
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        
        createConfetti();
    }
});

noBtn.addEventListener('click', () => {
    tryPlayMusic();
    
    // Step through the long NO sequence
    if (noClickCount < noSequence.length) {
        const current = noSequence[noClickCount];
        questionText.innerHTML = current.text;
        subText.innerHTML = current.sub;
        heroImage.src = current.img;
        noClickCount++;
        
        // Shrink the No button and Grow the Yes button massively over time
        // This is a super fun UI trick
        const yesSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        const yesPadTop = parseFloat(window.getComputedStyle(yesBtn).paddingTop);
        const yesPadLeft = parseFloat(window.getComputedStyle(yesBtn).paddingLeft);
        
        yesBtn.style.fontSize = `${yesSize + 6}px`;
        yesBtn.style.padding = `${yesPadTop + 8}px ${yesPadLeft + 16}px`;
        
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        if (noSize > 6) {
            noBtn.style.fontSize = `${noSize - 1.5}px`;
        }
        
    } else {
        // Exhausted NO clicks completely
        questionText.innerHTML = "I knew you always liked me. 💖💍";
        subText.innerHTML = "Resistance was futile. 🥰";
        heroImage.src = catImages.normal;
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        
        createConfetti();
    }
});

function createConfetti() {
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '12px';
        confetti.style.height = '12px';
        // Fun colors for confetti
        const colors = ['#db2777', '#f43f5e', '#10b981', '#fbbf24', '#3b82f6'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `-20px`;
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        confetti.style.zIndex = '100';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)` }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'linear'
        });
    }
}
