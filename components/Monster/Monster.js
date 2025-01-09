import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import MonsterWeaknesses from "./MonsterWeaknesses";

function Monster({ monster }) {
  const { summary, damage, huntingRewards, quests } = monster;
  const imgPath = "/images/monsters/" + summary.base.iconName + ".png";
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 2, sm: 5 }}
        p={{ xs: 2, sm: 5 }}
      >
        <Image id="monster-image" width={100} height={100} src={imgPath} alt={summary.base.name} />
        <Typography variant="h3" color="initial">
          <p>{summary.base.name}</p>
        </Typography>
        <Typography variant="h3" color="initial">
          <p>HP: {summary.base.baseHp}</p>
        </Typography>
      </Box>
      <Box>
        <MonsterWeaknesses states={summary.states} />
      </Box>
    </>
  );
}

export default Monster;
