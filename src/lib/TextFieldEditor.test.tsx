import React from 'react'
import renderer from 'react-test-renderer'
import TextFieldEditor from './TextFieldEditor'

describe('TextFieldEditor', () => {
    it('Renders dirty when property dirty is true', () => {
        const component = renderer.create(
            <TextFieldEditor value='foo' onChange={() => {}} dirty={true} />
        )
        const json = component.toJSON()
        expect(json).toMatchSnapshot()
    })

    it('Renders dirty when value differs from property', () => {
        // Hmm
    })
})