import React from "react";
import Navbar from "./navbar";
import AboutUs from "./aboutus";
import ContactUs from "./contactus";
import Footer from "./footer";

export const Home = () => {
  return (
    <section>
      <div>
        <Navbar />
        <img
          src="/banner.png"
          alt="Banner"
          style={{ width: "100%", maxHeight: "875px" }}
        />
      </div>
      <AboutUs />
      <ContactUs />
      <Footer />
    </section>
  );
};

// function Home(){
//     return <h1>Home</h1>;
// }

export default Home;
