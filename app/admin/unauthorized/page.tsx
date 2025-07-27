import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
        <p className="text-purple-200 mb-8 max-w-md">
          You don't have permission to access the admin panel. 
          Please contact the administrator if you believe this is an error.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft size={16} />
          Back to Website
        </Link>
      </div>
    </div>
  )
}