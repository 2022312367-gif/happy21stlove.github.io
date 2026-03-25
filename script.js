function scrollToLetters() {
  const lettersSection = document.getElementById("letters");
  if (lettersSection) {
    lettersSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function toggleMemory(button) {
  const memoryCard = button.closest('.memory-card');
  const memoryContent = memoryCard.querySelector('.memory-content');
  
  button.classList.toggle('active');
  memoryContent.classList.toggle('show');
}

function showSurprise() {
  const secretElement = document.getElementById("secret");
  if (secretElement) {
    if (secretElement.style.display === "block") {
      secretElement.style.display = "none";
    } else {
      secretElement.style.display = "block";
      createConfetti();
    }
  }
}

function createConfetti() {
  const confettiPieces = 50;
  for (let i = 0; i < confettiPieces; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = Math.random() > 0.5 ? "#ff1493" : "#c77dff";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    document.body.appendChild(confetti);

    const duration = Math.random() * 2 + 2;
    const distance = Math.random() * 100 + 100;
    const angle = Math.random() * Math.PI;

    confetti.animate(
      [
        { transform: "translateY(0) translateX(0)", opacity: 1 },
        { transform: `translateY(${distance}px) translateX(${Math.cos(angle) * 50}px)`, opacity: 0 }
      ],
      {
        duration: duration * 1000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      }
    );

    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }
}

// Interactive sticker cards
document.addEventListener("DOMContentLoaded", function() {
  const stickerCards = document.querySelectorAll(".sticker-card");
  
  stickerCards.forEach((card, index) => {
    card.addEventListener("click", function() {
      createStickerPulse(this);
    });

    card.addEventListener("mouseenter", function() {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "";
      }, 10);
    });
  });

  // Add scroll animation to sections
  const sections = document.querySelectorAll(".section");
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});

function createStickerPulse(element) {
  const pulse = document.createElement("div");
  pulse.style.position = "absolute";
  pulse.style.width = "20px";
  pulse.style.height = "20px";
  pulse.style.backgroundColor = "#ff1493";
  pulse.style.borderRadius = "50%";
  pulse.style.pointerEvents = "none";
  pulse.style.left = "50%";
  pulse.style.top = "50%";
  pulse.style.transform = "translate(-50%, -50%)";
  pulse.style.animation = "pulseFade 0.8s ease-out forwards";
  
  element.style.position = "relative";
  element.appendChild(pulse);

  setTimeout(() => {
    pulse.remove();
  }, 800);
}

// Add CSS animation for pulse
const style = document.createElement("style");
style.textContent = `
  @keyframes pulseFade {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Add reason card interaction
const reasonCards = document.querySelectorAll(".reason");
reasonCards.forEach(card => {
  card.addEventListener("mouseenter", function() {
    this.style.animation = "none";
  });

  card.addEventListener("mouseleave", function() {
    const icon = this.querySelector(".reason-icon");
    if (icon) {
      icon.style.animation = "";
    }
  });
});

// Keyboard navigation
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown") {
    window.scrollBy({ top: 300, behavior: "smooth" });
  }
});
