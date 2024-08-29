import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import MonsterListElement from "./MonsterListElement";

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
    <MonsterListElement iconName={monster.icon_name} monsterName={monster.name} id={monster._id} />
  ));

  return <Container>{monsters}</Container>;
}

export default MonsterList;
