import Link from "next/link";
import ReactMarkdown from "react-markdown";
require("@google/model-viewer/dist/model-viewer")

export function PostContent({post}) {
    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();


    return(
        <div className='card'>
            <h1>{post?.title}</h1>
            <span className='text-sm'>
                Written by{' '}
                <Link href={`/${post.username}/`}>
                <a className='text-info'>@{post.username}</a>
                </Link>{' '}
                on {createdAt.toISOString()}
            </span>
            <aside>
            <model-viewer alt="FILL THIS IN FROM FORM DATA" src={post.modelUrl}  seamless-poster shadow-intensity="1" camera-controls ar ios-src={`https://firebasestorage.googleapis.com/v0/b/all-solar-admin.appspot.com/o/uploads%2F47164X2tPbWVjQr0gfI61FNchTF3%2F1636716956735.%5Bobject%20File%5D?alt=media&token=0a80a06b-e0e7-462a-b4c9-574c0cbe0c19`} xr-environment ></model-viewer>
            </aside>
            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    );
}