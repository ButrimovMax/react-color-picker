import React, {useEffect, useState} from "react";
import ColorPicker from "../color-picker/color-picker";
import './app.scss'

const colors = [
    {label: 'RED', color: '#FF0000'},
    {label: 'YELLOW', color: '#FFFF00'},
    {label: 'GREEN', color: '#00FF00'},
    {label: 'BLUE', color: '#0000FF'},
]



const App = () => {
    const initialValue = localStorage.getItem('color') || '#FF0000'
    const [value, setValue] = useState(initialValue)
    const onChangeColor = color => setValue(color)


    useEffect(()=>{
        localStorage.setItem('color', value)
    }, [value])

    return (
        <div className='app'>
            <ColorPicker colors={colors} value={value} onChange={color => onChangeColor(color)}/>
        </div>

    )
}

export default App
