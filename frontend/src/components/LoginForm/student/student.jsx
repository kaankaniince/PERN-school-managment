import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Student = () => {
    return (
        <div className="student-container">
            <div className="login-form">
                <h2>Öğrenci Girişi</h2>
                <p>Öğrenci Numarası</p>
                <input
                    type="number"
                    name="student"
                    placeholder="Öğrenci Numarası"
                />
                <p>Şifre</p>
                <input
                    type="password"
                    name="s_sifre"
                    placeholder="Şifre"
                />
                <button>Giriş Yap</button>
                <p style={{textAlign:"center"}}>Hesabınız yok mu? <Link style={{color:"blue"}} to="/register">Hesap oluşturun.</Link></p>
            </div>
        </div>
    );
};

export default Student;
