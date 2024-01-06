import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile } from '../services/operations/deletefileApi';
import axios from 'axios';
import toast from 'react-hot-toast';

const DownloadFile = ({file}) => {
  
    const [showCodePrompt, setShowCodePrompt] = useState(false);
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.auth)

    const userId = userData._id;
    console.log("userData", userData);
    const fileId = file._id;

    
    const fileUrl = `${file.fileUrl}`;
    const fileName = file.fileName;

    const url = `http://localhost:4000${file.fileUrl}${fileId}/${code}/${fileName}`
    const handleCodeChange = (event) => {
      setCode(event.target.value);
    };
  
    const handleCodeSubmit = async () => {
      if (code.length === 6) {
        try {
        await axios({
            url:url,
            method: 'GET',
            responseType: 'blob',
          }).then((response)=> {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            console.log("printing response from server", response)
          })
                   
        } catch (error) {
          console.error('Error downloading file:', error);
          toast.error("Code is invalid")
        }
      }
        
        
        else {
          toast.error("Please enter valid code")
        }

      
    };

    function handleDelete() {
      dispatch(deleteFile(fileName, userId, fileId))
    }
  
    return (
      <div className='flex gap-2'>
        <a
          onClick={() => setShowCodePrompt(!showCodePrompt)} 
          className="text-blue-600 underline decoration-gray-800 hover:opacity-80 dark:decoration-white cursor-pointer"
        >
          { file.fileName}
        </a>
        {showCodePrompt && (
          <div className='relative flex gap-2'>
            <input
              type="test"
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter 6-digit code"
              className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm
                     focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 
                     dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
            />
              <div class="absolute inset-y-0  start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
              </div>
            <button onClick={handleCodeSubmit}
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-gray-400
                         dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Submit</button>            
            </div>          
        )}
        <button onClick={handleDelete}
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
                       bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none 
                       dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"        
        >Delete</button>
      </div>
    );
  }

export default DownloadFile