'use client'

import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Particles from './Particles';
import ReduxProvider from '@/store/provider'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="min-h-screen bg-black text-white flex">
      <Particles
        className="z-0 !h-full !w-full"
        particleColors={['#ffce1b', '#ffce1b']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <Sidebar />
      
      <div 
        className="flex-1 flex flex-col min-w-0 bg-black/80 transition-all duration-300 ease-in-out md:pl-24 z-0"
      >
        <Topbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ReduxProvider>
  )
}
