import React from 'react'
import {useState, useEffect} from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const privacy = [
    { value: 0, label:'Private' },
    { value: 1, label:'Public' }
]

const Category = [
    { value: 0, label: "Gaming" },
    { value: 0, label: "Beauty & Fashion" },
    { value: 0, label: "Music" },
    { value: 0, label: "Comedy" },
    { value: 0, label: "Kids" },
    { value: 0, label: "Sports" },
    { value: 0, label: "Tech" },
    { value: 0, label: "Cooking & Health" }
]

function UploadVideoPage() {
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Gaming");
    const [FilePath, setFilePath] = useState("")

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.currentTarget.value);
    }
    
    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value)
    }

    const onSubmit = () => {

    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log(files);
        formData.append("files", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success) {
                let variable = {
                    filePath: response.data.filePath,
                    filenAME: response.data.fileName
                }
                setFilePath(response.data.filePath)
            } else {
                alert('failed to save the video in server')
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />

                        </div>
                    )}
                </Dropzone>
                </div>
                <br/>
                <label>Title</label>
                <Input 
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br/>
                <label>Description</label>
                <TextArea 
                    onChange={handleChangeDescription}
                    value={Description}
                />
                <select onChange={handleChangeOne}>
                    {privacy.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br/>
                <select onChange={handleChangeTwo}>
                    {Category.map((item, index) => (
                        <option key={index} value={item.label}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br/>
                <Button type="primary" size="large" onClick=    {onSubmit}>
                    Upload
                </Button>

            </Form>
        </div>
    )
}

export default UploadVideoPage