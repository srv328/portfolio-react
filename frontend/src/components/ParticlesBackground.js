import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = ({ isDarkMode }) => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: isDarkMode ? "#00b4d8" : "#0077b6",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
        random: false,
        animation: {
          enable: false,
        },
      },
      size: {
        value: 4,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: isDarkMode ? "#00b4d8" : "#0077b6",
        opacity: 0.5,
        width: 2,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
      },
      twinkle: {
        particles: {
          enable: true,
          color: "#00b4d8",
          frequency: 0.2,
          opacity: 1,
        },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    background: {
      color: "transparent",
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
    fpsLimit: 60,
    motion: {
      disable: false,
      reduce: {
        factor: 4,
        value: true,
      },
    },
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
    />
  );
};

export default ParticlesBackground;
