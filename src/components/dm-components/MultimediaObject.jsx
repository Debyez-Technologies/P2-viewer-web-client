import { useState } from "react";
import VideoPlayer from "../app-components/video-player/VideoPlayer";
import ThreeDViewer from "../app-components/three-d/ThreeDViewer";

function MultimediaObject({ children, ...props }) {
  // Renders a multimedia object like a video or audio file.
  // The specific tag (e.g., <video>) would depend on the props.
  const { multimediaType } = props;
  const MultimediaTypeSwitch = {
    'video': <VideoPlayer props={props} />,
    '3D': <ThreeDViewer props={props} />
  }

  return MultimediaTypeSwitch[multimediaType]
}

export default MultimediaObject;