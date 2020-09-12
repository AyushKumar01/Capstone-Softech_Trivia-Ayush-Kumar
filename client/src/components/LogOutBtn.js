import React from 'react'

function LogOutBtn(props) {
    return (
    <button className={props.className} type="submit">{props.text}</button>
    )
}

export default LogOutBtn;