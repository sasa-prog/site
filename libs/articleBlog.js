import Link from "next/link";
import styles from "../styles/Home.module.scss";

const articleBlog = (props)=> {
    if (props.isEmpty) {
        return (
            <h4>このカテゴリーには記事がありません。</h4>
        );
    }else {
        return (
            <>
                {props.categoriedBlog.map((blog) => (
			        <article className={styles.postCard} key={blog.id}>
				    <Link href={`/blog/${blog.id}`}>
					    <a href="">
						    <img src={blog.thumbnail.url} with="320" height="240" className={styles.thumbnailBlock}/><br/>
                    	    <h4 className={styles.thumbnailTitle}>{blog.title}</h4><br/>
                    	    <span>{blog.publishedAt}</span>
					    </a>
				    </Link>
			        </article>
		        ))}
            </>
        )
    }
};

export default articleBlog;