import React from 'react';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import privacyHtml from '../resources/documents/privacy.txt';

export default class PrivacyPolicyItem extends React.Component {
    constructor(props) {
        super(props);
        fetch(privacyHtml)
            .then(res => res.text())
            .then(r => (document.getElementById('producer').innerHTML = r));
    }
    render() {
        return (
            <div className="container">
                <section id="producer"></section>
            </div>
        );
    }
}
