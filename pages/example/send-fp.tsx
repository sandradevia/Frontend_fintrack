import React, { useContext } from 'react'
import Link from 'next/link'
import { WindmillContext, Button } from '@roketid/windmill-react-ui'

function ForgotPassword() {
  const { mode } = useContext(WindmillContext)
  const bgImage = mode === 'dark' 
    ? "/assets/img/login.jpg" 
    : "/assets/img/login.jpg"

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div
        className="flex flex-col items-center justify-center flex-1 p-10 bg-gray-50 dark:bg-gray-900"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover', 
        }}
      >
        <div className="bg-white p-8 rounded-lg w-full max-w-md text-center"> {/* Set white background */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Check Your Email and Reset Your Password
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Log back in using the button below.
          </p>
          <Link href="/example/login" passHref>
            <Button block className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
