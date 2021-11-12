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
            <model-viewer alt="FILL THIS IN FROM FORM DATA" src={post.modelUrl}  seamless-poster shadow-intensity="1" camera-controls></model-viewer>
            <model-viewer camera-controls alt="A 3D model of an astronaut" ar ios-src={post.iosModelUrl}>
            </model-viewer>
            </aside>
            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    );
}