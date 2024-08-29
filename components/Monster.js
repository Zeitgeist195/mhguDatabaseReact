import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

function Monster({ monster }) {
  const { summary, damage, huntingRewards, quests } = monster;
  const imgPath = "/images/monsters/" + summary.base.iconName + ".png";
  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        pt: 3,
        minWidth: 100,
        display: "flex",
        gap: 2,
        justifyContent: "space-between",
      }}
    >
      <Container
        sx={{
          p: 2,
          minWidth: 100,
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Image width={100} height={100} src={imgPath} alt="muna logo" />
        <Typography variant="h1" color="initial">
          {summary.base.name}
        </Typography>
      </Container>
      <Container
        sx={{
          p: 2,
          minWidth: 100,
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h3" color="initial">
          <p>HP: {summary.base.baseHp}</p>
        </Typography>
      </Container>
    </Container>
  );
}

export default Monster;
