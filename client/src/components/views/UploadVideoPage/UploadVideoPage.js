import React from 'react'
import {useState, useEffect} from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UploadVideoPage() {
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animination");
    const [FilePath, setFilePath] = useState("")

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.currentTarget.value);
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form>
                <Dropzone 
                    
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
                <label>Title</label>
                <Input 
                    onChange={handleChangeTitle}
                    value={title}
                />
                <label>Description</label>
                <TextArea 
                    onChange={handleChangeDescription}
                    value={Description}
                />

                <Button type="primary" size="large">
                    Upload
                </Button>
            </Form>
            {/* <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone onDrop={onDrop}
                    multiple={false}
                    maxSize={80000000000}
                </div>
            </Form> */}
        </div>
    )
}

export default UploadVideoPage