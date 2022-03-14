import React from 'react'
import './WelcomeAdmin.css'

export default function WelcomeAdmin() {
    return (
        <div className='container'>
            <div className='welcome'>
            <p><b>Bienvenue !</b></p>
            <p>Que souhaitez vous faire ?</p>
            <div className='button-grid'>
            <Button buttonText='Formations' />
            <Button buttonText='Pages' />
            <Button buttonText='Statistiques' />
            <Button buttonText='Paramètres du site' />
            <div className='solid'>
                </div>
            </div>
        </div>
    </div>
    )
}

function Button(props) {
    return (
        <div className='admin-button'>{props.buttonText}</div>
     )
}