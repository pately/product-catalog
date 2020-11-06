import React, { useState, useEffect } from 'react';
import { Card, Button, Carousel, Container } from 'react-bootstrap';

import axios from 'axios';

const ContentTable = () => {
    const [products, setProducts] = useState([]);


    const getProducts = async () => {
        try {
            const headers = {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Credentials': true
            };
            const resp = await axios.get('/dm-products/products',
                { headers },
                { crossdomain: true });

            //console.log(resp.data);

            let products = resp.data;
            console.log(products);
            setProducts(() => {
                return products;
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
            <Container fluid>

                <div className='row'>
                    {products.map((product) =>
                        <div class='col-md-4 d-flex align-items-stretch'>

                            <Card bg="light" text="black" style={{ width: '18rem', display: 'inline-block'}}>
                                <Carousel>
                                    {product.images.map((image, index) =>
                                        // <Card.Img variant="top" src={ image } />
                                        <Carousel.Item>
                                            <img
                                                variant="top"
                                                className="d-block w-100 "
                                                src={image}
                                                alt={index}
                                                 />
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                                <Card.Body>
                                    <Card.Title>{product.brand}</Card.Title>
                                    <Card.Text>
                                        <h3>{product.product}</h3>
                                        <ul>
                                            {product.produktbeschreibung.map((produkt) =>
                                                <li>{produkt}</li>
                                            )}
                                        </ul>
                                    </Card.Text>
                                    <Button variant="primary">{product.digit}.{product.cent} {product.currency}</Button>
                                </Card.Body>
                            </Card>

                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};
export default ContentTable;