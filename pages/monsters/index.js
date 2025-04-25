import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs, useMediaQuery, Typography } from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import MonsterList from "components/Monster/MonsterList";

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
      {value === index && (
        <Box sx={{ 
          p: { xs: 1, sm: 2, md: 3 } // Padding responsivo
        }}>
          {children}
        </Box>
      )}
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Define labels com ícones opcionais para melhorar a aparência em dispositivos móveis
  const tabLabels = [
    { text: "Large" },
    { text: "Deviant" },
    { text: "Small" }
  ];

  return (
    <>
      <Box sx={{ 
        width: "100%", 
        position: "sticky", 
        top: 0, 
        zIndex: 1100, 
        backgroundColor: "background.paper" 
      }}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: "divider",
          overflowX: "auto" // Permite rolagem horizontal em telas muito pequenas
        }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            variant={isMobile ? "fullWidth" : "standard"} // Usa toda a largura em dispositivos móveis
            scrollButtons={isMobile ? "auto" : false} // Botões de rolagem em dispositivos móveis se necessário
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: isMobile ? 'center' : 'flex-start',
              },
              '& .MuiTab-root': {
                minWidth: { xs: '33%', sm: 100 }, // Largura mínima responsiva
                px: { xs: 1, sm: 2 }, // Padding horizontal responsivo
              }
            }}
          >
            {tabLabels.map((tab, index) => (
              <Tab 
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                    {isMobile && <Typography sx={{ fontSize: '1.2rem', mb: 0.5 }}>{tab.icon}</Typography>}
                    <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {tab.text}
                    </Typography>
                  </Box>
                }
                {...a11yProps(index)} 
              />
            ))}
          </Tabs>
        </Box>
        
        {/* Painéis de Conteúdo */}
        {[0, 1, 2].map((index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <MonsterList list={["large", "deviant", "small"][index]} />
          </CustomTabPanel>
        ))}
      </Box>
    </>
  );
}