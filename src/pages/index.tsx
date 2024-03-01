import { Link } from 'react-router-dom'

import { SNSIconList } from '../components/SNSIcon/SNSIconList'

export const Index = () => {
    return (
        <div>
            <div>index</div>
            <ul>
                <li>
                    <Link to='/work'>work</Link>
                </li>
                <li>
                    <Link to='/skill'>skill</Link>
                </li>
                <li>
                    <Link to='/blog'>blog</Link>
                </li>
            </ul>
            <div>
                links
                <SNSIconList></SNSIconList>
            </div>
        </div>
    )
}
