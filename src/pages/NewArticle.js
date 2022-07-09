import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCreatePostMutation } from "../services/appApi";
import Eth from "../images/Eth.jpg";
import "./NewArticle.css";

function NewArticle() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
    const [uploadingimg, setUploadingimg] = useState(false);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const navigate = useNavigate();

    function handlePublish(e) {
        e.preventDefault();
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const content = draftToHtml(rawContentState);

        if (!title || !image || !content) {
            return alert("Title, content and image required");
        }
        // create article
        createPost({ title, content, image: url });
    }

    function handleEditorChange(state) {
        setEditorState(state);
    }

    function uploadImage(e) {
        e.preventDefault();
        if (!image) return;
        setUrl("");
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "reactmern");
        setUploadingimg(true);
        fetch("https://api.cloudinary.com/v1_1/dhiqlejfy/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUploadingimg(false);
                setUrl(data.url);
            })
            .catch((err) => {
                setUploadingimg(false);
                console.log(err);
            });
    }

    function handleImageValidation(e) {
        const file = e.target.files[0];
        if (file.size > 1048576) {
            setImage(null);
            return alert("File is too big, plase choose image 1mb or less");
        } else {
            setImage(file);
        }
    }

    if (isLoading) {
        return (
            <div className="py-4">
                <h1 className="text-center">Creating your article</h1>
            </div>
        );
    }

    if (isSuccess) {
        setTimeout(() => {
            navigate("/");
        }, 1500);

        return (
            <div>
                <h1 className="text-center">Aricle created with success!</h1>
            </div>
        );
    }

    return (
        <Container>
            <Row>
                <Col md={7}>
                    <Form onSubmit={handlePublish}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                placeholder="Your title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Editor
                            stripPastedStyles={true}
                            editorState={editorState}
                            onEditorStateChange={handleEditorChange}
                            wrapperClassName="wrapper mb-4"
                            editorClassName="editor"
                            toolbarClassName="toolbar"
                        />
                        <Form.Select>
                            <option>Select category</option>
                            <option value="phones">Phones</option>
                            <option value="blockchain">Blockchain</option>
                            <option value="computers">Computers</option>
                            <option value="others">Others</option>
                        </Form.Select>
                        <div>
                            {!url && (
                                <div className="alert alert-info">
                                    Please upload an image before publishing
                                    your post
                                </div>
                            )}
                        </div>
                        <div className="my-4">
                            <input
                                type="file"
                                onChange={handleImageValidation}
                                accept="image/png image/jpeg"
                            />
                            <Button
                                onClick={uploadImage}
                                disabled={uploadingimg || !image}
                            >
                                Upload
                            </Button>
                        </div>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={uploadingimg || !url}
                        >
                            Create Article
                        </Button>
                    </Form>
                </Col>
                <Col
                    md={5}
                    className="d-flex justify-content-center align-items-center"
                >
                    {uploadingimg && (
                        <div className="text-center">
                            <Spinner animation="border" role="status" />
                            <br />

                            <div className="py-2">Uploading Image</div>
                        </div>
                    )}
                    <div>
                        {!url && !uploadingimg && (
                            <img
                                src={Eth}
                                style={{
                                    width: "100%",
                                    minHeight: "80vh",
                                    objectFit: "cover",
                                }}
                                alt="Upload"
                            />
                        )}
                    </div>
                    {url && (
                        <img
                            src={url}
                            style={{
                                width: "100%",
                                minHeight: "80vh",
                                objectFit: "cover",
                            }}
                            alt="cover"
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default NewArticle;
