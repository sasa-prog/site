import styles from '../styles/nav.module.scss'

import Link from 'next/link';

export default function Nav({ categories }) {
    return (
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link href="/">
                <a href="" className={styles.a}>ホーム</a>
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id} className={styles.li}>
                <Link href={`/category/${category.id}`}>
                  <a href="" className={styles.a}>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
    )
}