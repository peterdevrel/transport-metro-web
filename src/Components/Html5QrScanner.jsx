// components/Html5QrScanner.jsx
import React, { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

const Html5QrScanner = ({ onScanSuccess, onScanFailure, qrRegionId = 'qr-scanner' }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(qrRegionId, {
      fps: 10,
      qrbox: 250,
    })

    scanner.render(onScanSuccess, onScanFailure)

    return () => {
      scanner.clear().catch((error) => {
        console.error('Failed to clear QR scanner.', error)
      })
    }
  }, [])

  return <div id={qrRegionId} />
}

export default Html5QrScanner




// import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
// import { Html5QrcodeScanner } from 'html5-qrcode'

// const Html5QrScanner = forwardRef(({ onScanSuccess, onScanFailure, qrRegionId = 'qr-scanner' }, ref) => {
//   const scannerInstance = useRef(null)

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(qrRegionId, {
//       fps: 10,
//       qrbox: 250,
//     })

//     scanner.render(onScanSuccess, onScanFailure)
//     scannerInstance.current = scanner

//     return () => {
//       scanner.clear().catch((err) => {
//         console.warn('Scanner clear failed:', err)
//       })
//     }
//   }, [])

//   // Expose clear method to parent
//   useImperativeHandle(ref, () => ({
//     clearScanner: () => {
//       if (scannerInstance.current) {
//         return scannerInstance.current.clear()
//       }
//     }
//   }))

//   return <div id={qrRegionId} />
// })

// export default Html5QrScanner
