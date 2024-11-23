import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

const Header = () => {
  return (
    <div className='border-b px-4 '>
        <div className="flex items-center justify-between h-16 mx-auto max-w-4xl">
          <Link href='/' className='flex items-center gap-2 '>
              <h1>CSIR Database Management System</h1>
          </Link>
          

          <div>
            <Link href='/sign-in' className={buttonVariants()}>
              <h1>Login</h1>
            </Link>
        
          </div>
           
        </div>
    </div>
  )
}

export default Header