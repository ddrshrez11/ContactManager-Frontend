import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

function CloudinaryImg(props) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ddrbmb0u",
    },
  });
  const myImage = cld.image(props.imgId);
  myImage
    .resize(
      thumbnail()
        .width(props.width)
        .height(props.height)
        .zoom(0.75)
        .gravity(focusOn(FocusOn.face()))
    ) // Crop the image, focusing on the face.
    .roundCorners(byRadius(20)); // Round the corners.

  myImage.format("png");

  return <AdvancedImage cldImg={myImage} />;
}

export default CloudinaryImg;
