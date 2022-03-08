import Link from 'next/link';
import Head from 'next/head';
const page = (props) => {
    return (
        <div>
        <Head>
            <title>other page</title>
        </Head>
        <p>
            I'm some other Page!
        </p>
        <Link href='/'>
            <a>
                Go Back Home!
            </a>
        </Link>
        </div>
    )
}

export default page;