import Link from "next/link";

const CustomHeader = () => {
    return (
        <nav>
            <Link href='/'>
                <a>
                    Home
                </a>
            </Link>
            <Link href='/otherpage'>
                <a>
                    Other Page
                </a>
            </Link>
        </nav>
    )
}

export default CustomHeader