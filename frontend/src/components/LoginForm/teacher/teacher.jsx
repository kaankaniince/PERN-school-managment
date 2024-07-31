import React from 'react';
import './styles.css';

const Teacher = () => {
    return (
        <div className="teacher-container">
            <div className="login-form">
                <h2>Öğretmen Girişi</h2>
                <p>E-posta</p>
                <input
                    type="email"
                    name="student"
                    placeholder="E-posta"
                />
                <p>Şifre</p>
                <input
                    type="password"
                    name="s_sifre"
                    placeholder="Şifre"
                />
                <button>Giriş Yap</button>
            </div>
        </div>
    );
};

export default Teacher;
