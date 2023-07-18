'use client';
import { useRouter} from 'next/navigation';

export function SignOut(){
    const router = useRouter();
    router.push('/signout');
    return false;
}