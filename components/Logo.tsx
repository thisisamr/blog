import { useTheme } from 'next-themes';
import NextImage from 'next/image'
import { useEffect, useState } from 'react'
export default function Logo(){
    const [mounted ,setMounted] = useState(false);
    const {resolvedTheme} = useTheme()
    useEffect(()=>{
setMounted(true)
    },[])
    if(!mounted){
        return null
    }
    return<NextImage src={resolvedTheme=='dark'?'/2.png':'/1.png'} width={100} height={30}alt='Logo'/>
}