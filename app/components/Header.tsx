import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between w-[90%] border-b border-black m-auto py-5 mb-8'> <Link href="/"><div>実績管理アプリ</div></Link><div>ログイン</div></div>
  )
}

export default Header