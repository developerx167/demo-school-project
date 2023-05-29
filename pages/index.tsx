import { Inter } from 'next/font/google'
import Landing from '@/components/Landing/Landing'
import { useSession } from 'next-auth/react';
import { getStudentData } from '@/queries/queryFunctions';
import {useQuery} from "@tanstack/react-query"
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  
  return (
    <main>
      <Landing/>
    </main>
  )
}
