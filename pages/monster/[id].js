  // pages/users/[username].js
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Monster from "components/Monster/Monster";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";

const ShowMonster = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dominantColor, setDominantColor] = useState([9, 9, 9]); // Default color as black
  const imgRef = useRef(null); // Use ref to access the img element

  useEffect(() => {
    const fac = new FastAverageColor();

    if (imgRef.current && imgRef.current.complete) {
      // If the image is already loaded
      const color = fac.getColor(imgRef.current).rgb;
      setDominantColor(color);
    }
  }, []);

  const handleImageLoad = () => {
    const fac = new FastAverageColor();
    if (imgRef.current) {
      const color = fac.getColor(imgRef.current).rgb;
      setDominantColor(color);
    }
  };

  // Create Material UI theme with the extracted dominant color
  const theme = createTheme({
    palette: {
      primary: {
        main: `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`, // Use extracted color
      },
      background: {
        default: `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.1)`,
      },
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/monster/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const imgPath = "/images/monsters/" + data.summary.base.iconName + ".png";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Monster monster={data} />
    </ThemeProvider>
  );
};

export default ShowMonster;
