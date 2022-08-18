import Link from "next/link";
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
      <nav className={styles.nav}>
        <ul className={styles.ul}>
        {categories.map((category) => (
            <li key={category.id} className={styles.li}>
              <Link href="">
                <a href="" className={styles.a}>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>
            <a href="">{blog.title}</a>
          </Link>
        </li>
      ))}
    </div>
  );
}