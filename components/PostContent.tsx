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
            <model-viewer alt="FILL THIS IN FROM FORM DATA" src={post.modelUrl} ios-src={post.iosModelUrl} ar ar-modes="webxr scene-viewer quick-look"  seamless-poster shadow-intensity="1" camera-controls></model-viewer>
            </aside>
            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    );
}