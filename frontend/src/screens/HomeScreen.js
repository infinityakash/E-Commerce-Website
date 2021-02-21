import React, { useEffect } from 'react';
import Product from '../components/Product';
// import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
// import data from '../data';  because we actually need to fetch data from backend
function HomeScreen() {
    // const [products, setProducts] = useState([])
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    // Top Selling (Carousal)(53)
    const userTopSellersList = useSelector((state) => state.userTopSellersList);
    const {
        loading: loadingSellers,
        error: errorSellers,
        users: sellers,
    } = userTopSellersList;

    useEffect(() => {
        // dispatch(listProducts());
        dispatch(listProducts({}));// Seller View (51)
        dispatch(listTopSellers());// Top Selling (Carousal)(53)
    }, [dispatch]);
    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         const { data } = await axios.get('/api/products');
    //         setLoading(false);
    //         setProducts(data);
    //     } catch (err) {
    //         setError(err.message);
    //         setLoading(false);
    //     }
    // };
    // fetchData();
    // }, []);
    return (
        // Top Selling (Carousal)(53)
        <div>
            <h2>Top Sellers</h2>
            {loadingSellers ? (
                <LoadingBox></LoadingBox>
            ) : errorSellers ? (
                <MessageBox variant="danger">{errorSellers}</MessageBox>
            ) : (
                        <>
                            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                            <Carousel showArrows autoPlay showThumbs={false}>
                                {sellers.map((seller) => (
                                    <div key={seller._id}>
                                        <Link to={`/seller/${seller._id}`}>
                                            <img src={seller.seller.logo} alt={seller.seller.name} />
                                            <p className="legend">{seller.seller.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </Carousel>
                        </>
                    )}
            <h2>Featured Products</h2>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        // <div className="row center">
                        //     {products.map((product) => (
                        //         <Product key={product._id} product={product}></Product>
                        //     ))}
                        // </div>
                        <>
                            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                            <div className="row center">
                                {products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))}
                            </div>
                        </>
                    )}
        </div>
    );
}

export default HomeScreen;