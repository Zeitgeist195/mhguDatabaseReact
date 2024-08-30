import { Container, Typography } from "@mui/material";
import MonsterWeaknesses from "./MonsterWeaknesses";
import MonsterUsableItems from "./MonsterUsableItems";
import React from "react";

// import { Container } from './styles';

function MonsterStates({ states }) {
  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      {Object.entries(states).map(([key, value]) => (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
            m: 2,
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              bgcolor: "background.paper",
              boxShadow: 2,
              borderRadius: 2,
              p: 2,
              m: 2,
            }}
          >
            <Typography
              sx={{
                pb: 2,
              }}
              variant="h4"
              color="initial"
            >
              {key}
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              <MonsterWeaknesses wkns={value.weaknesses} />
            </Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                boxShadow: 2,
                borderRadius: 2,
                m: 1,
              }}
            >
              <MonsterUsableItems itms={value.items} />
            </Container>
          </Container>
        </Container>
      ))}
    </Container>
  );
}

export default MonsterStates;
