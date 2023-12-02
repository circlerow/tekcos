'use client'

import { Main } from '@/components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);


  return (
    <div className='bg-white'>
      <Main />
    </div>
  )
}
