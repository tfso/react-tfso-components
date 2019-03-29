import React, { ReactChild } from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Divider from '@material-ui/core/Divider'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import GitHubLink from './GitHubLink'

export const Demo = (props) => <Paper style={{padding: 15, marginBottom: 30}}>{props.children}</Paper>

export type DemoTitleProps = {
    children: string
    /**
     * The path to the Demo component. `src/demo/demos/` will be appended in front of the path
     */
    demoPath?: string

    /**
     * The path to the Implementation of the component. `src/lib/` will be appended in front of the path
     */
    srcPath?: string
}
export const DemoTitle = (props: DemoTitleProps) => {
    return (
        <Grid container justify='space-between' alignItems='baseline' >
            <Grid item>
                <Typography variant="h5" >
                    {props.children}
                </Typography>
            </Grid>
            {props.srcPath || props.demoPath ? 
            <Grid item xs={2} container spacing={16} justify='flex-end'>
                {props.demoPath && <Grid item><GitHubLink fontSize='default' color='secondary' path={`blob/master/src/demo/demos/${props.demoPath}`} tooltip={`View demo source for ${props.children}`} /></Grid>}
                {props.srcPath && <Grid item><GitHubLink fontSize='default' color='primary' path={`blob/master/src/lib/${props.srcPath}`} tooltip={`View source for ${props.children}`}/></Grid> }
            </Grid>
            : null}
        </Grid>
    )
}
export const DemoHelp = (props) => <Typography variant='subtitle1'>{props.children}</Typography>
export const DemoContent = (props: { children: Array<ReactChild> | ReactChild}) => (
    <div style={{marginTop: 30}}>
        <Typography variant="subtitle1" >Example</Typography>
        <Divider />
        <br />
        <Grid container spacing={16} alignItems='center'>
            {props.children && Array.isArray(props.children) 
                ? props.children.map((child, i) => (
                    <Grid item key={i} xs={i === 0 ? 12 : false}>
                        {child}
                    </Grid>
                ))
                : <Grid item xs={12} >{props.children}</Grid>
            }
        </Grid>
    </div>
)

export const DemoProps = (props) => (
    <ExpansionPanel style={{marginTop: 15}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Props</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Default</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.children}
                </TableBody>
            </Table>
        </ExpansionPanelDetails>
    </ExpansionPanel>
)

export type DemoPropProps = {
    name: string
    type: string
    default?: string
    description?: string
}

export const DemoProp = (props: DemoPropProps) => (
    <TableRow>
        <TableCell><code>{props.name}</code></TableCell>
        <TableCell><code>{props.type}</code></TableCell>
        <TableCell><code>{props.default}</code></TableCell>
        <TableCell><Typography>{props.description}</Typography></TableCell>
    </TableRow>
)