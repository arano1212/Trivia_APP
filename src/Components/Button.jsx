import React from 'react'

const Button = ({ onClick, text }) => {
  const estilo = {
    backgroundColor: 'rgb(230, 230, 230)'
  }
  return (
    <>
      <div style={estilo}>
        <button onClick={onClick}>{text}</button>
      </div>
    </>
  )
}

export default Button
