import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/style.css';
import PageHeaderItem from './header.js';
import PageFooterItem from './footer.js';
import IndexItem from './main/index.js';
import LiveUploadItem from './main/live.js';

const root = ReactDOM.createRoot(document.getElementById('content'));

const App = () => {
    return (
        <Router>
            <PageHeaderItem />
                <main>
                    <Routes>
                        <Route path="/" element={<IndexItem />} />
                        <Route path="/live" element={<LiveUploadItem />} />
                    </Routes>
                </main>
            <PageFooterItem />
        </Router>
    );
};

root.render(
    <React.StrictMode>
        {App()}
    </React.StrictMode>
);
