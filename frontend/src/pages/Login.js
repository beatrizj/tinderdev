import React, { useState } from 'react'
import logo from '../assets/logo.png'
import './Login.css'
import api from '../services/api'

export default function Login({ history }) {
    const [username, setUsername] = useState('') // quando precisar alterar o valor chama a função setUsername, 
                                                 // só acessar chama username. O parenteses ('') está iniciando a variável.

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await api.post('/devs', {
            username
        })
        console.log(response)
        const { _id } = response.data
        history.push(`/dev/${_id}`)
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='tindev'/>
                <input
                    placeholder='Digite seu usuário no GitHub'
                    value={username}                    
                    onChange={e => setUsername(e.target.value)}
                />
                <button type='submit'>Enviar</button>
            </form>            
        </div>
    )
}