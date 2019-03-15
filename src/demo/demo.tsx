import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export const Demo = (props) => <Paper style={{padding: 15, marginBottom: 30}}>{props.children}</Paper>
export const DemoTitle = (props) => <Typography variant="h5" >{props.children}</Typography>
export const DemoHelp = (props) => <Typography variant="caption">{props.children}</Typography>
export const DemoContent = (props) => <div style={{marginTop: 15}}>{props.children}</div>