import "@theme/assets/styles/index.less";
import { addLink } from "./utils/index.js";

export default ({ Vue, router, isServer }) => {
  if (!isServer) {
    addLink("https://at.alicdn.com/t/font_1162815_q0qldloxyos.css");
  }
};
