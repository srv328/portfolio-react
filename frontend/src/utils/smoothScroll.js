const getScrollOffset = () => {
  const isMobile = window.innerWidth <= 768;
  return isMobile ? 100 : 120;
};

export const smoothScrollTo = (elementId, customOffset = null) => {
  const element = document.getElementById(elementId);
  if (element) {
    const offset = customOffset !== null ? customOffset : getScrollOffset();
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

let currentAnimationId = null;

export const smoothScrollToBottom = () => {
  if (currentAnimationId) {
    cancelAnimationFrame(currentAnimationId);
  }

  let lastHeight = document.documentElement.scrollHeight;
  let attempts = 0;
  const maxAttempts = 10;

  const checkProjectsLoaded = () => {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return true;

    const motionElements = projectsSection.querySelectorAll(
      "[data-framer-motion]"
    );
    const visibleElements = Array.from(motionElements).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

    return visibleElements.length === 0;
  };

  const triggerProjectsAnimations = () => {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return;

    const motionElements = projectsSection.querySelectorAll(
      "[data-framer-motion]"
    );
    motionElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  };

  const scrollToCurrentBottom = () => {
    const currentHeight = document.documentElement.scrollHeight;
    const targetPosition = currentHeight;
    const currentPosition = window.pageYOffset;
    const distance = targetPosition - currentPosition;

    if (distance <= 5) {
      if (currentHeight > lastHeight) {
        lastHeight = currentHeight;
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(scrollToCurrentBottom, 600);
        } else {
          currentAnimationId = null;
        }
      } else {
        if (!checkProjectsLoaded()) {
          triggerProjectsAnimations();
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(scrollToCurrentBottom, 1000);
          } else {
            currentAnimationId = null;
          }
        } else {
          currentAnimationId = null;
        }
      }
      return;
    }

    const duration = Math.min(1200, Math.max(500, distance * 0.5));
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const newPosition = currentPosition + distance * easeInOutCubic;
      window.scrollTo(0, newPosition);

      if (progress < 1) {
        currentAnimationId = requestAnimationFrame(animation);
      } else {
        setTimeout(() => {
          const newHeight = document.documentElement.scrollHeight;
          if (newHeight > lastHeight) {
            lastHeight = newHeight;
            attempts++;
            if (attempts < maxAttempts) {
              scrollToCurrentBottom();
            } else {
              currentAnimationId = null;
            }
          } else {
            if (!checkProjectsLoaded()) {
              triggerProjectsAnimations();
              attempts++;
              if (attempts < maxAttempts) {
                setTimeout(scrollToCurrentBottom, 1000);
              } else {
                currentAnimationId = null;
              }
            } else {
              currentAnimationId = null;
            }
          }
        }, 400);
      }
    };

    currentAnimationId = requestAnimationFrame(animation);
  };

  scrollToCurrentBottom();
};

export const scrollToNextSection = (currentSectionId) => {
  const sections = ["about", "skills", "experience", "projects"];
  const currentIndex = sections.indexOf(currentSectionId);

  if (currentIndex !== -1 && currentIndex < sections.length - 1) {
    const nextSectionId = sections[currentIndex + 1];
    smoothScrollTo(nextSectionId);
  }
};

export const scrollToPreviousSection = (currentSectionId) => {
  const sections = ["about", "skills", "experience", "projects"];
  const currentIndex = sections.indexOf(currentSectionId);

  if (currentIndex !== -1 && currentIndex > 0) {
    const previousSectionId = sections[currentIndex - 1];
    smoothScrollTo(previousSectionId);
  }
};
