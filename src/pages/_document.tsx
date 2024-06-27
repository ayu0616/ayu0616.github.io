import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href='https://fonts.googleapis.com' rel='preconnect' />
                <link
                    crossOrigin='anonymous'
                    href='https://fonts.gstatic.com'
                    rel='preconnect'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <body>
                <Main></Main>
                <NextScript></NextScript>
            </body>
        </Html>
    )
}
