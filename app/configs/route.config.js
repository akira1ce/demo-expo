/* 
<Stack.Screen name="animate/carousel" />
<Stack.Screen name="animate/panRespnder-drag" />
<Stack.Screen name="gesture/draggable" />
<Stack.Screen name="gesture/progress" />
<Stack.Screen name="gesture/swiper" />
<Stack.Screen name="+not-found" />

*/

const routes = [
  {
    path: "/animate/carousel",
    title: "animate-carousel",
  },
  {
    path: "/animate/panRespnder-drag",
    title: "animate-panRespnder-drag",
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
  { path: "+not-found", title: "+not-found", component: "+not-found" },
];

export default routes;
