import Link from "next/link";
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";
import Head from "next/head";
//SSG
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });
  const data2 = await client.get({endpoint: "categories"});
  return {
    props: {
      blog: data,
      categories: data2.contents
    },
  };
};



export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  };
};

export default function BlogId({ blog ,categories}) {
    
    return (
      <div>
        <Head>
          <title>{blog.title}</title>

        </Head>
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
        
        <main className={styles.main}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <p className={styles.publishedAt}>ホーム&gt;{blog.category.name}</p>
            <div><h3 dangerouslySetInnerHTML={{__html: `${blog.subtitle}`}}  className={styles.subtitle}></h3></div>
            <img src={blog.thumbnail.url} width="800" height="565"/>
            
            <div dangerouslySetInnerHTML={{__html:`${blog.body}`}} className={styles.post}></div>
        </main>
      </div>
    )
}