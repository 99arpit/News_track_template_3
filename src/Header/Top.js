import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addUser } from "../redux/slices/UserSlice";
import { Link } from "react-router-dom";


const Top = ({ page_name }) => {


  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ad, setAd] = useState();

  const fetchAd = async () => {
    try {
      const response = await axios.get(`http://174.138.101.222:8080/${id}/${page_name}/Topbar/get-Advertisement`)
      // console.log(response.data.data[0])
      setAd(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAd();
  }, [id, page_name])

  const agencyDetails = useSelector((state) => {
    return state.User;
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://174.138.101.222:8080/${id}/get-publication-details`
      );
      dispatch(addUser(response.data.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
  if (!agencyDetails._id) {
    fetchData();
  }




///////////////////////////////////////get categories///////////////////////////////////////////////////////

const [categories, setCategory] = useState();
const getCategories = async () => {
  try {
    const response = await axios.get(
      "http://174.138.101.222:8080/getmastercategories"
    );
    // console.log(response.data.data, "categories");
    setCategory(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getCategories();
}, []);


///////////////////////////////////////get categories///////////////////////////////////////////////////////






  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tb-contact">
                <p>
                  <i className="fas fa-envelope" />
                  info@mail.com
                </p>
                <p>
                  <i className="fas fa-phone-alt" />
                  +012 345 6789
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tb-menu">
                <a href="">About</a>
                <a href="">Privacy</a>
                <a href="">Terms</a>
                <a href="">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <!-- Brand Start --> */}
      <div style={{marginBottom:"56px"}}>
      <div class="brand" >
        <div class="container" >
          <div className="row ">
            <div className="col-sm-4">
              <div style={{ marginLeft: "13px" }}>
                <div class="b-logo" style={{ marginRight: "115px" }}>
                  <a href="/">
                    <img style={{ width: "140%",height:'100%' }}
                      src={`http://174.138.101.222:8080${agencyDetails.logo_small}`} alt="Logo" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div style={{width:'100%'}}>
                <a href="/">
                  <img style={{ width: "110%",height:'100%' }} src={`http://174.138.101.222:8080${ad?.image}`} alt="Ads" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>


      {/* <!-- Nav Bar Start -->         */}

      <div className="nav-bar" style={{marginBottom:"20px"}}>
        <div className="container">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a href="#" className="navbar-brand">
              MENU
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto">
                <a href="index.html"  className="nav-item link"  style={{
                        color: "white",
                        textDecoration: "none",
                        marginRight: "15px",
                        paddingTop:'1%',
                        paddingBottom:'1%'
                      }}>
                  Home
                </a>
               
                <a href="single-page.html" className="nav-item link"  style={{
                        color: "white",
                        textDecoration: "none",
                        marginRight: "15px",
                        paddingTop:'1%',
                      }}>
                  Single Page
                </a>
                <a href="contact.html"  className="nav-item link"  style={{
                        color: "white",
                        textDecoration: "none",
                        marginRight: "15px",
                        paddingTop:'1%',
                      }}>
                  Contact Us
                </a>
                <div  style={{paddingTop:'1%'}}>
                 
                   <a>
              {categories &&
                categories.map((item, index) => {
                  return (
                    <Link href="single-page.html" className="nav-item link"
            
                      style={{
                        color: "white",
                        textDecoration: "none",
                        marginRight: "20px",
                      }}
                      to={`/${agencyDetails._id}/Category/${item.categories_Name_Url}`}
                      state={agencyDetails}
                      key={index}
                      // className="nav-link"

                      // className="dropdown-item"
                    >
                      {item.categories_Name_English}
                    </Link>
                  );
                })}
            </a>
                </div>
              </div>
              <div className="social ml-auto">
                <a href="">
                  <i className="fab fa-twitter" />
                </a>
                <a href="">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="">
                  <i className="fab fa-instagram" />
                </a>
                <a href="">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>


    </>


  )
}

export default Top
