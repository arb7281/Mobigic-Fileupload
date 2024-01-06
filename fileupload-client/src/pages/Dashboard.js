import React from 'react'
import FileUpload from '../components/Fileupload'
import { useSelector } from 'react-redux'
import DownloadFile from '../components/DownloadFile'

function Dashboard() {
  const {userData} = useSelector((state) => state.auth)
  return (
    <div className='w-screen h-screen flex flex-col gap-6  items-center text-white text-3xl'>
    Click on file to download
    <FileUpload/>
    <div className='flex flex-col'>
        {
          userData?.userFiles?.map((file, index) =>{
            return <DownloadFile key={index} file={file}/>
          })
        }
    </div>
    
    </div>
  )
}

export default Dashboard