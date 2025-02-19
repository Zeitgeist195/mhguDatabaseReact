import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import DrawerLineItem from "./DrawerLineItem";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", mb: 2 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Monster Hunter Generations Ultimate Database WEB
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"monsters"} disablePadding>
            <DrawerLineItem iconName={"book"} text={"Monsters"} action={"monsters"} />
          </ListItem>
          <ListItem key={"weapons"} disablePadding>
            <DrawerLineItem iconName={"sword_and_shield"} text={"Weapons"} action={"weapons"} />
          </ListItem>
          <ListItem key={"armor_sets"} disablePadding>
            <DrawerLineItem iconName={"armor_body"} text={"Armor Sets"} action={"armor_sets"} />
          </ListItem>
          <ListItem key={"quests"} disablePadding>
            <DrawerLineItem iconName={"quest"} text={"Quests"} action={"quests"} />
          </ListItem>
          <ListItem key={"items"} disablePadding>
            <DrawerLineItem iconName={"ore"} text={"Items"} action={"items"} />
          </ListItem>
          <ListItem key={"palicos"} disablePadding>
            <DrawerLineItem iconName={"cutting"} text={"Palicos"} action={"palicos"} />
          </ListItem>
          <ListItem key={"combining"} disablePadding>
            <DrawerLineItem iconName={"liquid"} text={"combining"} action={"combining"} />
          </ListItem>
          <ListItem key={"locations"} disablePadding>
            <DrawerLineItem iconName={"map_icon"} text={"Locations"} action={"locations"} />
          </ListItem>
          <ListItem key={"decorations"} disablePadding>
            <DrawerLineItem iconName={"jewel"} text={"Decorations"} action={"decorations"} />
          </ListItem>
          <ListItem key={"skills"} disablePadding>
            <DrawerLineItem iconName={"monster_jewel"} text={"Skills"} action={"skills"} />
          </ListItem>
          <Divider />
        </List>
        <List>
          <ListItem key={"about"} disablePadding>
            <DrawerLineItem iconName={"quest_mark"} text={"About"} action={"about"} />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}></Main>
    </Box>
  );
}
