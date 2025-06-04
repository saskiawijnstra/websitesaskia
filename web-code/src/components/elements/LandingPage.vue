<template>
  <div class="landing-page">
    <div class="lettering">
      <h1 class="main-text">
        <span>Digital</span>
        <span>Designer</span>
      </h1>

      <div
        class="scribble"
        v-for="(scribble, index) in SCRIBBLES"
        :key="index"
        :style="`
            left:${scribble.position.x}%;
            top:${scribble.position.y}%;
            animation-delay: ${1.2 + 0.1 * index}s`"
      >
        <img
          :style="scribble.imageCss || ''"
          :src="scribble.image"
          :id="`landing-page-scribble-${index}}`"
        />
        <label :for="`landing-page-scribble-${index}}`">
          {{ t(`landingpage-scribbles.${scribble.labelKey}`) }}
        </label>
        <img v-if="scribble.secondImage" :src="scribble.secondImage" />
      </div>
    </div>

    <div class="image">
      <img src="@/assets/images/windinmijnharen.jpg" alt="Saskia Wijnstra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

import Creative from "@/assets/images/header-drawings/Creative.png";
import EmpathyPassion from "@/assets/images/header-drawings/EmpathyPassion.png";
import Interactive from "@/assets/images/header-drawings/Interactive.png";
import Interfaces from "@/assets/images/header-drawings/Interfaces.png";
import ListMaker from "@/assets/images/header-drawings/List-maker.png";
import Problemsolver from "@/assets/images/header-drawings/Problemsolver.png";
import Prototypebuilder from "@/assets/images/header-drawings/Prototypebuilder.png";
import User from "@/assets/images/header-drawings/User.png";
import Vision from "@/assets/images/header-drawings/Vision.png";
import Visualthinker from "@/assets/images/header-drawings/Visualthinker.png";

const { t } = useI18n();
const SCRIBBLES = [
  {
    labelKey: "visual-thinker",
    image: Visualthinker,
    position: {
      x: 19,
      y: 14,
    },
  },
  {
    labelKey: "user-interfaces",
    image: Interfaces,
    secondImage: User,
    position: {
      x: 50,
      y: 16,
    },
  },
  {
    labelKey: "creative",
    image: Creative,
    position: {
      x: 79,
      y: 22,
    },
  },
  {
    labelKey: "list-maker",
    image: ListMaker,
    position: {
      x: 80,
      y: 46,
    },
  },
  {
    labelKey: "prototype-builder",
    image: Prototypebuilder,
    position: {
      x: 68,
      y: 76,
    },
  },
  {
    labelKey: "empathy-passion",
    image: EmpathyPassion,
    position: {
      x: 40,
      y: 86,
    },
  },

  {
    labelKey: "vision",
    image: Vision,
    position: {
      x: 22,
      y: 86,
    },
  },

  {
    labelKey: "interactive",
    image: Interactive,
    imageCss: "transform: translate(112px, -33px)",
    position: {
      x: 1,
      y: 83,
    },
  },

  {
    labelKey: "problem-solver",
    image: Problemsolver,
    imageCss: "transform: translate(90px, -35px)",
    position: {
      x: 13,
      y: 40,
    },
  },
];
</script>

<style lang="scss" scoped>
.landing-page {
  display: grid;
  width: 100vw;
  height: calc(100vh - 103px);
  overflow: hidden;

  grid-template-columns: 2fr 1fr;

  .lettering {
    position: relative;

    .main-text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      flex-direction: column;
      z-index: 1;
      margin: 0;
      line-height: calc-rem(120);

      span {
        display: block;
        font-size: calc-rem(128);
        animation: fly-from-left 0.6s ease-in-out 0.8s forwards;
        transform: translateX(-100vw);

        &:last-child {
          animation-name: fly-from-right;
          transform: translateX(100vw);
        }

        @keyframes fly-from-left {
          from {
            transform: translateX(-100vw);
          }
          to {
            transform: translateX(-1.1rem);
          }
        }

        @keyframes fly-from-right {
          from {
            transform: translateX(100vw);
          }
          to {
            transform: translateX(0);
          }
        }
      }
    }

    .scribble {
      position: absolute;
      display: flex;
      align-items: center;
      opacity: 0;
      animation: fade-in 0.3s linear 0s forwards;

      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      img {
        width: 50px;
        object-fit: contain;
      }

      label {
        font-family: "Reenie Beanie Regular", "Brush Script MT", cursive;
        font-size: calc-rem(28);
        color: var(--color-middle-grijs);
        width: max-content;
      }
    }
  }

  .image {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left bottom;
      transform: translateX(100%);
      animation: fly-from-right 0.6s ease-in-out 1.2s forwards;

      @keyframes fly-from-right {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
    }
  }
}
</style>
