import React from 'react'
import styled from 'styled-components/macro'

import Typography, {TypographyProps} from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import {Code} from '../components/code'
import Link, {Anchor} from '../components/Link'

// https://www.w3schools.com/charsets/ref_emoji.asp
const emojis = {
    middleFinger: <>&#128405;</>,
    indexFinger: <>&#128070;</>,
    flex: <>&#128170;</>,
    brokenHeart: <>&#128148;</>,
    perfect: <>&#128076;</>,
    thumbsUp: <>&#128077;</>,
    thumbsDown: <>&#128078;</>,
    clap: <>&#128079;</>,
    heart: <>&#128152;</>,
    fire: <>&#128293;</>,
    bulb: <>&#128161;</>,
    crap: <>&#128169;</>,
    thinking: <>&#129300;</>,
    rocket: <>&#128640;</>
}

const Section = styled.div`&&{
    margin-top: ${({theme}) => theme.mui.spacing(4)}px;
    margin-bottom: ${({theme}) => theme.mui.spacing(2)}px;
}`

const SubHeading = (props: TypographyProps) => <Typography variant='h4' paragraph {...props} />
const Paragraph = (props: TypographyProps) => <Typography variant='body1' paragraph {...props} component='div'/>
const Tip = (props: { title: React.ReactNode, children: React.ReactNode }) => (<>
    <Typography variant='h5' paragraph>&#9679; {props.title}</Typography>
    <Card elevation={0}>
        <CardContent>
            <Typography variant='h6'>Why?</Typography>
            <Typography variant='body1' component='div'>{props.children}</Typography>
        </CardContent>
    </Card>
    <br />
</>)

const Guideline = (props: { title: React.ReactNode, children: React.ReactNode }) => (<>
    <Typography variant='h5' paragraph>&#9679; {props.title}</Typography>
    <Card elevation={0}>
        <CardContent>
            <Typography variant='body1' component='div'>{props.children}</Typography>
        </CardContent>
    </Card>
</>)

export default class Guidelines extends React.PureComponent{
    render = () => (<>
        {this.renderHeading()}
        {this.renderGuidelines()}
        {this.renderTips()}
        {this.renderContributing()}
    </>)

    renderHeading = () => (
        <>
            <Typography variant='h2' paragraph>
                Guidelines
            </Typography>
            <Typography variant='subtitle1' paragraph>
                <b>{'{WIP} '}</b>Some general guidelines for developing React applications in TFSO
            </Typography>
        </>
    )

    renderGuidelines = () => (
        <Section>
            <SubHeading>General <Anchor id={'general'}/></SubHeading>
            <Guideline title='Material Design'>
                We strive to follow <Link underline='hover' href='https://material.io/design/' target='_blank'>Google's Material Design</Link> principles. <br />
                Use components and icons from the <Link underline='hover' href='https://material-ui.com/' target='_blank'>MaterialUi package</Link><br />
                This package also provides a theme to be used with <code>material-ui</code>, <Link underline='hover' to='/theme'>get started using it here</Link>
            </Guideline>
        </Section>
    )

    renderTips = () => (
        <Section>
            <SubHeading>
                {emojis.indexFinger} Do's &amp; Don'ts {emojis.middleFinger} <Anchor id={'dodont'} />
            </SubHeading>
            <Tip title={<>Specific imports</>}>
                Reducing bundle size!<br />
                <b>Bad:</b>
                <Code language='js'>
                    {
                        `import { Button } from '@material-ui/core' // All of material-ui/core will be included in the bundle!
import { Alert } from 'react-tfso-components' // All of react-tfso-components will be included in the bundle!`
                    }
                </Code>
                <b>Good:</b>
                <Code language='js'>
                    {
                        `import Button from '@material-ui/core/Button'
import Alert from 'react-tfso-components/dist/Alert'`
                    }
                </Code>
            </Tip>

            <Tip title={<>{/* emojis.thumbsUp */}Extend from <code>React.PureComponent</code> instead of <code>React.Component</code></>}>
                Your components should never mutate the state directly or have mutable properties.<br/>
                Hence they are pure, and should extend React.PureComponent, which is more performant.
            </Tip>
            <Tip title={<>{/* emojis.thumbsDown */}Don't use <code>componentWillReceiveProps</code></>}>
                It's deprecated and going away in React 17 {emojis.brokenHeart}<br />
                More information <Link underline='hover' href='https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops' target='_blank'>here</Link>
            </Tip>
            <Tip title={<>{/* emojis.thumbsDown */}Avoid copying props to state</>}>
                ...unless you absolutely need to, there are legit reasons, however there is most likely a better solution. <br />
                Perhaps you should invoke a callback provided by props and let the parent component handle something?
            </Tip>
        </Section>
    )

    renderContributing = () => (<>
        <SubHeading>
            Contributing to <code>react-tfso-components</code> {emojis.rocket} <Anchor id='contributing' />
        </SubHeading>
        <Paragraph>
            Components in this package should:
            <ul>
                <li>Be written in typescript or provide type declarations (d.ts)</li>
                <li>Be composible</li>
                <li>Not be specific to a domain/usage (they should be as generic as possible)</li>
                <li>Validate props using `<code>prop-types`</code></li>
                <li>Be Pure (function component or extending <code>React.PureComponent</code>)</li>
                <li>Have descriptive and easy to understand Props:
                    <ul>
                        <li>Use commonly known verbs/names</li>
                        <li>Function props should begin with 'on', (onFocus, onChange etc.)</li>
                        <li>Boolean props should <i>not</i> begin with 'is', (open instead of isOpen)</li>
                        <li>Boolean props should be optional, (eg. <code>open?: boolean</code>), <code>undefined</code> should be evaluated as <code>false</code></li>
                        <li><code>children</code> should always be explicitly typed (eg: <code>children: string</code>)</li>
                        <li><code>children</code> should be defined as
                            <ul>
                                <li><code>React.ReactCild</code> for single child<br /></li>
                                <li><code>React.ReactNode</code> for multiple children</li>
                                <li>primitive type (<code>undefined</code>, <code>string</code>, <code>number</code> etc.)</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Have a demo with documentation so that developers can easily find and use your component</li>
            </ul>
        </Paragraph>
    </>)
}
