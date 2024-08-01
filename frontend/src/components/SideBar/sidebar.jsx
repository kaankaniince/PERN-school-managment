import React, { useState } from 'react';


const Sidebar = () => {
    const [activePage, setActivePage] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const renderContent = () => {
        switch (activePage) {
            case 'home':
                return <h1>Home Page</h1>;
            case 'about':
                return <h1>About Page</h1>;
            case 'contact':
                return <h1>Contact Page</h1>;
            default:
                return <h1>Home Page</h1>;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: isSidebarOpen ? '200px' : '0',
                    overflowX: 'hidden',
                    height: '100vh',
                    backgroundColor: 'blue',
                    padding: isSidebarOpen ? '10px' : '0',
                    transition: 'width 0.3s ease, padding 0.3s ease',
                }}
            >
                {isSidebarOpen && (
                    <>
                        <h2>Menu</h2>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li
                                style={{ cursor: 'pointer', padding: '10px 0' }}
                                onClick={() => setActivePage('home')}
                            >
                                Home
                            </li>
                            <li
                                style={{ cursor: 'pointer', padding: '10px 0' }}
                                onClick={() => setActivePage('about')}
                            >
                                About
                            </li>
                            <li
                                style={{ cursor: 'pointer', padding: '10px 0' }}
                                onClick={() => setActivePage('contact')}
                            >
                                Contact
                            </li>
                        </ul>
                    </>
                )}
            </div>
            <div style={{ flex: 1, marginLeft: isSidebarOpen ? '200px' : '0', transition: 'margin-left 0.3s ease', padding: '20px' }}>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    style={{
                        position: 'fixed',
                        top: '10px',
                        left: '10px',
                        padding: '5px 10px',
                        fontSize: '12px',
                        zIndex: 1,
                    }}
                >
                    {isSidebarOpen ? 'Close' : 'Open'}
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default Sidebar;
