import React from "react";
import { Icon } from "@mui/material";
import Image from "next/image";

function CustomIcon({ iconName }) {
  const imgPath = "/images/items_svg/icon_" + iconName + ".svg";

  return (
    <Icon>
      <Image src={imgPath} width={25} height={25} alt={iconName} />
    </Icon>
  );
}

export default CustomIcon;
