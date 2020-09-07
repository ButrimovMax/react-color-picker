import React, {useCallback, useEffect, useState} from 'react'
import './color-picker.scss'

const ColorPicker = ({colors, onChange, value}) => {
    const [openDropdown, setOpenDropdown] = useState({
        colorList: false,
        colorSlider: false
    })
    const [selectedColor, setSelectedColor] = useState(value)
    const [rgbSliders, setRgbSliders] = useState({
        red: 0,
        green: 0,
        blue: 0
    })

    const {red, green, blue} = rgbSliders
    const {colorSlider, colorList} = openDropdown

    useEffect(()=>{
        setSelectedColor(rgbToHex(red, green, blue))
    }, [red, green, blue])

    const sliderValues = useCallback(()=>{
            setRgbSliders({
                red: hexToRgb(value).r,
                green: hexToRgb(value).g,
                blue: hexToRgb(value).b
            })
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
        setOpenDropdown({
            colorList: false,
            colorSlider: false
        })

    }


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

    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prevState)=>({
            ...openDropdown,
            [dropdown]:!prevState[dropdown]
        }))
    }

    const handleSliderChange = (e, color) => {
        setRgbSliders({
            ...rgbSliders,
            [color]: Number(e.target.value)
        })
    }

    const onOk = () => {
        onChange(selectedColor)
        toggleDropdown('colorSlider')
    }

    const onCancel = () => {
        setSelectedColor(value)
        sliderValues()
        toggleDropdown('colorSlider')
    }

    const handleListItemClick = (itemColor) => {
        onChange(itemColor)
        toggleDropdown('colorList')
    }

    const dropdownElements = () => colors.map(({label, color}, index) => {
        return (
            <li
                key={index}
                className='dropdown-item'
                onClick={()=>handleListItemClick(color)}>
                <span
                    className='dropdown-item-label'>
                    {label}
                </span>
                <span
                    className='dropdown-item-color-preview'
                    style={{backgroundColor: color}}>
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
        <div className="color-picker-wrapper">
            <div
                className="color-picker-input">
                <span>{value}</span>
            </div>
            <div
                className='color-picker-rgb'
                onClick={()=>toggleDropdown('colorSlider')}>
                <div style={{backgroundColor: selectedColor}}>
                </div>
            </div>
            <div className={'slider-dropdown-wrapper'}>
                {colorSlider ? (
                    <>
                        {backdropElement}
                        <div
                            className="slider-dropdown">
                            <div className="slide-container">
                                <span className='slider-label'>R</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="255"
                                    value={red}
                                    onChange={(e)=>handleSliderChange(e, 'red')}
                                    className="slider red" />
                            </div>
                            <div className="slide-container">
                                <span className='slider-label'>G</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="255"
                                    value={green}
                                    onChange={(e)=>handleSliderChange(e, 'green')}
                                    className="slider green" />
                            </div>
                            <div className="slide-container">
                                <span className='slider-label'>B</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="255"
                                    value={blue}
                                    onChange={(e)=>handleSliderChange(e, 'blue')}
                                    className="slider blue" />
                            </div>
                            <div className='slider-btn-wrapper'>
                                <button className='btn btn-cancel' onClick={onCancel}>cancel</button>
                                <button className='btn btn-ok' onClick={onOk}>ok</button>
                            </div>

                        </div>
                    </>
                ) : null}
            </div>
            <div
                className='color-picker-dropdown-btn'
                onClick={()=>toggleDropdown('colorList')}>
            </div>
            <div className={'color-picker-dropdown-wrapper'}>
                {colorList ? (
                    <>
                        {backdropElement}
                        <ul className='color-picker-dropdown'>{dropdownElements()}</ul>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default ColorPicker
