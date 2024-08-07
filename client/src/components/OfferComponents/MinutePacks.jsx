import React from 'react'
import Packs from './Packs'

function MinutePacks({packTitle, operator}) {
  return (
    <div className=' grid grid-cols-2 gap-3 px-3 py-5 '>
        <Packs packTitle={packTitle} operator={operator} quantity="20GB" time="7DAYS" amount="399" />
        <Packs packTitle={packTitle} operator={operator} quantity="20GB" time="7DAYS" amount="399" />
        <Packs packTitle={packTitle} operator={operator} quantity="20GB" time="7DAYS" amount="399" />
        <Packs packTitle={packTitle} operator={operator} quantity="20GB" time="7DAYS" amount="399" />
        <Packs packTitle={packTitle} operator={operator} quantity="20GB" time="7DAYS" amount="399" />
        <Packs packTitle={packTitle} operator={operator} quantity="20GB" time="7DAYS" amount="399" />
    </div>
  )
}

export default MinutePacks