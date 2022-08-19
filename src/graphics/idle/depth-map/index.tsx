import ImageDepthMap from "react-depth-map";
import image from "./pine.png";

export default () => (
    <ImageDepthMap
      originalImg={image}
      depthImg={"./pine-map.png"}
      verticalThreshold={25}
      horizontalThreshold={15}
    />
  );
