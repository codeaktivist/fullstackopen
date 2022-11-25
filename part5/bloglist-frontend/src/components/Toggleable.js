import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, refs) => {
    Toggleable.displayName = 'MyApp'
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisible = () => setVisible(false)

    useImperativeHandle(refs, () => {
        return { toggleVisible }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(!visible)}>Create new note</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() => setVisible(!visible)}>Cancel</button>
            </div>
        </div>
    )
})

export default Toggleable