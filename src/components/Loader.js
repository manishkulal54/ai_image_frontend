import React from 'react'
import ReactLoading from 'react-loading';
import '../Stylesheets/Main.css'

export default function Loader() {
  return (
    <div className='loading-container'>
    <ReactLoading type={'bubbles'} color={'white'} height={'100px'} width={'400px'} />
    </div>
  )
}
