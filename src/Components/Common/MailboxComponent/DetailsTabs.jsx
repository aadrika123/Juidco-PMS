//////////////////////////////////////////////////////////////////////////////////////
//    Author - Talib Hussain
//    Version - 1.0
//    Date - 24 june 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - DetailsTabs
//    DESCRIPTION - DetailsTabs Component
//////////////////////////////////////////////////////////////////////////////////////
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WorkFlow from './WorkFlow';
import DetailsTable from './DetailsTable';
import DocumentMailbox from './DocumentMailbox';
import StatusTimeline from './StatusTimeline';
import SafDetialsCard from './SafDetialsCard';
import EmptyDetailsIllustration from '@/Components/Common/EmptyDetails/EmptyDetailsIllustration';


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

export default function DetailsTabs(props) {
    const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (props.id == '') {
        return (
            <>
                <EmptyDetailsIllustration title="No App Selected !" />
            </>
        )
    }



    return (
        <div>
            <div className="flex">
                {/* StatusTimeline to show the progress level of holding application */}
                <div><StatusTimeline index="1" level="Back Office" verificationStatus={true} last={false} /></div>
                <div><StatusTimeline index="2" level="Dealing Assistant" verificationStatus={true} last={false} /></div>
                <div><StatusTimeline index="3" level="Agency TC" verificationStatus={true} last={false} /></div>
                <div><StatusTimeline index="4" level="UlB TC" verificationStatus={false} last={false} /></div>
                <div><StatusTimeline index="5" level="Section Incharge" verificationStatus={false} last={false} /></div>
                <div><StatusTimeline index="6" level="Executive Officer" verificationStatus={false} last={true} /></div>
            </div>
            {/* DetailTable to show basic details of holding application */}
            <DetailsTable id={props.id} />
            <div className=''></div>

            {/* Tab view which contains three tabs, which are Saf Detials, Documents and Workflow */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Saf Details" {...a11yProps(0)} />
                        <Tab label="Documents" {...a11yProps(1)} />
                        <Tab label="Workflow" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {/* SafDetialsCard containe details about saf */}
                    <SafDetialsCard />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* DocumentMailbox Contains documents uploaded with holding application */}
                    <DocumentMailbox />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {/* WorkFlow contains timeline and action for holding application */}
                    <WorkFlow />
                </TabPanel>

            </Box>
        </div>
    );
}
/**
 * Exported to :
 * 1. MailboxContent Component
 * 
 */