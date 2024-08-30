import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// import { Container } from './styles';

function MonsterWeaknesses({ wkns }) {
  return (
    <Container>
      {Object.entries(wkns).map(([key, value]) => (
        <>
          <Typography variant="body1" color="initial">
            {key}
          </Typography>
          <Typography variant="body1" color="initial">
            {value}
          </Typography>
        </>
      ))}
    </Container>
  );
}

export default MonsterWeaknesses;
