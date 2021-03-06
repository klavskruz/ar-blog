import { useState } from "react";
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import Loader from "./Loader";




export default function ImageUploader(){
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    // Creates a Firebase Upload Task

    const uploadFile = async (e) => {
        // Get the file
        const file = Array.from(e.target.files)[0] as Blob | Uint8Array | ArrayBuffer;
        const extension = file['type'].split('/')[1];

        // Makes reference to the storage bucket location
        const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${file}`);
        setUploading(true);

        // Starts the upload
        const task = ref.put(file);
        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            setProgress(Number(pct))

            // Get downloadURL AFTER taskr resolves
            task
                .then((d) => ref.getDownloadURL())
                .then((url) => {
                    setDownloadURL(url);
                    setUploading(false);
                })
        });
    }

    return(
        <div className='box'>
            <Loader show={uploading}/>
            {uploading && <h3>{progress}%</h3>}
            {!uploading && (
                <>
                <label className='btn'>
                    📷 Upload Img
                    <input type='file' onChange={uploadFile} accept='image/x-png,image/gif,image/jpeg,model/usdz'/>
                </label>
                </>
            )}
            {downloadURL && <>
            <code className='upload-snippet'>{`${downloadURL}`}</code>
            </>
            }
            
        </div>
    )
}