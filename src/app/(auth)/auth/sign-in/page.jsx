import Image from 'next/image'
import React from 'react'
import SignInFormClient from '../../../../../modules/auth/components/Sign-in-form-client'

function page() {
  return (
    <>
        <Image src={"/login.svg"} alt='login' width={300} height={300} className='m-6 object-cover'/>
        <SignInFormClient/>
    </>
  )
}

export default page