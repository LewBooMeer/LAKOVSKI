// typewriter.js

function typeCode(code) {
  const codeElement = document.getElementById("code");
  codeElement.textContent = ""; // Clear the content
  let i = 0;
  const speed = 5; // Adjust typing speed (milliseconds per character)

  function typeCharacter() {
    if (i < code.length) {
      const char = code.charAt(i);
      const span = document.createElement("span");
      span.textContent = char;
      span.className = getCharClass(char);
      codeElement.appendChild(span);
      i++;
      setTimeout(typeCharacter, speed);
    } else {
      // Typing is complete, add the blinking insertion point at the end
      const cursorSpan = document.createElement("span");
      cursorSpan.textContent = "|";
      cursorSpan.className = "blinking-cursor";
      cursorSpan.style.display = "inline"; // Set display to inline
      cursorSpan.style.verticalAlign = "top"; // Adjust the vertical alignment
      codeElement.appendChild(cursorSpan);

      setInterval(() => {
        cursorSpan.style.visibility =
          cursorSpan.style.visibility === "visible" ? "hidden" : "visible";
      }, 500);
    }
  }

  function getCharClass(char) {
    if (/\W/.test(char)) {
      return "";
    } else if (/[a-zA-Z]/.test(char)) {
      return "keyword";
    } else if (char === "/" && code[i + 1] === "/") {
      return "comment";
    } else if (char === "'" || char === '"') {
      return "string";
    } else if (/[0-9]/.test(char)) {
      return "number";
    } else if (
      char === "|" ||
      char === "\\" ||
      char === "(" ||
      char === ")" ||
      char === "*" ||
      char === "V"
    ) {
      return "face";
    } else {
      return "";
    }
  }

  typeCharacter();
}

// here starts the cube animation

const divs = document.querySelectorAll(".typing");

divs.forEach((div, index) => {
  setTimeout(() => {
    div.style.opacity = "1"; // Set opacity to show the boxes
  }, index * 100); // Delay the transition for each box
});

//end cube animation

//lightbox
var currentSlideIndex = 0;

function openLightbox(imgSrc, caption, index) {
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");

  // Set currentSlideIndex based on index parameter
  currentSlideIndex = index;

  lightbox.style.display = "flex";
  lightbox.style.opacity = 1;
  lightboxImg.src = imgSrc;
  lightboxCaption.innerHTML = caption;

  // Close the lightbox when clicking outside of it
  lightbox.onclick = function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  };
}

function closeLightbox() {
  var lightbox = document.getElementById("lightbox");

  lightbox.style.opacity = 0; // Set opacity to 0 for fade-out effect

  // Set a timeout to hide the lightbox after the animation completes
  setTimeout(function () {
    lightbox.style.display = "none";
  }, 500); // Adjust the duration to match the CSS transition duration
}

function navigateLightbox(direction) {
  // Get all image wrappers
  var imageWrappers = document.querySelectorAll(".image-wrapper");

  // Update currentSlideIndex based on direction
  currentSlideIndex += direction;

  // Wrap around if reaching the end or beginning
  if (currentSlideIndex < 0) {
    currentSlideIndex = imageWrappers.length - 1;
  } else if (currentSlideIndex >= imageWrappers.length) {
    currentSlideIndex = 0;
  }

  // Open the lightbox for the new image
  openLightbox(
    imageWrappers[currentSlideIndex].querySelector("img").src,
    `Image ${currentSlideIndex + 1}`,
    currentSlideIndex
  );
}

// keyboard navigation for lightbox
document.addEventListener("keydown", function (event) {
  // Check if the lightbox is open
  var lightbox = document.getElementById("lightbox");
  if (lightbox.style.display === "flex") {
    // Check the pressed key and navigate accordingly
    switch (event.keyCode) {
      case 37: // Left arrow key
        navigateLightbox(-1);
        break;
      case 39: // Right arrow key
        navigateLightbox(1);
        break;
      case 27: // Escape key
        closeLightbox();
        break;
      // Add more cases for other keys if needed
    }
  }
});

// Initialize lightbox for the first image
document.querySelectorAll(".image-wrapper").forEach(function (wrapper, index) {
  wrapper.addEventListener("click", function () {
    openLightbox(wrapper.querySelector("img").src, `Image ${index + 1}`, index);
  });
});

// end of lightbox
