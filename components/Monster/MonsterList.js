import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import MonsterGridElement from "./MonsterGridElement";
import Grid from "@mui/material/Grid2";

// import { Container } from './styles';

function MonsterList({ list }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/monsters/${list}`)
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

  const monsters = data.monsters.map((monster) => (
    <Grid item xs={12} sm={6} md={3}>
      <MonsterGridElement
        iconName={monster.icon_name}
        monsterName={monster.name}
        id={monster._id}
      />
    </Grid>
  ));

  return <Grid container>{monsters}</Grid>;
}

export default MonsterList;
