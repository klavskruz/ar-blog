import Link from "next/link";
import ReactMarkdown from "react-markdown";

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
            <a href={post.modelUrl} rel='ar' target='_blank'>AR SHOULD SHOW UP HERE</a>
            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    );
}