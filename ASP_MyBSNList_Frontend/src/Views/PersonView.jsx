import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {makeStyles,
    Box,
    Button,
    Paper,
    Typography,
    Grid,
    AppBar,
    Tab,
    Tabs,
    Table,
    TableRow,
    TableCell} from '@material-ui/core';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import NotesIcon from '@material-ui/icons/Notes';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px',
        width: '100%',
        height: '100%',
    },
    profileSection : {
        marginTop: '20px',
    },
    profileTabs: {
        background: 'black',
        color: 'white',
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    leftPanelRoot: {
        flex: 0.33,
        textAlign: 'center',
    },
    leftPanelDetails: {
        textAlign: 'left',
    },
    rightPanelRoot: {
        flex: 0.66,
    },
    rightPanelTable: {
        width: '500px',
        height: '300px',
        paddingRight: '400px',
    },
    rightPanelTableRCell: {
        width: '50px',
    },
    icon:
    {
        fontSize: '400px',
    },
    buttonIcon:
    {
        marginRight: '5px',
    },
    textSecondary: {
        color: 'black',
    },
    greyRounded: {
        background: 'black',
        borderRadius: '8px',
        width: '75px',
        textAlign: 'center',

        '& Typography' : {
            color: 'white',
        },
    },
    greyRoundedText: {
        color: 'white',
    },
}));

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
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const PersonView = (props) => {
    const {theme} = props;
    const classes = useStyles(theme);
    const {id} = useParams();

    const [personData,setPersonData] = useState(undefined);
    const personColumns = {
        Name: {
            Id: "Name", DisplayName: "Name"
        },
        PrimaryCommunication: {
            Id: "PrimaryCommunication", DisplayName: "Primary Communication"
        },
        SecondaryCommunication: {
            Id: "SecondaryCommunication", DisplayName: "Secondary Communication"
        },
        Nationality: {
            Id: "Nationality", DisplayName: "Nationality"
        },
        Country: {
            Id: "Country", DisplayName: "Country"
        },
        City: {
            Id: "City", DisplayName: "City"
        },
        Occupation: {
            Id: "Occupation", DisplayName: "Occupation"
        },
        Industry: {
            Id: "Industry", DisplayName: "Industry"
        },
        MaritalStatus: {
            Id: "MaritalStatus", DisplayName: "Marital Status"
        },
        AgeGroup: {
            Id: "AgeGroup", DisplayName: "Age Group"
        },
        HasKids: {
            Id: "HasKids", DisplayName: "Kids", TRUE: "Yes", FALSE: "None"
        },
        Remarks: {
            Id: "Remarks", DisplayName: "Remarks"
        },
        LastContact: {
            Id: "LastContact", DisplayName: "Last Contact"
        },
        List: {
            Id: "List", DisplayName: " List"
        },
        Gender: {
            Id: "Gender", DisplayName: "Gender", MALE: "Male", FEMALE: "Female"
        },
        EMPTYORNULL: {
            DisplayName: "Unknown "
        },
        NA: {
            DisplayName: "N/A"
        },
    }

    useEffect(() => {
        loadPersonData();
    },[]);

    const loadPersonData = async () => {
        const personURL = 'api/person/'+id;
        const personData = (await axios({
            method:'GET',
            url: personURL,
            baseURL: '/',
        })).data;

        console.log(personData);

        setPersonData(personData);
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Paper className={classes.root}>
            <Grid container direction={'row'} className={classes.root}>
                <Grid container direction={'column'} className={classes.leftPanelRoot}>
                    <Grid item>
                        <AccountBoxIcon className={classes.icon}/>
                    </Grid>
                    <Grid item className={classes.leftPanelDetails}>
                    <Typography variant="h5" className={classes.sectionTitle}>Details</Typography>
                        <Table>
                            <TableRow>
                                <TableCell>
                                    <Grid container direction={'column'}>
                                        <Grid item>
                                            <Typography variant="h6" className={classes.sectionTitle}>{personData?.[personColumns.Country.Id]?.Name ?? personColumns.EMPTYORNULL.DisplayName+personColumns.Country.DisplayName}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.City.Id]?.Name ?? personColumns.EMPTYORNULL.DisplayName+personColumns.City.DisplayName}</Typography>
                                        </Grid>
                                    </Grid>
                            
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <Grid container direction={'column'}>
                                        <Grid item>
                                            <Typography variant="h6" className={classes.sectionTitle}>{personData?.[personColumns.Industry.Id]?.Name ?? personColumns.EMPTYORNULL.DisplayName+personColumns.Industry.DisplayName}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.Occupation.Id]?.Name ?? personColumns.EMPTYORNULL.DisplayName+personColumns.Occupation.DisplayName}</Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </Grid>
                </Grid>
                <Grid container direction={'column'} className={classes.rightPanelRoot}>
                    <Grid item>
                        <Grid item>
                            <Typography variant="h4" className={classes.sectionTitle}>{personData?.Name}</Typography>
                        </Grid>
                        <Grid container direction="row">
                            <Box className={classes.greyRounded}><Typography className={classes.greyRoundedText} variant="h6">{personData?.[personColumns.List.Id]+personColumns.List.DisplayName ?? personColumns.NA.DisplayName}</Typography></Box> 
                            <Button style={{marginLeft: '140px'}}><ChatIcon className={classes.buttonIcon} /> Start Conversation</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {/*Possibly going to put a status bar here - design still required*/}
                    </Grid>
                    <Grid container direction="column" className={classes.profileSection}>
                        <Table className={classes.rightPanelTable} size="small">
                            <TableRow>
                                <TableCell className={classes.rightPanelTableCell}>{personColumns.Gender.DisplayName}</TableCell>
                                <TableCell>
                                    <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.Gender.Id] ? personColumns.Gender.MALE : personColumns.Gender.FEMALE ?? personColumns.EMPTYORNULL.DisplayName}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{personColumns.Nationality.DisplayName}</TableCell>
                                <TableCell>
                                    <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.Nationality.Id]?.Name ?? personColumns.EMPTYORNULL.DisplayName}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{personColumns.MaritalStatus.DisplayName}</TableCell>
                                <TableCell>
                                    <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.MaritalStatus.Id]?.Name ?? personColumns.EMPTYORNULL.DisplayName}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{personColumns.AgeGroup.DisplayName}</TableCell>
                                <TableCell>
                                    <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.AgeGroup.Id]?.Name ?? personColumns.EMPTYORNULL.DisplayName}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{personColumns.HasKids.DisplayName}</TableCell>
                                <TableCell>
                                    <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.HasKids.Id] ? personColumns.HasKids.TRUE : personColumns.HasKids.FALSE ?? personColumns.EMPTYORNULL.DisplayName}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{personColumns.LastContact.DisplayName}</TableCell>
                                <TableCell>
                                    <Typography style={{fontSize: '15px'}}>{personData?.[personColumns.LastContact.Id] ?? personColumns.EMPTYORNULL.DisplayName}</Typography>
                                </TableCell>
                            </TableRow>
                        </Table>
                        <Grid item className={classes.profileSection}>
                            
                        </Grid>
                    </Grid>
                    <Grid item className={classes.profileSection} style={{marginTop: '10px'}}>
                        <AppBar position="static" className={classes.profileTabs}>
                          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label={<div><NotesIcon style={{verticalAlign: 'middle'}} /> Remarks </div>}/>
                            <Tab label={<div><ForumIcon style={{verticalAlign: 'middle'}} /> Messages </div>}/>
                          </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                          Item One
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          Item Two
                        </TabPanel>
                    </Grid>
                </Grid>     
            </Grid>
        </Paper>
    );
}

export default PersonView;