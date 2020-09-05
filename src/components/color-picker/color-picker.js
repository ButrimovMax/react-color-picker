import React, {useCallback, useEffect, useState} from 'react'
import './color-picker.css'

const ColorPicker = ({colors, onChange, value}) => {
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openSlider, setOpenSlider] = useState(false)
    const [selectedColor, setSelectedColor] = useState(value)
    const [redSlider, setRedSlider] = useState(0)
    const [greenSlider, setGreenSlider] = useState(0)
    const [blueSlider, setBlueSlider] = useState(0)

    useEffect(()=>{
        setSelectedColor(rgbToHex(redSlider, greenSlider, blueSlider))
    }, [redSlider, greenSlider, blueSlider])

    const sliderValues = useCallback(()=>{
            setRedSlider(hexToRgb(value).r)
            setGreenSlider(hexToRgb(value).g)
            setBlueSlider(hexToRgb(value).b)
        },
        [value]
    )

    useEffect(()=>{
        if(value){
            sliderValues()
        }
        setSelectedColor(value)
    }, [value, sliderValues])

    const handleBackdropClick = () => {
        setOpenSlider(false)
        setOpenDropdown(false)
    }

    useEffect(()=>{
        document.addEventListener('click', handleBackdropClick)
        return ()=>{
            document.removeEventListener('click', handleBackdropClick)
        }
    }, [])


    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const rgbToHex = (...rgb) => {

            let r = (rgb[0]).toString(16);
            let g = (rgb[1]).toString(16);
            let b = (rgb[2]).toString(16);

            if (r.length === 1)
                r = "0" + r;
            if (g.length === 1)
                g = "0" + g;
            if (b.length === 1)
                b = "0" + b;

            return ("#" + r + g + b).toUpperCase()
        }

    const toggleSlider = () => {
        if(openDropdown){
            setOpenDropdown(false)
        }
        setOpenSlider(prevState => !prevState)
    }

    const toggleDropdown = () => {
        if(openSlider){
            setOpenSlider(false)
        }
        setOpenDropdown(prevState => !prevState)
    }

    const handleSliderChange = (e, slider) => {
        slider(+e.target.value)
    }

    const onOk = () => {
        onChange(selectedColor)
        toggleSlider()
    }

    const onCancel = () => {
        setSelectedColor(value)
        sliderValues(value)
        toggleSlider()
    }


    const dropdownElements = colors.map((item, index) => {
        return (
            <li
                key={index}
                className='dropdown-item'
                onClick={()=>{
                    onChange(item.color)
                    toggleDropdown()}}>
                <span
                    className='dropdown-item-label'>
                    {item.label}
                </span>
                <span
                    className='dropdown-item-color-preview'
                    style={{backgroundColor: item.color}}>
                </span>
            </li>
        )
    })
    const backdropElement = (
        <div
            className='dropdown-backdrop'
            onClick={handleBackdropClick}>
        </div>
    )
    return (
        <>
            <div
                className='color-picker-rgb'
                onClick={toggleSlider}>
                <div style={{backgroundColor: selectedColor}}>
                </div>
            </div>
            <div className={openSlider ? 'slider-dropdown-wrapper open': 'slider-dropdown-wrapper'}>
                {backdropElement}
                <div
                    className="slider-dropdown">
                    <div className="slide-container">
                        <span className='slider-label'>R</span>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={redSlider}
                            onChange={(e)=>handleSliderChange(e, setRedSlider)}
                            className="slider red" />
                    </div>
                    <div className="slide-container">
                        <span className='slider-label'>G</span>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={greenSlider}
                            onChange={(e)=>handleSliderChange(e, setGreenSlider)}
                            className="slider green" />
                    </div>
                    <div className="slide-container">
                        <span className='slider-label'>B</span>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={blueSlider}
                            onChange={(e)=>handleSliderChange(e, setBlueSlider)}
                            className="slider blue" />
                    </div>
                    <div className='slider-btn-wrapper'>
                        <button className='btn btn-cancel' onClick={onCancel}>cancel</button>
                        <button className='btn btn-ok' onClick={onOk}>ok</button>
                    </div>

                </div>
            </div>
            <div
                className='color-picker-dropdown-btn'
                onClick={toggleDropdown}>
            </div>
            <div className={openDropdown ? 'color-picker-dropdown-wrapper open' : 'color-picker-dropdown-wrapper'} >
                {backdropElement}
                <ul
                    className='color-picker-dropdown'>
                    {dropdownElements}
                </ul>
            </div>

        </>
    )
}

export default ColorPicker
