import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Divider} from '@material-ui/core'

export const Demo = (props) => <Paper style={{padding: 15, marginBottom: 30}}>{props.children}</Paper>
export const DemoTitle = (props) => <Typography variant="h5" >{props.children}</Typography>
export const DemoHelp = (props) => <Typography variant="caption">{props.children}</Typography>
export const DemoContent = (props) => (
    <div style={{marginTop: 30}}>
        <Typography variant="subtitle1" >Example</Typography>
        <Divider />
        <br />
        {props.children}
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