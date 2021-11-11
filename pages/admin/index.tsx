import AuthCheck from "../../components/AuthCheck";
import styles from '../../styles/Admin.module.css'
import { PostFeed } from "../../components/PostFeed";
import { firestore,auth, serverTimestamp } from "../../lib/firebase";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from 'lodash.kebabcase'
import toast from "react-hot-toast";
import { UserContext } from "../../lib/context";
import { redirect } from "next/dist/server/api-utils";



export default function AdminPostsPage(props){

    return(
        <main>
            <AuthCheck>
                <PostList />
                <CreateNewPost />
            </AuthCheck>
        </main>
    )
}

function PostList() {
    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
        <h1>Manage your Posts</h1>
        <PostFeed posts={posts} admin />

        </>
    )
}


function CreateNewPost() {
    const router = useRouter();
    const {username} = useContext(UserContext);
    const [title, setTitle] = useState('');

    // Ensure slug URL is safe
    const slug = encodeURI(kebabCase(title));

    // Validate length
    const isValid = title.length > 3 && title.length < 100;

    // Create a new post in Firestore
    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: '# hello world',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0
        };

        await ref.set(data);

        toast.success('Post created');

        // Imperative navigation after doc is set
        router.push(`/admin/${slug}`);

    };

    return (
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='My awesome article'
                className={styles.input}/>
                <p>
                    <strong>Slug:</strong> {slug}
                </p>
                <button type='submit' disabled={!isValid} className='btn-green'>
                    Create New Post
                </button>
        </form>
    )


}