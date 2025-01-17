import React from 'react';
import './collabs.css';
//import rpng from '../Elements/r.png';
import star from '../Elements/star.jpg';
import leaf from '../Elements/image-5.png';
import oval from '../Elements/image-10.png';
const Collab = () => {
    return (
        <div>
           <header>
                 {/* <div className="logo">
                     <img src="2swass.jpg" alt="Logo" />
                 </div>
                 <nav>
                     <ul>
                         <li><a href="#">Home</a></li>
                         <li><a href="#">About Us</a></li>
                         <li><a href="#">Events</a></li>
                         <li><a href="#">Team</a></li>
                         <li><a href="#">Gallery</a></li>
                         <li><a href="#" className="active">Collabs</a></li>
                     </ul>
                 </nav> */}
             </header>
             {/* <hr />  */}
             <>
            
            <div className="collabs-header">
                <div className="container">
                    {/* <div className="circle">
                        <img src={rpng} alt="error" />
                    </div> */}
                    <div className="heading">
                        <h1>COLLABS</h1>
                    </div>
                </div>
                <div className="star1"><img src={star} alt="Star" /></div>
                <div className="star2"><img src={star} alt="Star" /></div>
                <div className="star3"><img src={star} alt="Star" /></div>
                <div className="star4"><img src={star} alt="Star" /></div>
            </div><div className="leaf"><img src={leaf} alt="Leaf" /></div><div className="content">
                <div className="text">
                    <h2>Loren Ipsum</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s... Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit esse, ipsa, perspiciatis itaque quia dicta eveniet in adipisci repellat placeat at, eaque nisi ut assumenda! Facilis dicta a unde nesciunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi ea, vero voluptatum similique corrupti eum minima voluptatem quis ipsa expedita pariatur, dicta exercitationem doloremque debitis autem. Sint veniam quibusdam maxime. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut pariatur ad numquam error! Corrupti saepe totam hic? Atque nihil in cumque id cum fugit iusto tempore assumenda ipsam molestiae.
                         </p>
                </div>
                <div className="shapes">
                    <div className="shape2"></div>
                    <div className="shape1"></div>
                    <div className="shape3"></div>
                    <div className="shape4"></div>
                    <div className="shape5"></div>
                    <div className="shape6"></div>
                    <div className="shape7"></div>
                    <div className="shape8"></div>
                </div>
            </div><div className="leaf2"><img src={leaf} alt="Leaf" /></div><div className="oval"><img src={oval} alt="Oval" /></div></>
        </div>
    );
};

export default Collab;

                        
               