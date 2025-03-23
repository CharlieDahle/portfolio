import { signIn } from "@/auth"

export function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server"
            await signIn("credentials", formData)
          }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input 
                name="email" 
                type="email" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input 
                name="password" 
                type="password" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                required 
              />
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}