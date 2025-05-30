import { createRouter, createWebHistory } from "vue-router";

declare type ScrollPosition = ScrollPositionCoordinates | ScrollPositionElement;

/**
 * Scroll position similar to
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions | `ScrollToOptions`}.
 * Note that not all browsers support `behavior`.
 */
declare type ScrollPositionCoordinates = {
  behavior?: ScrollOptions["behavior"];
  left?: number;
  top?: number;
};

declare interface ScrollPositionElement extends ScrollToOptions {
  /**
   * A valid CSS selector. Note some characters must be escaped in id selectors (https://mathiasbynens.be/notes/css-escapes).
   * @example
   * Here are a few examples:
   *
   * - `.title`
   * - `.content:first-child`
   * - `#marker`
   * - `#marker\~with\~symbols`
   * - `#marker.with.dot`: selects `class="with dot" id="marker"`, not `id="marker.with.dot"`
   *
   */
  el: string | Element;
}

import WorkView from "../components/pages/WorkView.vue";
import AboutView from "../components/pages/AboutView.vue";
import ProjectPage from "../components/pages/ProjectPage.vue";

const routes = [
  { path: "/", component: WorkView },
  { path: "/work", redirect: "/" },
  { name: "project-page", path: "/work/:projectId", component: ProjectPage },
  { path: "/about", component: AboutView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition): Promise<ScrollPosition> {
    return new Promise((resolve) => {
      let scrollInfo: Partial<{
        top: number;
        left: number;
        to: string;
        el: string;
        behavior: string;
      }> = {
        behavior: "smooth",
      };
      if (to.hash) {
        scrollInfo.el = to.hash;
      } else if (savedPosition) {
        scrollInfo = { ...scrollInfo, ...savedPosition };
      } else {
        scrollInfo.top = 0;
      }
      setTimeout(() => {
        resolve(scrollInfo as ScrollPosition);
      }, 500);
    });
  },
});
