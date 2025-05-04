import React, { useContext } from 'react'
import Link from 'next/link'
import { Label, Input, Button, WindmillContext } from '@roketid/windmill-react-ui'

function LoginPage() {
  const { mode } = useContext(WindmillContext)
  const imgSource = mode === 'dark'
    ? '/assets/img/login.jpg'
    : '/assets/img/login.jpg'

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${imgSource})`
      }}
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">Login</h1>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">Enter your Username and password to login!</p>

        {/* OR separator */}
        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Username */}
        <Label className="mb-4 block">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Username</span>
          <Input className="mt-1" placeholder="username" />
        </Label>

        {/* Password */}
        <Label className="mb-2 block">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Password</span>
          <Input className="mt-1" type="password" placeholder="Min. 8 characters" />
        </Label>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/example/forgot-password">
            <span className="text-sm text-indigo-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </Link>
        </div>

        {/* Login Button */}
        <Link href="/example" passHref>
          <Button block className="bg-indigo-600 hover:bg-indigo-700">
            Login
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
