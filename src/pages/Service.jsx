import "../index.css";

import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();

  return (
    <>
        {/* <section className="Blog">
          <div className="frontOne">
          <div className="latest">
            <div className="image"> 
              
            </div>
            <div className="details"></div>
          </div>
          <div className="collection">
              
              <div className="blog-card Trend">
                <div className="image">
                   
                </div>
                <div className="detail">
                  <h1>hello</h1>
                </div>
              </div>
              <div className="blog-card Trend"></div>
              <div className="blog-card Trend"></div>
              <div className="blog-card Trend"></div>
          </div>
          </div>
            <div className="frontTwo">
              <div className="blog-card hot"></div>
              <div className="blog-card hot"></div>
              <div className="blog-card hot"></div>
              <div className="blog-card hot"></div>
              <div className="blog-card hot"></div>
             
            </div>
        </section> */}
      <main className="services-page">
        <section className="services-hero">
          <div className="container">
                             <div className="login-image">
                                <img src="/images/service.png"
                                    alt="a girl and a boy trying to register"
                                    width="500" height="400" />
                            </div>
              <div className="login-form">
              <p>
              At <b>Techno Shankar</b>, we provide a variety of services to help you grow your blog, improve your online presence, and engage your audience. Explore our services below.
            </p>
              </div>
            
          </div>
        </section>

        <section className="services-list">
          <div className="container grid grid-two-cols">
            {services && services.length > 0 ? (
              services.map((currentElement, index) => {
                const { price, provider, service, description } = currentElement;

                return (
                  <div className="service-card" key={index}>
                    <div className="login-image">
                      <img src={`/images/coding together.png`} alt={service}  width={400}/>
                    </div>

                    <div className="card-details">
                      <div className="grid grid-two-cols">
                        <p>{provider}</p>
                        <p>{price} Rupee</p>
                      </div>
                      <h2>{service}</h2>
                      <p>{description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No services available at the moment.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
