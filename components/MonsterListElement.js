import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { cyan } from "@mui/material/colors";

function MonsterListElement({ iconName, monsterName, id }) {
  const router = useRouter();
  const imgPath = "/images/monsters/" + iconName + ".png";

  const handleNavigation = () => {
    router.push(`/monster/${id}`);
  };
  const color = cyan[50];
  return (
    <Container
      onClick={handleNavigation}
      sx={{
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        m: 1,
        display: "flex",
        gap: 2,
        alignItems: "center",
        ":hover": { cursor: "pointer", bgcolor: color },
      }}
    >
      <Image width={100} height={100} src={imgPath} alt={monsterName} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "center",
        }}
      >
        <Typography variant="h3" color="initial">
          {monsterName}
        </Typography>
      </Container>
    </Container>
  );
}

export default MonsterListElement;
