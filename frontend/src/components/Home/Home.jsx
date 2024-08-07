import React from 'react';
import { Link } from 'react-router-dom';

function Home () {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Link to="/admin">
                <button style={{
                    width: '200px',
                    height: '50px',
                    marginBottom: '10px',
                    fontSize: '16px',
                }}>ADMİN</button>
            </Link>
            <Link to="/teacher">
                <button style={{
                    width: '200px',
                    height: '50px',
                    marginBottom: '10px',
                    fontSize: '16px',
                }}>ÖĞRETMEN</button>
            </Link>
            <Link to="/student">
                <button style={{
                    width: '200px',
                    height: '50px',
                    marginBottom: '10px',
                    fontSize: '16px',
                }}>ÖĞRENCİ</button>
            </Link>
            <Link to="/register">
                <button style={{
                    width: '200px',
                    height: '50px',
                    fontSize: '16px',
                }}>KAYIT OL</button>
            </Link>
        </div>
    );
}

export default Home;
