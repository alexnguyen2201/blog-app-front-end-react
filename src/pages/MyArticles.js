import React from "react";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import { useGetUserPostQuery } from "../services/appApi";
import ArticlePreview from "../components/ArticlePreview";

function MyArticles() {
    const { data: userArticle, isLoading, isError } = useGetUserPostQuery();
    if (isError) {
        return (
            <div>
                <h1 className="text-center">An error has occured</h1>
            </div>
        );
    }
    console.log(userArticle);
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }
    if (userArticle.length === 0) {
        return (
            <div>
                <h1 className="text-center">You don't have any articles!</h1>
            </div>
        );
    }
    return (
        <Container>
            <h1 className="text-center">My Articles</h1>
            <Row>
                <Col
                    md={9}
                    className="d-flex justify-content-center flex-wrap gap-4"
                >
                    {userArticle.map((artcile, idx) => (
                        <ArticlePreview
                            key={idx}
                            article={artcile}
                            currentUserPost={true}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default MyArticles;
