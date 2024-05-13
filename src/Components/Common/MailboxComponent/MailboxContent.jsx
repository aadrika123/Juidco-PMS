//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - MailboxContent (closed)
//    DESCRIPTION - MailboxContent Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DetailsTabs from './DetailsTabs'
import ListItems from './ListItems';

function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MailboxContent() {
  const [value, setValue] = useState(0);
  const [listId, setlistId] = useState('')    //state to store application primary key
  const handleChange = (event, newValue) => {   //handChange to switch between tabs
    setValue(newValue);

  };

  const viewDetails = (id) => {   //viewDetails to go to Details tab and show data of selected holding application
    setlistId(id)   //updating state with application primary key
    handleChange(id, 1)
  }



  return (
    <>
      {/* Tab view which contains two tabs, which are List and Details */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="List" {...a11yProps(0)} />
            <Tab label="Details" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ListItems fun={viewDetails} />   {/**ListItem component to show list of application in table */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DetailsTabs id={listId} />   {/**detailstabs to show details of selected application */}
        </TabPanel>

      </Box>
    </>
  );
}
/**
 * Exported to :
 * 1. Mailbox Component
 * 
 */