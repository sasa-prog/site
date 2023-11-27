import styles from '../styles/nav.module.scss'

import Link from 'next/link';

export default function Nav({ categories }) {
    return (
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link href="/" className={styles.a}>ホーム</Link>
            </li>
            {categories.map((category) => (
              <li key={category.id} className={styles.li}>
                <Link href={`/category/${category.id}`} className={styles.a}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
    )
}