export interface Route {
  path: string;
  title: string;
}

export const routes: Route[] = [
  {
    path: "/animate/carousel",
    title: "animate-carousel",
  },
  {
    path: "/animate/panRespnder-drag",
    title: "animate-panRespnder-drag",
  },
  {
    path: "/animate/enter-animated",
    title: "animate-enter-animated",
  },
  {
    path: "/gesture/swiper",
    title: "gesture/swiper",
  },
  {
    path: "/gesture/progress",
    title: "gesture/progress",
  },
  {
    path: "/gesture/draggable",
    title: "gesture/draggable",
  },
  {
    path: "/link",
    title: "link",
  },
  { path: "+not-found", title: "+not-found" },
];
