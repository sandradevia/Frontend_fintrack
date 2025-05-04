import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Label, Input, Button, WindmillContext } from '@roketid/windmill-react-ui'

function ForgotPassword() {
  const { mode } = useContext(WindmillContext)
  const imgSource =
    mode === 'dark'
      ? '/assets/img/login.jpg'
      : '/assets/img/login.jpg'

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${imgSource})`
      }}
    >
      {/* Overlay biar card lebih kontras */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      {/* Card container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your Active Email
        </p>

        <Label>
          <span className="text-sm text-gray-700 dark:text-gray-200">Email</span>
          <Input
            className="mt-1"
            placeholder="Enter Email"
            type="email"
          />
        </Label>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          We will send you a link to reset your password via email
        </p>

        <Link href="/example/send-fp">
          <a>
            <Button block className="bg-indigo-600 hover:bg-indigo-700">
              Send
            </Button>
          </a>
        </Link>

        <div className="mt-6 text-center">
          <Link href="/example/login" passHref>
            <span className="text-sm text-indigo-600 hover:underline cursor-pointer">
              ← Back to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
