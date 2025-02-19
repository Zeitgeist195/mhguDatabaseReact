import React from "react";
import { Icon } from "@mui/material";
import { useRouter } from "next/router";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CustomIcon from "components/CustomIcon";

function DrawerLineItem({ iconName, action, text }) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/${action}/`);
  };

  return (
    <ListItemButton onClick={handleNavigation}>
      <ListItemIcon>
        <CustomIcon iconName={iconName} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

export default DrawerLineItem;
