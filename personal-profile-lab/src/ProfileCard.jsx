import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [favoriteHobbies, setFavoriteHobbies] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  // ฟังก์ชันสำหรับแสดงตัวอักษรแรกของชื่อ
  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  // toggle theme
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const cardClassName = `profile-card ${isDarkMode ? 'dark-mode' : ''}`;

  // เมื่อกดปุ่ม Contact
  const handleContactClick = () => {
    setShowContactForm(true);
    setViewCount((v) => v + 1);
  };

  // เมื่อคลิก skill
  const handleSkillClick = (skill) => {
    alert(`${profile.name} มีความเชี่ยวชาญใน ${skill}!`);
  };

  // เมื่อคลิก hobby ให้ favorite ได้
  const toggleFavoriteHobby = (hobby) => {
    setFavoriteHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((h) => h !== hobby)
        : [...prev, hobby]
    );
  };

  return (
    <div className={cardClassName}>
      {/* ปุ่ม toggle theme */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      {/* ส่วนหัว */}
      <div className="profile-header">
        <div className="profile-avatar">{getInitials(profile.name)}</div>
        <h1 className="profile-name">{profile.name}</h1>
        <div className="student-id">{profile.studentId}</div>
      </div>

      {/* ข้อมูลพื้นฐาน */}
      <div className="profile-info">
        <div className="info-item">
          <div className="info-label">สาขา</div>
          <div className="info-value">{profile.major}</div>
        </div>
        <div className="info-item">
          <div className="info-label">ชั้นปี</div>
          <div className="info-value">{profile.year}</div>
        </div>
        <div className="info-item">
          <div className="info-label">อายุ</div>
          <div className="info-value">{profile.age} ปี</div>
        </div>
        <div className="info-item">
          <div className="info-label">เกรด</div>
          <div className="info-value">
            {profile.gpa.toFixed(2)}
            {profile.gpa >= 3.5 && ' 🌟'}
          </div>
        </div>
      </div>

      {/* งานอดิเรก */}
      <div className="profile-section">
        <h3>🎯 งานอดิเรก</h3>
        <ul className="hobbies-list">
          {profile.hobbies.map((hobby, index) => (
            <li
              key={index}
              className={`hobby-item ${
                favoriteHobbies.includes(hobby) ? 'favorite' : ''
              }`}
              onClick={() => toggleFavoriteHobby(hobby)}
            >
              {hobby}
              {favoriteHobbies.includes(hobby) && ' ❤️'}
            </li>
          ))}
        </ul>
      </div>

      {/* ทักษะ */}
      <div className="profile-section">
        <h3>💻 ทักษะ</h3>
        <div className="skills">
          {profile.skills.map((skill, index) => (
            <div
              key={index}
              className="skill-tag"
              onClick={() => handleSkillClick(skill)}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      {profile.socialLinks && profile.socialLinks.length > 0 && (
        <div className="profile-section">
          <h3>🌐 Social Media</h3>
          <div className="social-links">
            {profile.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="profile-section">
        <h3>🏆 Achievements</h3>
        <div className="achievements">
          {profile.gpa >= 3.5 && (
            <span className="achievement-badge">🌟 เกียรตินิยม</span>
          )}
          {profile.skills.length >= 5 && (
            <span className="achievement-badge">💪 Multi-skilled</span>
          )}
          {favoriteHobbies.length >= 2 && (
            <span className="achievement-badge">❤️ Passionate</span>
          )}
        </div>
      </div>

      {/* ปุ่ม Contact */}
      <button className="contact-button" onClick={handleContactClick}>
        📧 ติดต่อ {profile.name}
      </button>

      {/* แสดงจำนวนครั้งที่กดปุ่ม Contact */}
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        👀 มีคนเปิดดูโปรไฟล์นี้ {viewCount} ครั้ง
      </p>

      {/* แสดงฟอร์มติดต่อ  */}
      {showContactForm && (
        <div className="contact-form">
          <p>ส่งข้อความถึง {profile.name}</p>
          <textarea placeholder="พิมพ์ข้อความ..." />
          <button onClick={() => setShowContactForm(false)}>ปิด</button>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
