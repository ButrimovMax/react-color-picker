import React, {useCallback, useEffect, useRef, useState} from 'react'
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

    const sliderDropdownBtn = useRef(null)
    const listDropdownBtn = useRef(null)
    const sliderDropdown = useRef(null)
    const listDropdown = useRef(null)

    useEffect(()=>{
        document.addEventListener('click', e=>{
            const clickInside = sliderDropdown.current.contains(e.target) || listDropdown.current.contains(e.target)
                || sliderDropdownBtn.current.contains(e.target)
                || listDropdownBtn.current.contains(e.target)
            if(!clickInside){
                setOpenDropdown(false)
                setOpenSlider(false)
            }
        })
        return ()=>{
            document.removeEventListener('click', ()=>{})
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

    return (
        <>
            <div
                ref={sliderDropdownBtn}
                className='color-picker-rgb'
                onClick={toggleSlider}>
                <div style={{backgroundColor: selectedColor}}>
                </div>
            </div>
            <div
                ref={listDropdownBtn}
                className='color-picker-dropdown-btn'
                onClick={toggleDropdown}>
            </div>
            <div
                className={openSlider ? 'slider-dropdown show' : "slider-dropdown"}
                ref={sliderDropdown}>
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
            <ul
                ref={listDropdown}
                className={openDropdown ? 'color-picker-dropdown show' : "color-picker-dropdown"}>
                {dropdownElements}
            </ul>
        </>
    )
}

export default ColorPicker
