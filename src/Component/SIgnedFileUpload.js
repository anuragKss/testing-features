import React, { useState } from 'react'

const SignedFileUpload = () =>{
    const [images, setImages] = useState([])
    const [uploadingImg, setUploadingImg] = useState(false)
    const [imagePreview, setImagePreview] = useState([])



    const validateImg =(e)=>{
       
        const files = e.target.files
        let curratedFiles = []
        let curratedFilesPreview = []
        console.log('files',Object.values(files))
        Object.values(files)?.forEach(file=>{
             if(file?.size >= 1048576){
            return alert("Max File size is 1mb")
        }else{
            curratedFiles.push(file);
            curratedFilesPreview.push(URL.createObjectURL(file))
        }
        })
        setImages(curratedFiles)
        setImagePreview(curratedFilesPreview)


    }

    const handleUpload = async(e)=>{
        e.preventDefault();
        images.forEach(async (image)=>{
            await uploadImage(image);
        })
    }

    const getPresignedUrl = (data, image) => {
        const url = `https://localhost:5000/s3-signed-url/${image.lastModified}`
        console.log('imageimageimage',image)
        const toSend = {"objectKey":image.name}
        return fetch(url,
        {
            method:"PUT",
            body: JSON.stringify(toSend),
            headers:{
                "Content-Type":'image/jpeg'
            }
        })
        .then((res) => res.json()).then(res=>console.log('resdsdss',res))
    }

    const uploadImage = async (image)=>{
        const data = new FormData();       
            data.append("file", image)
            console.log('imagessss', image)
      
        try {
            getPresignedUrl(data, image)
        } catch (error) {
            console.log('error',error)
        }
        
    }

    // const handleUpload2 = ()=>{
    //     const formData = new FormData();

    //     for(let i=0; i < images.length; i++){
    //         formData.append(`images[${i}]`,images[i])
    //     }
    //     fetch('https://localhost:5000/s3-signed-url',{
    //         method:"PUT",
    //         body:formData
    //     }).then(res=>res.json()).then(data=>console.log('datauploaded',data)).catch(err=>console.log('error',err))
    // }

    return (
        <div style={{display:'flex', justifyContent:'center',alignItems:'center', margin:'0 auto'}}>
            <div className='signup-image'>
                <label className="image-upload" htmlFor='image-upload'>Upload Images</label>
                <input
                    type="file"
                    id='image-upload'
                    multiple
                    hidden
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={validateImg}
                />
                <button className='upload-submit' onClick={handleUpload2}>Submit</button>
                <div style={{width:'60%'}}>
                    {!!imagePreview.length &&  <p>Image Preview</p>}
                    <div className='images-preview'>
                        {!!imagePreview.length && imagePreview.map(image=>{
                            return <img src={image} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignedFileUpload