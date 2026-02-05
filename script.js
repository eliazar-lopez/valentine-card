document.addEventListener("DOMContentLoaded", () => {
    
    // PANELS
    const envelopePanel = document.getElementById("envelopePanel");
    const intro = document.getElementById("intro");
    const questionPanel = document.getElementById("questionPanel");
    const yesPanel = document.getElementById("yesPanel");


    // BUTTONS
    const revealBtn = document.getElementById("revealBtn");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const musicBtn = document.getElementById("musicBtn");
    const song = document.getElementById("song");

    // PANEL SWITCH HELPER
    function showPanel(current, next) {
      if (!current || !next) {
        console.error("Panel missing:", current, next);
        return;
      }
      current.classList.remove("show");
      next.classList.add("show");
    }


    // TYPEWRITER EFFECT
    const typewriterText = "I have something important to ask you...but first, let's take a little trip down to memory lane:";
    const typewriterElement = document.getElementById("typewriter");
    const timelineLines = document.querySelectorAll(".timeline p");

    let index = 0;

    function typeIntroAndTimeline() {
      // Type the main intro line first
      if (index < typewriterText.length) {
        typewriterElement.textContent += typewriterText[index++];
        setTimeout(typeIntroAndTimeline, 60); // speed of typing
      } else {
        // After intro finishes, start timeline lines
        typeTimeline(0);
      }
    }

    // Recursive function to type timeline lines
    function typeTimeline(lineIndex) {
      if (lineIndex >= timelineLines.length) return;

      const line = timelineLines[lineIndex];
      const text = line.textContent;
      line.textContent = "";
      line.classList.add("show"); // fade in

      let charIndex = 0;

      function typeChar() {
        if (charIndex < text.length) {
          line.textContent += text[charIndex++];
          setTimeout(typeChar, 40); // timeline typing speed
        } else {
          setTimeout(() => typeTimeline(lineIndex + 1), 400); // wait then next line
        }
      }

      typeChar();
    }

    // Start it all
    typeIntroAndTimeline();


        // volume control
        const volumeSlider = document.getElementById("volumeSlider");
        volumeSlider.addEventListener("input", (e) => { 
          song.volume = e.target.value; 
        });

        // MUSIC BUTTON
        let isPlaying = false;

          musicBtn.addEventListener("click", () => {
          if (!isPlaying) {
            song.play();
            musicBtn.textContent = "⏸ Pause Music";
          } else {
            song.pause();
            musicBtn.textContent = "▶️ Play Music";
          }
          isPlaying = !isPlaying;
        });


        // REVEAL → QUESTION PANEL
        revealBtn.addEventListener("click", () => {
          showPanel(intro, questionPanel);
        });

// 💖 Floating hearts generator
  function startHearts() {
    const heartInterval = setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.textContent = "💖";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 15 + "px";

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 4000);
    }, 200);

    // stop after 5 seconds
    setTimeout(() => clearInterval(heartInterval), 5000);
  }

  // 🎉 Confetti burst (simple + reliable)
    function confettiBurst() {
      for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.opacity = 1;
        confetti.style.borderRadius = "50%";

        document.body.appendChild(confetti);

        const fall = confetti.animate(
          [
            { transform: "translateY(0)", opacity: 1 },
            { transform: `translateY(110vh)`, opacity: 0 }
          ],
          {
            duration: 3000 + Math.random() * 2000,
            easing: "ease-out"
          }
        );

        fall.onfinish = () => confetti.remove();
      }
    }

    // YES → FINAL PANEL
        yesBtn.addEventListener("click", () => {
          showPanel(questionPanel, yesPanel);
          startHearts();
          confettiBurst();
          typeYesMessage();
        });
  
    // NO → EVASIVE BUTTON + progressive shrink
    let noScale = 1;   // starting scale for NO
    let yesScale = 1;  // starting scale for YES
    const scaleStep = 0.1;  // amount per click
    const minNoScale = 0.05; // minimum size for NO

    // Hover dodge
    noBtn.addEventListener("mouseenter", () => {
      const offsetX = (Math.random() - 0.5) * 300;
      const offsetY = (Math.random() - 0.5) * 120;
      noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${noScale})`;
    });

    noBtn.addEventListener("mouseleave", () => {
      noBtn.style.transform = `scale(${noScale})`;
    });

    // Click shrink, YES grows
    noBtn.addEventListener("click", () => {
      // Shrink NO (but not below minimum)
      noScale = Math.max(minNoScale, noScale - scaleStep);
      noBtn.style.transform = `scale(${noScale})`;

      // Grow YES
      yesScale += scaleStep;
      yesBtn.style.transform = `scale(${yesScale})`;
    });

// snoopy floating
const snoopies = ["snoopy1.jpg", "snoopy2.jpg", "snoopy3.jpg", "lux.jpg","seraphine.jpg", "roses.png"];

function createSnoopy() {
  const snoopy = document.createElement("img");

  // Random Snoopy each time
  const randomSnoopy =
    snoopies[Math.floor(Math.random() * snoopies.length)];

    snoopy.src = randomSnoopy;
    snoopy.className = "snoopy";

    // Random horizontal position
    snoopy.style.left = Math.random() * 90 + "vw";

    // Random size (small → medium)
    const size = Math.random() * 60 + 80;
    snoopy.style.width = size + "px";

    // Random speed
    snoopy.style.animationDuration =
      Math.random() * 8 + 18 + "s";

    document.body.appendChild(snoopy);

    // Cleanup
    setTimeout(() => {
      snoopy.remove();
    }, 30000);
  }

  // Spawn interval
  setInterval(createSnoopy, 1000);

    envelopeImg.addEventListener("click", () => {
      envelopeImg.style.pointerEvents = "none"; // prevent double click
      envelopeImg.style.transform = "scale(1.1)";
      envelopeImg.style.opacity = "0";

      setTimeout(() => {
        showPanel(envelopePanel, intro);
      }, 500);
    });

  });