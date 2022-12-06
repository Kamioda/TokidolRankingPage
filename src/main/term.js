import React from 'react';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import termHtml from '../resources/documents/term.txt';

export default class TermItem extends React.Component {
    constructor(props) {
        super(props);
        fetch(termHtml)
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
