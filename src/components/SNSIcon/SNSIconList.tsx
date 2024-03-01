import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AtCoder } from './AtCoder'
import { SNSIcon } from './SNSIcon'
import { Twitter } from './Twitter'

export const SNSIconList = () => {
    const className =
        'transition-all duration-500 text-black outline-black outline-1 hover:text-white text-xl hover:outline-4'
    return (
        <div className='flex justify-center gap-2 md:gap-3'>
            <AtCoder
                className={`hover:bg-gray-600 hover:outline-gray-700 ${className}`}
                link='https://atcoder.jp/users/ayu0616'
                name='atcoder'
            />
            <SNSIcon
                className={`hover:bg-gray-600 hover:outline-gray-700 ${className}`}
                icon={
                    <FontAwesomeIcon icon={['fab', 'github']}></FontAwesomeIcon>
                }
                link={'https://github.com/ayu0616'}
                name={'github'}
            />
            <Twitter
                className={className}
                link='https://twitter.com/hassaku_0616'
                name='twitter'
            />
            <SNSIcon
                className={`hover:bg-pink-500 hover:outline-pink-600 ${className}`}
                icon={
                    <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                    ></FontAwesomeIcon>
                }
                link={'https://instagram.com/hassaku_0616'}
                name={'instagram'}
            />
            <SNSIcon
                className={`hover:bg-gray-600 hover:outline-gray-700 ${className}`}
                icon={
                    <FontAwesomeIcon
                        icon={['fab', 'threads']}
                    ></FontAwesomeIcon>
                }
                link={'https://threads.net/@hassaku_0616'}
                name={'threads'}
            />
        </div>
    )
}
