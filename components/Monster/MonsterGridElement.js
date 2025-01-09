import React, { useRef, useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

function MonsterGridElement({ iconName, monsterName, id }) {
  const router = useRouter();
  const imgPath = "/images/monsters/" + iconName + ".png";
  const nameRef = useRef(null);
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(25); // Set an initial font size
  const [isMounted, setIsMounted] = useState(false); // Ensure it's client-side
  const [paddingTop, setPaddingTop] = useState(0);

  const handleNavigation = () => {
    router.push(`/monster/${id}`);
  };

  // Ensure that the effect only runs after the component is mounted
  useEffect(() => {
    setIsMounted(true);

    const adjustFontSize = () => {
      if (!nameRef.current) return;

      const containerWidth = containerRef.current?.offsetWidth;
      const nameWidth = nameRef.current?.scrollWidth;

      console.log(containerWidth + "|" + nameWidth);

      // If the text overflows, reduce the font size
      if (nameWidth > containerWidth) {
        let newFontSize = fontSize;
        let newPaddingTop = paddingTop;

        // Reduce the font size until it fits or reaches the minimum size
        while (newFontSize > 18 && nameWidth > containerWidth) {
          newFontSize -= 1;
          newPaddingTop += 0.15;
          setPaddingTop(newPaddingTop);
          setFontSize(newFontSize);
        }
      }
    };

    if (isMounted) {
      adjustFontSize(); // Adjust the font size after mount
    }
  }, [monsterName, fontSize, paddingTop, isMounted]);

  return (
    <Card
      ref={containerRef}
      onClick={handleNavigation}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 200,
        height: 200,
        m: 2,
        pt: 3,
        alignItems: "center",
      }}
    >
      <Image src={imgPath} width={100} height={100} alt={monsterName} />
      <CardContent>
        <Typography
          ref={nameRef}
          sx={{
            fontSize: `${fontSize}px`,
            pt: paddingTop,
            textAlign: "center",
            textJustify: "inter-word",
            whiteSpace: "pre",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {monsterName}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MonsterGridElement;
