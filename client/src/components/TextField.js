import React from 'react'

const TextField = (props) => 
    <input
        className = "text-field"
        id={props.id}
        onChange={props.onChange}
        value={props.value}
    />

export default TextField
