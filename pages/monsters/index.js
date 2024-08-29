import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material/";
import MonsterList from "components/MonsterList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", position: "fixed" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Large" {...a11yProps(0)} />
            <Tab label="Deviant" {...a11yProps(1)} />
            <Tab label="Small" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <MonsterList list="large" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MonsterList list="deviant" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MonsterList list="small" />
        </CustomTabPanel>
      </Box>
    </>
  );
}
