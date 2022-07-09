import React from "react";
import { Col, Container, Row, Spinner, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ArticlePreview from "../components/ArticlePreview";
import MainArticle from "../components/MainArticle";
import { useGetPostQuery } from "../services/appApi";

function Home() {
    const { data: articles, isLoading, isError } = useGetPostQuery();
    const sidebarArticles = articles?.slice(-4) || [];
    console.log(sidebarArticles);
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
    console.log(articles);
    return (
        <Container>
            <div className="banner">
                <h1 className="banner_title">TECHNOLOGY BLOG</h1>
            </div>
            <Row>
                <MainArticle article={articles[articles.length - 1]} />
                <Col md={9} className="blog-main d-flex pb-4 flex-wrap gap-4">
                    {articles.map((article, idx) => (
                        <ArticlePreview article={article} key={idx} />
                    ))}
                </Col>
                <Col md={3} className="blog-sidebar py-4">
                    <ListGroup variant="flush">
                        <h2>Latest articles</h2>
                        {sidebarArticles.map((article, idx) => (
                            <LinkContainer
                                to={`/articles/${article.id}`}
                                key={idx}
                            >
                                <ListGroup.Item>{article.title}</ListGroup.Item>
                            </LinkContainer>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
