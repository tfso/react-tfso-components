import React, {PureComponent} from 'react'
import CardReport from '../../lib/CardReport'
import {Demo, DemoContent, DemoHelp, DemoProp, DemoProps, DemoTitle} from '../components/demo'

const options = {
    id: 765,
    title: 'Report_Profit report',
    description: 'Report_Profit report_description',
    url: '/script/Reports/Economy/Journals/turnover.asp',
    image: null,
}

export default class CardReportsDemo extends PureComponent{
    translate = (key) => { return key }
    onClick = () => {}
    render(){
        return (
            <Demo>
                <DemoTitle srcPath='CardReport.tsx' demoPath='CardReportsDemo.tsx'>CardReport</DemoTitle>
                <DemoHelp>
                    Report cards on desktop and list on mobile
                </DemoHelp>
                <DemoProps>
                    <DemoProp name='options' type='object' default='' description='object for report item'/>
                    <DemoProp name='translate' type='function' default='' description='translate function'/>
                    <DemoProp name='onClick' type='function' default='' description='handles when it gets clicked'/>
                </DemoProps>
                <DemoContent>
                    <div style={{width: '200px'}}>
                        <CardReport onClick={this.onClick} options={options} translate={this.translate} />
                    </div>
                    <div style={{width: '250px'}}>
                        <CardReport onClick={this.onClick} options={options} translate={this.translate} />
                    </div>
                </DemoContent>
            </Demo>

        )
    }
}