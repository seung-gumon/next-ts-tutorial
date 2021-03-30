import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    (async () => {
        const response = await fetch('/api/hello');
        const json = await response.json()
        console.log(json);
    })()
}
