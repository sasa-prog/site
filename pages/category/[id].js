import Head from "next/head";
import Link from "next/link";
import {client} from "../../libs/client";
import Article from "../../libs/articleBlog";
import styles from "../../styles/Home.module.scss";
import Nav from "../../components/Nav";

//SSG
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({endpoint: "categories", contentId: id});
    const data2 = await client.get({endpoint: "categories"});
	const data3 = await client.get({endpoint: "blog"});
    return {
        props: {
            category1:data,
            categories: data2.contents,
			blogs: data3,
        },
    }
};

export const getStaticPaths = async () => {
    const data = await client.get({endpoint: "categories"});
    const paths = data.contents.map((content) => `/category/${content.id}`);
    return {
        paths,
        fallback:false,
    };
};

export default function CategoryId({ category1, categories, blogs }) {
	var categoriedBlog = [];
	var isEmpty = false;
	blogs.contents.map(function(blog){
		if (category1.id == blog.category.id) {
			categoriedBlog.push(blog);
		}
	});
	if (categoriedBlog.length == 0) {
		isEmpty = true;
	}
    return (
        <div>
			<Head>
	    		<title>{category1.name} -SASA-Blog</title>
			</Head>
			<header>
				<Nav categories={categories}/>
			</header>
			
			<main className={styles.main}>
		    	<h1 className={styles.title}>{category1.name}</h1>
				<Article categoriedBlog={categoriedBlog} isEmpty={isEmpty}></Article>
			</main>
        </div>
    );
};