import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

function MonsterListElement({ iconName, monsterName, id }) {
  const imgPath = "/images/monsters/" + iconName + ".png";
  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        m: 1,
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Image width={100} height={100} src={imgPath} alt="muna logo" />
      <Container
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "center",
        }}
      >
        <Typography variant="h3" color="initial">
          <Link href={"/monster/" + id}>{monsterName}</Link>
        </Typography>
      </Container>
    </Container>
  );
}

export default MonsterListElement;
