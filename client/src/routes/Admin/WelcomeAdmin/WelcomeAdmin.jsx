import React from 'react'
import './WelcomeAdmin.css'

function WelcomeAdmin() {
    return (
        <div>
            <Button buttonText='Formations' />
        </div>
    )
}

class Button extends React.Component {
    constructor() {
        super(props);
    }

    render() {
        return (
            <div className='button'>{this.buttonText}</div>
        )
    }
}