import Link from "next/link";
import Head from "next/head";
import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";

import Nav from '../components/Nav';
import ConvertDate from '../components/convert-date'

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';

//SSG
export const getStaticProps = async () => {
  const blog_data = await client.get({ endpoint: "blog" });
  const categories_data = await client.get({endpoint: "categories"});
  return {
    props: {
      blog: blog_data.contents,
      categories: categories_data.contents
    },
  };
};

export default function Home({ blog,categories }) {
  
  return (
    <div>
      <Head>
          <title>SASA-Blog</title>
          <meta name="google-site-verification" content="EZOA_KmNa7DBPlLSRxKRch0r_fLXTq7M19L9cIcBtJI" />
	        <meta name="description" content="プログラミングなどの情報を発信するブログサイト。" />
        </Head>
      <header>
        <Nav categories={categories}/>
      </header>
      <div>
      {blog.map((blog) => (
        
            <article className={styles.postCard} key={blog.id}>
              <Link href={`blog/${blog.id}`} >
                    <img src={blog.thumbnail.url} with="320" height="240" className={styles.thumbnailBlock}/><br/>
                    <h4 className={styles.thumbnailTitle}>{blog.title}</h4><br/>
                    <span className={styles.publichedAt}><FontAwesomeIcon icon={faClock} size="lg" color="#aaaaaa" /><ConvertDate dateISO={blog.publishedAt} /></span>
              </Link>
            </article>
        
        ))}
      </div>
    </div>
  );
}