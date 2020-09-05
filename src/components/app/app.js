import React, {useState} from "react";
import ColorPicker from "../color-picker";
import './app.css'

const colors = [
    {label: 'RED', color: '#FF0000'},
    {label: 'YELLOW', color: '#FFFF00'},
    {label: 'GREEN', color: '#00FF00'},
    {label: 'BLUE', color: '#0000FF'},
]

const App = () => {
    const [value, setValue] = useState('')
    const onChange = color => {
        setValue(color)
    }

    return (
        <div className='app'>
            <div className="color-picker-wrapper">
                <div
                    className="color-picker-input">
                    {value}
                </div>
                <ColorPicker colors={colors} value={value} onChange={color => onChange(color)}/>
            </div>

        </div>
    )
}

export default App
