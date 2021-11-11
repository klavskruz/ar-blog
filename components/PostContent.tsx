import Link from "next/link";
import ReactMarkdown from "react-markdown";
import '@google/model-viewer/lib/model-viewer.js'


declare global {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> ;
      }
    }
  }
  
  interface ModelViewerJSX {
    'src'?: string,
     ar,
    'ar-modes'?: string,
    'ar-scale'?: string,
    'ar-placement'?: string,
    'ios-src'?: string,
    'xr-environment'?: string,
    'alt'?:string

  }


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
            <model-viewer alt="A 3D model of an astronaut" ar ios-src={post.modelUrl}>
                MODEL IS HERE
            </model-viewer>
            </aside>
            <ReactMarkdown>{post?.content}</ReactMarkdown>
        </div>
    );
}