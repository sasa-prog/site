import {NextApiRequest, NextApiResponse} from "next";
import {client} from "../../libs/client"

type post ={
    id: string,
    publishedAt: string
}

const generateSitemap = (posts: post[], location: string): string =>{
    let xml = ""

    posts.map(post=>{
        const postDate: string = new Date(post.publishedAt).toISOString().split("T")[0]
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

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "blog" });
    
    return {
      props: {
        blogs: data.contents
      },
    };
  };

export default function sitemap({blogs}) {
    let posts:post[] = new Array()
    blogs.map(blog =>{
        const post:post ={
            id: blog.id,
            publishedAt: blog.publichedAt
        } 
        posts.push(post)
    })

    return generateSitemap(posts,"https://sasa-blog.web.app/")
}