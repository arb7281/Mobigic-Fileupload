import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../services/operations/fileUploadApi';


const FileUpload = () => {
    const [fileSelected, setFileSelected] = useState(null);
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=> state.auth)

    function handleFileChange (event){
        const file = event.target.files[0];
        setFileSelected(file);
    }

    function handleUpload(){
        dispatch(uploadFile(fileSelected, userData))
        
    }


  return (
    <div className='flex items-center gap-2'>
    
        <input type='file' onChange={handleFileChange} 
        className="block w-full border cursor-pointer border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500
         focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700
          dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
           file:bg-gray-50 file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" id="large_size"/>
        <button onClick={handleUpload} className='py-3 px-6 me-2  text-sm font-medium
         text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200
          hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
           focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
            dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
             dark:hover:bg-gray-700'>Upload</button>
    </div>
  )
}

export default FileUpload
