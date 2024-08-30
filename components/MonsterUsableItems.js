import React from "react";
import { Container, Typography } from "@mui/material";

// import { Container } from './styles';

function MonsterUsableItems({ itms }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      {itms.map((item) => (
        <Container>
          <Typography variant="body1" color="initial">
            {item}
          </Typography>
        </Container>
      ))}
    </Container>
  );
}

export default MonsterUsableItems;
