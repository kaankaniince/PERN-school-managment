import React from 'react';
import './styles.css'

const Registration = () => {
    return (
        <div className="register-container">
            <div className="login-form">
                <h1>Kayıt Ol</h1>

                <p>Ad</p>
                <input
                    type="text"
                    placeholder="Ad"
                />
                <p>Soyad</p>
                <input
                    type="text"
                    placeholder="Soyad"
                />
                <p>Doğum Tarihi</p>
                <input
                    type="date"
                    placeholder="Doğum Tarihi"
                />
                <p>E-posta</p>
                <input
                    type="email"
                    placeholder="E-posta"
                />
                <p>Şifre</p>
                <input
                    type="password"
                    placeholder="Şifre"
                />
                <button>Hesap Oluştur</button>
            </div>
        </div>
    );
};

export default Registration;
