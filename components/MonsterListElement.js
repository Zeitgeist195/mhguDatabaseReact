import React from "react";
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

function MonsterListElement({ iconName, monsterName }) {
  const imgPath = "images/monsters/" + iconName + ".png";
  return (
    <Container>
      <img src={imgPath}></img>
      <Typography variant="h2" color="initial">
        <Link href="/monster">{monsterName}</Link>
      </Typography>
    </Container>
  );
}

export default MonsterListElement;
