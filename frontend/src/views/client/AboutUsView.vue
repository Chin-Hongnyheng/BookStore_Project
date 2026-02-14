<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay">
        <h1 class="hero-title">About <span class="highlight">Boundora</span></h1>
        <p class="hero-subtitle">
          Your ultimate destination to discover, explore, and shop for the books you love.
        </p>
      </div>
    </section>

    <!-- About the Platform -->
    <section class="platform-section">
      <h2 class="section-title">What We Do</h2>
      <p class="section-description">
        Boundora BookStore is an online book management platform that helps you discover your next
        great read. We provide a curated collection of books across multiple genres, seasonal
        promotions, exclusive coupons, and a personalized subscription service — all in one place.
      </p>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <font-awesome-icon icon="book" />
          </div>
          <h3>Book Collection</h3>
          <p>
            Browse thousands of books across genres — from fiction and romance to technology and
            self-help.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <font-awesome-icon icon="tag" />
          </div>
          <h3>Genres & Categories</h3>
          <p>
            Discover books organized by genre so you can easily find exactly what you're looking
            for.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <font-awesome-icon icon="percent" />
          </div>
          <h3>Promotions & Deals</h3>
          <p>
            Enjoy seasonal sales, hot deals, and Buy 1 Get 1 promotions on your favorite titles.
          </p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <font-awesome-icon icon="gift" />
          </div>
          <h3>Coupons & Discounts</h3>
          <p>Apply coupon codes at checkout to get exclusive discounts on your purchases.</p>
        </div>
      </div>
    </section>

    <!-- Meet Our Developers -->
    <section class="developers-section">
      <h2 class="section-title">Meet Our Developers</h2>
      <p class="section-description">The passionate team behind Boundora BookStore.</p>
      <div class="developers-grid">
        <!-- Developer 1 -->
        <div class="developer-card">
          <div class="developer-image">
            <img src="../../assets/oun.jpg" alt="Developer 1" />
          </div>
          <h3 class="developer-name">Virak Rith</h3>
          <span class="developer-role">Backend Developer & UI Designer</span>
          <p class="developer-bio">
            Experienced in designing intuitive user interfaces and building robust backend services.
            Dedicated to creating seamless user experiences.
          </p>
          <div class="social-links">
            <a href="https://github.com/Poppykhim" target="_blank" class="social-icon github">
              <font-awesome-icon :icon="['fab', 'github']" />
            </a>
            <a
              href="https://www.facebook.com/share/1AuoJspCHo/"
              target="_blank"
              class="social-icon facebook"
            >
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a
              href="https://www.linkedin.com/in/virak-rith"
              target="_blank"
              class="social-icon linkedin"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>
        <!-- Developer 2 -->
        <div class="developer-card">
          <div class="developer-image">
            <img src="../../assets/Niheng.jpg" alt="Developer 2" />
          </div>
          <h3 class="developer-name">Chin Hongnyheng</h3>
          <span class="developer-role">Full Stack Developer</span>
          <p class="developer-bio">
            Passionate about building scalable web applications and clean architecture. Loves
            exploring new technologies and solving complex problems.
          </p>
          <div class="social-links">
            <a href="https://github.com/Chin-Hongnyheng" target="_blank" class="social-icon github">
              <font-awesome-icon :icon="['fab', 'github']" />
            </a>
            <a
              href="https://www.facebook.com/hongnyheng.chin?mibextid=ZbWKwL"
              target="_blank"
              class="social-icon facebook"
            >
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a
              href="https://www.linkedin.com/in/chin-hongnyheng"
              target="_blank"
              class="social-icon linkedin"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <h2 class="section-title">Get In Touch</h2>
      <p class="section-description">
        Have questions, feedback, or just want to say hello? We'd love to hear from you.
      </p>
      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-icon">
            <font-awesome-icon :icon="['far', 'envelope']" />
          </div>
          <h3>Email</h3>
          <p>HelloWorld@boundora.com</p>
        </div>
        <div class="contact-card">
          <div class="contact-icon">
            <font-awesome-icon icon="phone" />
          </div>
          <h3>Phone</h3>
          <p>+855 12 613 806 / +855 78 800 750</p>
        </div>
        <div class="contact-card">
          <div class="contact-icon">
            <font-awesome-icon icon="map-marker-alt" />
          </div>
          <h3>Address</h3>
          <p>Phnom Penh, Cambodia</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutUsView',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

.about-page {
  font-family: 'Nunito', sans-serif;
  color: #1a1a2e;
}

/* ===== Hero Section ===== */
.hero-section {
  background: linear-gradient(135deg, #3255fb 0%, #1a3a8f 100%);
  padding: 100px 40px;
  text-align: center;
  position: relative;
}

.hero-overlay {
  max-width: 700px;
  margin: 0 auto;
}

.hero-title {
  font-size: 52px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.hero-title .highlight {
  color: #fbbf24;
}

.hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

/* ===== Section Common ===== */
.section-title {
  text-align: center;
  font-size: 36px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.section-description {
  text-align: center;
  font-size: 17px;
  color: #6b7280;
  max-width: 650px;
  margin: 0 auto 48px;
  line-height: 1.7;
}

/* ===== Platform Section ===== */
.platform-section {
  padding: 80px 40px;
  background: #ffffff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  background: #f9fafb;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(50, 85, 251, 0.12);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3255fb, #5b7cfa);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  font-size: 24px;
  color: white;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1a1a2e;
}

.feature-card p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
}

/* ===== Developers Section ===== */
.developers-section {
  padding: 80px 40px;
  background: #f3f4f6;
}

.developers-grid {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.developer-card {
  background: white;
  border-radius: 20px;
  padding: 40px 32px;
  text-align: center;
  width: 360px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;
}

.developer-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(50, 85, 251, 0.15);
}

.developer-image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 4px solid #3255fb;
}

.developer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.developer-name {
  font-size: 22px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.developer-role {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #3255fb;
  background: #eef2ff;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.developer-bio {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.social-icon:hover {
  transform: scale(1.15);
}

.social-icon.github {
  background: #333;
}

.social-icon.github:hover {
  box-shadow: 0 4px 12px rgba(51, 51, 51, 0.4);
}

.social-icon.facebook {
  background: #1877f2;
}

.social-icon.facebook:hover {
  box-shadow: 0 4px 12px rgba(24, 119, 242, 0.4);
}

.social-icon.linkedin {
  background: #0a66c2;
}

.social-icon.linkedin:hover {
  box-shadow: 0 4px 12px rgba(10, 102, 194, 0.4);
}

/* ===== Contact Section ===== */
.contact-section {
  padding: 80px 40px;
  background: #ffffff;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  max-width: 900px;
  margin: 0 auto;
}

.contact-card {
  background: #f9fafb;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  border: 1px solid #e5e7eb;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(50, 85, 251, 0.1);
}

.contact-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3255fb, #5b7cfa);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 22px;
  color: white;
}

.contact-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 6px;
}

.contact-card p {
  font-size: 15px;
  color: #6b7280;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .contact-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  .developers-grid {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: 36px;
  }
  .hero-subtitle {
    font-size: 16px;
  }
}
</style>
