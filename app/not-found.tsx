import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cream to-sage-light/20 flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="font-knewave text-6xl md:text-8xl text-sage mb-4">404</h1>
                <h2 className="text-3xl md:text-4xl font-bold text-olive mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    Oops! The page you're looking for seems to have wandered off into the rice fields.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage-dark transition-all font-medium"
                    >
                        <Home size={20} />
                        <span>Go Home</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center space-x-2 border-2 border-sage text-sage px-6 py-3 rounded-lg hover:bg-sage hover:text-white transition-all font-medium"
                    >
                        <ArrowLeft size={20} />
                        <span>Go Back</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
