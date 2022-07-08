import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function MainArticle({ article }) {
    const { title, image, content, _id } = article;

    return (
        <Row className="pb-4">
            <Col md={6} className="main-article__image-container">
                <img src={image} />
            </Col>
            <Col md={6}>
                <h2>{title}</h2>
                <div
                    dangerouslySetInnerHTML={{
                        _html: content.substring(0, 200),
                    }}
                />
                <LinkContainer to={`/articles/${_id}`}>
                    <Button variant="info">Read More</Button>
                </LinkContainer>
            </Col>
        </Row>
    );
}

export default MainArticle;
