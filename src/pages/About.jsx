import React from 'react';
import "../index.css";
import "./About.css";
import { useAuth } from "../store/auth";

export const About = () => {
    const { user } = useAuth();

    return (
        <main className="about-page">
            <section id="frs" className="about-hero">
                <div className="container">
                    <div className="about-image">
                        <img
                            src="/images/about.jpg"
                            alt="Our Team"
                            width={500}
                            height={500}
                            style={{ filter: "brightness(1) contrast(1)" }}
                        />
                    </div>
                    <div className="intro-text">
                        <h1>Welcome,<br />{user ? user.username : `to our website`}</h1>
                        <p>
                            We're excited to have you here. Our platform is designed to help creators like you share your insights, experiences, and passions with the world. Whether you're new to blogging or a seasoned writer, your voice matters here.
                        </p>
                    </div>
                </div>
            </section>
            <section className="about-details">
                <div className="container">
                    <div className="about-content">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to create a platform that connects readers with valuable, engaging, and insightful content. We believe in the power of words and stories, and we aim to foster a community where ideas, opinions, and knowledge are shared freely.
                        </p>
                        <h2>Meet The Team</h2>
                        <p>
                            Behind Techno Shankar is a passionate team of writers, editors, and creators who strive to bring fresh perspectives on Technology. We love exploring new ideas, diving deep into discussions, and providing our readers with well-researched and thought-provoking content.
                        </p>
                    </div>
                    <div className="about-image">
                        <img
                            src="/images/group-of-professionals-working-together.png"
                            alt="Our Team"
                            width={500}
                            height={500}
                            style={{ filter: "brightness(1) contrast(1)" }}
                        />
                    </div>
                </div>
            </section>

            <section className="about-values">
                <h2>Our Values</h2>
                <div className="container">
                    <ul>
                        <li><strong>Authenticity:</strong> We believe in sharing genuine content that resonates with our audience.</li>
                        <li><strong>Creativity:</strong> Innovation and creativity are at the heart of everything we do.</li>
                        <li><strong>Community:</strong> We are committed to building a supportive and engaging community of readers.</li>
                        <li><strong>Excellence:</strong> We strive for excellence in every article we publish.</li>
                    </ul>
                </div>
            </section>
        </main>
    );
};
