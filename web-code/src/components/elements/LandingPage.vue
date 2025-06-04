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

    <div class="links">
      <a href="#work" class="work">
        <LinkArrow class="arrow" />
        {{ t("landingpage.link-work") }}
      </a>

      <router-link to="/about">
        <LinkArrow />
        {{ t("landingpage.link-about") }}
      </router-link>
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
import LinkArrow from "./LinkArrow.vue";

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
@use "sass:math";

.landing-page {
  display: grid;
  width: 100vw;
  height: calc(100vh - 141px); // subtract header height
  overflow: hidden;
  grid-template-columns: minmax(750px, 2fr) 1fr;
  grid-template-rows: 1fr 4rem;
  margin-bottom: 170px;

  @media (max-width: 1080px), (max-height: 580px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .lettering {
    position: relative;
    transform-origin: top center;

    @media (max-height: 690px), (max-width: 1200px) {
      transform: scale(0.8);
    }

    @media (max-width: 1080px), (max-height: 580px) {
      width: 100%;
      aspect-ratio: 16 / 8;
      transform: translateY(-50px);
    }

    @media (max-width: 880px) {
      width: 835px;
      transform: scale(1) translateY(-0px) translateX(-50%);
      left: 50%;
    }

    @media (max-width: 880px) {
      transform: translateX(-50%) scale(0.8) translateY(-0px);
    }

    @media (max-width: 650px) {
      transform: translateX(-50%) scale(0.5) translateY(-0px);
      margin-bottom: calc((-1 - 0.5) * 100px);
    }

    @media (max-width: 410px) {
      transform: translateX(-50%) scale(0.4) translateY(-0px);
      margin-bottom: calc((-1 - 0.4) * 100px);
    }

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
      font-size: calc-rem(128);
      line-height: calc-rem(120);

      @media (max-height: 690px), (max-width: 1200px) {
        font-size: calc-rem(100);
        line-height: calc-rem(90);
      }

      span {
        display: block;
        opacity: 0;
        animation: fly-from-left 0.6s ease-in-out 0.8s forwards;
        transform: translateX(-100vw);

        &:last-child {
          animation: fly-from-right 0.6s ease-in-out 0.8s forwards;
          transform: translateX(120vw);
        }
      }
    }

    .scribble {
      position: absolute;
      display: flex;
      align-items: center;
      opacity: 0;
      animation: fade-in 0.3s linear 0s forwards;

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
    @media (max-width: 1080px), (max-height: 580px) {
      align-self: flex-end;

      max-width: min(80%, 500px);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 13% bottom;
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

  .links {
    grid-row: 2;
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: subgrid;
    opacity: 0;
    animation: fade-in 0.3s linear 2.5s forwards;
    padding-left: 105px; // grid padding

    @media (max-width: 1080px), (max-height: 580px) {
      grid-template-columns: 1fr min(80%, 500px);
      margin-top: 25px;
    }

    @media (max-width: 820px) {
      grid-template-rows: 60px 60px;
    }

    @media (max-width: 1200px) {
      padding-left: math.div(105px, 1.5);
    }

    @media (max-width: 600px) {
      padding-left: 24px;
    }
    a {
      display: flex;
      align-items: center;
      gap: calc-rem(17px);
      color: var(--color-default-text);
      grid-column: 2;

      &.work {
        grid-column: 1;
        width: max-content;

        @media (max-width: 820px) {
          grid-row: 2;
          grid-column: 1 / span 2;
        }
        .arrow {
          transform: rotate(90deg);
        }
      }
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fly-from-left {
  0% {
    transform: translateX(-100vw);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateX(-1.1rem);
  }
}

@keyframes fly-from-right {
  0% {
    transform: translateX(120vw);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
