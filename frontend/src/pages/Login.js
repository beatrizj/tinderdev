import React from 'react'
import logo from '../assets/logo.png'
import './Login.css'

export default function Login() {
    return (
        <div className='login-container'>
            <form>
                <img src={logo} alt='tindev'/>
                <input
                    placeholder='Digite seu usuário no GitHub'                    
                />
                <button type='submit'>Enviar</button>
            </form>            
        </div>        
    )
}