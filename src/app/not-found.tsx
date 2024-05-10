import Link from 'next/link'
import { FaExclamationCircle, FaHome } from 'react-icons/fa'

import NavBar from '@/components/Layout/NavBar'

export default function NotFound() {
    return (
        <div className='flex h-dvh flex-col'>
            <NavBar />
            <div className='flex-1 overflow-y-auto scroll-smooth'>
                <div className='p-8 md:p-16'>
                    <div className='flex w-full flex-col items-center justify-center gap-24 rounded-md border bg-white px-8 py-20'>
                        <div // テキストのコンテナ
                            className='space-y-4'
                        >
                            <h1 className='flex gap-4 text-7xl text-emerald-800 md:text-8xl'>
                                <FaExclamationCircle />
                                <span>404</span>
                            </h1>
                            <p className='text-2xl font-bold md:text-3xl'>
                                Page Not Found
                            </p>
                            <p>
                                お探しのページが見つかりませんでした。
                                <br />
                                URLが間違っているか、ページが移動または削除された可能性があります。
                            </p>
                        </div>
                        <Link // ホームに戻るボタン
                            className='flex select-none items-center justify-center gap-2 rounded-full border-2 border-emerald-800 px-10 py-4 text-lg text-emerald-800 transition-colors duration-300 ease-in-out hover:bg-emerald-800 hover:text-white active:bg-emerald-800 active:text-white'
                            href='/'
                        >
                            <FaHome />
                            <span>ホームに戻る</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
