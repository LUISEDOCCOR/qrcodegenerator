import React, { useState, useEffect } from 'react'
import { getqrcode } from './api/getQR'


function App() {
  //url img
  const [qr, setQr] = useState('')
  //value input 
  const [data, setData] = useState('')

  const handleQRCodeGeneration = async (qr_data) => {
    if(qr_data){
      const qr = await getqrcode(qr_data)
      setQr(qr)
      localStorage.setItem('qr', qr_data)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('qr')){
      setData(localStorage.getItem('qr'))
      handleQRCodeGeneration(localStorage.getItem('qr'))
    }
  },[])

  return (
    <>
      <header className='text-white py-12 text-center space-y-4'>
        <h1 className='text-4xl font-semibold uppercase'>QR code generator</h1>
        <h2 className='text-2xl '>Created by Luis wiht 💖</h2>
      </header>
      <main className='h-[60vh] flex justify-center items-center flex-col text-white gap-6'>
        <div className='flex gap-2 items-end'>
          <div className='flex flex-col gap-1'>
            <label className='text-xl font-semibold' htmlFor="url-input">URL: </label>
            <input id='url-input' className='focus:outline-none px-2 py-1 text-black rounded text-xl' placeholder='...' onChange={(e) => {setData(e.target.value)}} value={data} type="text" />
          </div>
          <button className='px-2 py-1 text-xl bg-slate-400 rounded transition-colors hover:bg-slate-500 ring-slate-700 focus:ring-2' onClick={() => {handleQRCodeGeneration(data)}}>Get</button>
        </div>
        {
          qr && <div className='flex flex-col gap-3 items-center'>
              <img className='rounded hover:scale-105 transition-transform' src={qr} alt="qr" />
              <a className='px-2 py-1 text-xl bg-slate-400 rounded transition-colors hover:bg-slate-500 ring-slate-700 focus:ring-2' href={qr} download="qrcode.png">Download</a>
          </div>
        }
      </main >
    </>
  )
}

export default App
