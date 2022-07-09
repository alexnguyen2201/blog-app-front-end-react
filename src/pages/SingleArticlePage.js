import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useGetOnePostQuery } from "../services/appApi";
import { useParams } from "react-router-dom";

function SingleArticlePage() {
    const { id } = useParams();
    const { isLoading, data: article, isError } = useGetOnePostQuery(id);

    if (isError) {
        return (
            <div>
                <h1 className="text-center">An error has occured</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    console.log(article);

    return (
        <Container>
            <Row>
                <Col md={8} sytle={{ margin: "0 auto" }}>
                    <img
                        src={article.image}
                        style={{
                            width: "100%",
                            maxHeight: "400px",
                            objectFit: "cover",
                        }}
                        alt="an img"
                    />
                    <h1>{article.title}</h1>
                    <div>By {article.creator.email}</div>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default SingleArticlePage;
