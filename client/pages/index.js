import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Fib from '../component/Fib'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fibonacci</title>
      </Head>

      <Fib />
    </div>
  )
}
