import React from 'react';

export default function Home() {
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <button style={{
                    width: '200px',
                    height: '50px',
                    marginBottom: '10px',
                    fontSize: '16px',
                }}>ÖĞRETMEN</button>
                <button style={{
                    width: '200px',
                    height: '50px',
                    marginBottom: '10px',
                    fontSize: '16px',
                }}>ÖĞRENCİ</button>
                <button style={{
                    width: '200px',
                    height: '50px',
                    fontSize: '16px',
                }}>KAYIT OL</button>
            </div>
        </>
    );
}
