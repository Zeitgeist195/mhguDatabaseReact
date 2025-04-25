import React, { useRef, useState, useEffect } from "react";
import { Typography, Card, CardContent, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Image from "next/image";

function MonsterGridElement({ iconName, monsterName, id }) {
  const router = useRouter();
  const theme = useTheme();
  const imgPath = "/images/monsters/" + iconName + ".png";
  const nameRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Responsive breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  // Determine card size based on screen size
  const getCardSize = () => {
    if (isXs) return { width: 150, height: 170, imageSize: 70 };
    if (isSm) return { width: 170, height: 190, imageSize: 85 };
    if (isMd) return { width: 180, height: 200, imageSize: 90 };
    return { width: 200, height: 220, imageSize: 100 };
  };
  
  const { width, height, imageSize } = getCardSize();

  const getFontSize = () => {
    const baseSize = isXs ? 16 : isSm ? 18 : isMd ? 20 : 22;
    if (monsterName.length > 12) return baseSize - 1;
    if (monsterName.length > 18) return baseSize - 2;
    return baseSize;
  };

  const getMaxLines = () => {
    if (monsterName.length > 25) return 3;
    if (monsterName.length > 15) return 2;
    return 2;
  };

  const formatCompoundName = (name) => {
    return name.replace(/(\w+) (\w+)/g, '$1\u200B \u200B$2');
  };

  const handleNavigation = () => {
    router.push(`/monster/${id}`);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card
      ref={containerRef}
      onClick={handleNavigation}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: width,
        height: height,
        m: { xs: 1, sm: 1.5, md: 2 },
        alignItems: "center",
        justifyContent: "space-between",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          cursor: "pointer",
          boxShadow: 6
        }
      }}
    >
      <Box 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          width: "100%",
          pt: { xs: 2, sm: 2, md: 3 },
        }}
      >
        <Image 
          src={imgPath} 
          width={imageSize} 
          height={imageSize} 
          alt={monsterName}
          style={{ 
            objectFit: "contain"
          }}
        />
      </Box>
      
      <CardContent 
        sx={{ 
          width: "100%", 
          p: { xs: 1, sm: 1.5 },
          pb: { xs: "8px !important", sm: "12px !important" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 0
        }}
      >
        <Typography
          ref={nameRef}
          sx={{
            fontSize: getFontSize(),
            textAlign: "center",
            whiteSpace: "normal",
            overflow: "hidden",
            wordBreak: "break-word",
            hyphens: "auto",
            display: "-webkit-box",
            WebkitLineClamp: getMaxLines(),
            WebkitBoxOrient: "vertical",
            px: 0.5,
            maxHeight: { xs: "3.6em", sm: "3.6em", md: "4.4em" },
          }}
        >
          {formatCompoundName(monsterName)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MonsterGridElement;