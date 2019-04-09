import React from 'react'

import TrendingDemo from '../demos/TrendingDemo'
import BigNumberDemo from '../demos/BigNumberDemo'
import AlertDemo from '../demos/AlertDemo'
import SearchFieldDemo from '../demos/SearchFieldDemo'
import TextFieldEditorDemo from '../demos/TextFieldEditorDemo'
import ConfirmationDialogDemo from '../demos/ConfirmationDialogDemo'
import EmojiDemo from '../demos/EmojiDemo'
import ProfileCardDemo from '../demos/ProfileCardDemo'
// import DashBoardDemo from '../demos/DashBoardDemo'

export default () => (<>
    <ProfileCardDemo />
    <EmojiDemo />
    <AlertDemo />
    <BigNumberDemo />
    <ConfirmationDialogDemo />
    {/* <DashBoardDemo /> */}
    <SearchFieldDemo />
    <TextFieldEditorDemo />
    <TrendingDemo />
</>)