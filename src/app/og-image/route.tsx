import { ImageResponse } from 'next/og'

import '@/app/index.scss'

const alt = 'OGP画像'
const size = {
    height: 630,
    width: 1200,
}
const contentType = 'image/png'

export const GET = async (req: Request) => {
    return new ImageResponse(
        <div
            style={{
                ...size,
                alignItems: 'center',
                background: '#065f46',
                display: 'flex',
                justifyContent: 'center',
                padding: '50px 0',
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    background: 'white',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '72px', fontWeight: 'bold' }}>
                        はっさくゼリー製造工場
                    </h1>
                    <p style={{ fontSize: '32px' }}>
                        食品の製造販売等は行っておりません
                    </p>
                </div>
            </div>
        </div>,
        {
            ...size,
            headers: {
                'Content-Type': contentType,
            },
        },
    )
}
