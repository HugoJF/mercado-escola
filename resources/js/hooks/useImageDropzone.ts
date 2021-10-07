import {useState} from 'react';
import {useDropzone} from "react-dropzone";
import {FileWithPreview} from "@type/forms";

export default function useImageDropzone() {
    const [uploadingFiles, setUploadingFiles] = useState<FileWithPreview[]>([]);

    const dropzone = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const filesWithPreview = acceptedFiles.map(file => ({
                file: file,
                preview: URL.createObjectURL(file)
            }));
            setUploadingFiles([...uploadingFiles, ...filesWithPreview]);
        }
    });

    function removeFile(remove: FileWithPreview) {
        const removedFiles: FileWithPreview[] = [];
        const filteredFiles: FileWithPreview[] = [];

        uploadingFiles.forEach(file => {
            if (file.file.name === remove.file.name) {
                removedFiles.push(file);
            } else {
                filteredFiles.push(file);
            }
        });

        for (const file of removedFiles) {
            URL.revokeObjectURL(file.preview);
        }

        setUploadingFiles(filteredFiles);
    }

    return {dropzone, uploadingFiles, setUploadingFiles, removeFile}
}
