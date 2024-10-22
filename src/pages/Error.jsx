import { useNavigate } from 'react-router-dom';
import "../index.css";

export const Error = () => {
    const navigate = useNavigate();
    return (
        <>
            <section id="error-page">
                <div className=" content">
                    <h1 className="header">404</h1>
                    <h4>Sorry! Page not found</h4>
                    <p className='container'>
                        Oops! It seems like the page your're trying to access doesn't exist. 
                        If you believe there's an issue, feel to report it, and we'll look into it.
                    </p>
                    <div className="btn-group container">
                <button className="btn" onClick={() => navigate('/')}>
                  Return Home
                </button>
                <button className="btn secondary-btn" onClick={() => navigate('/contact')}>
                Report Problem
                </button>
              </div>
                </div>
            </section>
        </>
           )

}