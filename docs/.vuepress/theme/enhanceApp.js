import "@theme/assets/styles/index.less";
import { addLink } from "./utils/index.js";
import VueParticlesBg from 'particles-bg-vue'

export default ({ Vue, router, isServer }) => {
  Vue.use(VueParticlesBg)

  if (!isServer) {
    addLink("https://at.alicdn.com/t/font_1162815_q0qldloxyos.css");
  }
};
