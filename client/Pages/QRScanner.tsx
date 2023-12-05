import { useRef, useState, useEffect } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'

interface Props {
  setClientId: () => void
}

function QRScanner({ setQRCode }: Props) {
  const videoRef = useRef(null)
  const codeReader = new BrowserMultiFormatReader()
  // const [result, setResult] = useState('')

  useEffect(() => {
    console.log('loaded')
    codeReader
      .decodeFromInputVideoDevice(undefined, videoRef.current)
      .then((result) => {
        const qr = result.getText()
        setQRCode(qr)
        console.log(qr)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  // function startScanner() {
  //   codeReader
  //     .decodeFromInputVideoDevice(undefined, videoRef.current)
  //     .then((result) => setResult(result.getText()))
  //     .catch((err) => console.error(err))
  // }

  function stopScanner() {
    codeReader.reset()
    // setResult('No result')
  }
  return (
    <div className=" h-80">
      <video ref={videoRef} />
      {/* <p>{result}</p> */}
    </div>
  )
}

export default QRScanner
