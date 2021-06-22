import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trunk Mini</title>
        <meta name="description" content="offline-first collaborative reference manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <div className={styles.logo}>🧳</div>
          <Link href="/workspace">
            <a>Trunk Mini</a>
          </Link>
        </h1>

        <p className={styles.description}>
          offline-first collaborative reference manager
        </p>
        <code className={styles.code}>alpha</code>


      </main>

      <footer className={styles.footer}>
        <Link href="http://jellypbc.com">
          <a>Produced by Jelly Public Benefit Corporation</a>
        </Link>
      </footer>
    </div>
  )
}
