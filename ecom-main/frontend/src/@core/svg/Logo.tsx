// React Imports
import type { SVGAttributes } from 'react'
import Image from 'next/image'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <div style={{ position: 'relative', height: '40px' }}>
      <img src='/images/logos/logo_expt.png' alt='Logo' height={40} style={{ objectFit: 'contain' }} />
    </div>
  )
}

export default Logo
