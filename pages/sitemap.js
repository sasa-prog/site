import {client} from "../libs/client"


export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "blog" });
    
    return {
      props: {
        blogs: data.contents
      },
    };
};

class Post {
    id = "";
    publishedAt = "";

    constructor (id,publishedAt) {
        this.id = id;
        this.publishedAt = publishedAt;
    }
}

function generateSitemap(posts, location){
    let xml = ""

    posts.map(post=>{
        const postDate = new Date(post.publishedAt).toISOString().split("T")[0]
        const postUrl = location + post.id


        xml += `<url>
        <loc>${postUrl}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
        </url>`
    })


    return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${xml}
            </urlset>`
}



export default function sitemap({ blogs }) {
    let posts = new Array()
    blogs.map(blog =>{
        const post = new Post(blog.id, blog.publishedAt)
        posts.push(post)
    })

    return generateSitemap(posts,"https://sasa-blog.web.app/")
}