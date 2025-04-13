import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  List,
  Badge,
  Stack,
} from "@mui/material";
import { ExpandLess, ExpandMore, MilitaryTech } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

function getSmallIcon(iName, effectiveness = null) {
  const status = ["poison", "paralysis", "sleep"];
  let response;

  let imgPath = "/images/status/";

  if (effectiveness !== null) {
    let effImg = imgPath + "effectiveness_";
    switch (effectiveness) {
      case 5:
        effImg += "2.png";
        break;
      case 6:
        effImg += "3.png";
        break;
      default:
        effImg = null;
        break;
    }

    imgPath += (status.includes(iName) ? "status_" : "element_") + iName + ".png";

    const badge =
      effImg !== null ? (
        <Image
          style={{ zIndex: 2, position: "absolute", marginLeft: -2 }}
          src={effImg}
          width={9}
          height={10}
        />
      ) : null;

    response = (
      <Badge badgeContent={badge}>
        <Image style={{ zIndex: 1 }} src={imgPath} width={20} height={20} alt={iName} />
      </Badge>
    );
  } else {
    imgPath += "item_" + iName + ".png";
    response = <Image style={{ margin: 3 }} src={imgPath} width={20} height={20} alt={iName} />;
  }

  return response;
}

export default function MonsterWeaknesses({ states }) {
  const [open, setOpen] = useState({});

  const handleClick = (key) => {
    // Toggle the open state for the specific key
    setOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <>
      {Object.entries(states).map(([key, value]) => (
        <List key={key} sx={{ width: "100%", maxWidth: 400}}>
          <ListItemButton onClick={() => handleClick(key)}>
            <ListItemText primary={key} />
            {!open[key] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={!open[key]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText primary="Weaknesses" />
                <Stack spacing={0.5} direction="row">
                  {Object.entries(value.weaknesses).map(([k, v]) => getSmallIcon(k, v))}
                </Stack>
              </ListItem>
              <ListItem>
                <ListItemText primary="Items" />
                <Grid>{value.items.map((e) => getSmallIcon(e))}</Grid>
              </ListItem>
            </List>
          </Collapse>
        </List>
      ))}
    </>
  );
}
