import { useNavigate } from 'react-router-dom';
import "../index.css";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main>
         
        <section className="section-hero ">
          <div className="container">
          
            <div className="hero-content">
              <p className="brief">Your ultimate resource.</p>
              <h1>
                Welcome to Techno<br />Shankar
              </h1>
              <p>
              Are you ready to dive into the world of technology? Our blog features articles, tutorials, and guides 
              tailored to help you navigate the complexities of IT and improve your skills.
              </p>
              
              <div className="btn-group">
                <button className="btn" onClick={() => navigate('/contact')}>
                  Connect Now
                </button>
                <button className="btn secondary-btn" onClick={() => navigate('/service')}>
                  Learn More
                </button>
              </div>
            </div>
            {/* Hero Image */}
            <div className="hero-image">
              <img
                src="/images/coding.png"
                alt="coding together"
                width={500}
                height={500}
              />
            </div>
            
          </div>
        </section>
      </main>
    </>
  );
};
