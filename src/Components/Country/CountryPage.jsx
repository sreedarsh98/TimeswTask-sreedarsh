// CountryPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountriesByFilter } from "../../redux/slice/countrySlice";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaBars } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "../Footer";
import "./CountryPage.css";

const filters = ["All", "Asia", "Europe"];

const CountryPage = () => {
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.country);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCountriesByFilter(selectedFilter));
    setVisibleCount(8);
  }, [dispatch, selectedFilter]);

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <Container className="countries-page">
      {/* Header */}
      <Row className="align-items-center justify-content-between mb-3">
        <Col>
          <h5 className="logo">Countries</h5>
        </Col>
        <Col className="text-end menu d-none d-md-block">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="link"
              className={`filter-btn ${selectedFilter === filter ? "active" : ""}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </Col>
        <FaBars
          className="menu-icon d-md-none"
          onClick={() => setIsMenuOpen(true)}
          style={{ cursor: "pointer", fontSize: "24px", marginLeft: "1rem" }}
        />
      </Row>

      <h2 className="welcome-heading">
        <span>WELCOME</span>
      </h2>

      <Row className="mb-4 g-3 main-row">
        <Col md={9} className="side-frame order-2 order-md-1">
          <div className="h-100 side-frame-col">
            <Swiper
              loop={true}
              pagination={{ el: ".custom-pagination", clickable: true }}
              navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
            </Swiper>
            <div className="custom-swiper-nav">
              <button className="custom-prev"><FaArrowLeft /></button>
              <div className="custom-pagination"></div>
              <button className="custom-next"><FaArrowRight /></button>
            </div>
          </div>
        </Col>
        <Col md={3} className="side-frame order-1 order-md-2">
          <div className="h-100 side-frame-col">
            <div className="frame-placeholder">Frame</div>
          </div>
        </Col>
      </Row>

      <Row className="second-row">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          countries.slice(0, visibleCount).map((country, idx) => (
            <Col md={6} key={idx} className="mb-4">
              <Card className="country-card">
                <div className="flag-placeholder">
                  <img src={country.flag} alt={country.name} className="img-fluid" />
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">{country.name}</Card.Title>
                  <Card.Text>{country.region}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {!loading && visibleCount < countries.length && (
        <div className="text-center my-4">
          <Button className="load-more-btn" onClick={loadMore}>Load more</Button>
        </div>
      )}

      <Footer />

      {isMenuOpen && (
        <div className="mobile-sidebar">
          <div className="sidebar-backdrop" onClick={() => setIsMenuOpen(false)} />
          <div className="sidebar-content">
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>×</button>
            <div className="sidebar-links">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant="link"
                  className={`filter-btn ${selectedFilter === filter ? "active" : ""}`}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setIsMenuOpen(false);
                  }}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CountryPage;
