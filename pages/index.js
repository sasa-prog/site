import Link from "next/link";
import Head from "next/head";
import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";

//SSG
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  const data2 = await client.get({endpoint: "categories"});
  return {
    props: {
      blog: data.contents,
      categories: data2.contents
    },
  };
};

export default function Home({ blog,categories }) {
  
  return (
    <div>
      <Head>
          <title>SASA-Blog</title>
          <meta name="google-site-verification" content="EZOA_KmNa7DBPlLSRxKRch0r_fLXTq7M19L9cIcBtJI" />
        </Head>
      <header className={styles.nav}>
      <nav>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/">
              <a href="" className={styles.a}>ホーム</a>
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className={styles.li}>
              <Link href="">
                <a href="" className={styles.a}>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav></header>
      <div>
      {blog.map((blog) => (
        
            <article className={styles.postCard} key={blog.id}>
              <Link href={`blog/${blog.id}`} >
                <a href="">
                    <img src={blog.thumbnail.url} with="320" height="240" className={styles.thumbnailBlock}/><br/>
                    <h4 className={styles.thumbnailTitle}>{blog.title}</h4><br/>
                    <span>{blog.publishedAt}</span>
                </a>
              </Link>
            </article>
        
        ))}
      </div>
    </div>
  );
}