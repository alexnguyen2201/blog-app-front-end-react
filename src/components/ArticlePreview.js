import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Eth from "../images/Eth.jpg";

function ArticlePreview({ article }) {
    const { title, content, image, _id, creator } = article;

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img
                variant="top"
                src={image || Eth}
                style={{ maxHeight: 200, objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <div
                        dangerouslySetInnerHTML={{
                            _html: content.substring(0, 100) + "...",
                        }}
                    />
                </Card.Text>
                <LinkContainer to={`/articles/${_id}`}>
                    <Button variant="primary">View</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
}

export default ArticlePreview;
