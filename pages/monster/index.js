import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import MonsterListElement from "components/MonsterListElement";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/monsters")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const monsters = data.monsters.Large.map((monster) => (
    <MonsterListElement iconName={monster.icon_name} monsterName={monster.name} id={monster._id} />
  ));

  return (
    <Container>
      <Typography variant="h1">Monster List</Typography>
      {monsters}
    </Container>
  );
}

export default HomePage;
