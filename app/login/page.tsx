import { LoginForm } from '@/components'

export default function Home() {
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-gradient-to-r from-violet-500 to-fuchsia-500'>
      <div className='bg-white h-[700px] w-[1500px] flex'>
        <div className='h-[700px] w-[1000px]  bg-image flex justify-center'>
          <h2 className='pt-72 text-6xl'>
            Welcome to Tekcos Chat
          </h2>
        </div>
        <div className='flex w-[500px]'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
