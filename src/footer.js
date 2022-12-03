import React from 'react';
import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js';

export default class PageFooterItem extends React.Component {
    constructor(props) {
        super(props);
        this.CurrentYear = new Date().getFullYear();
    }
    render() {
        return (
            <footer>
                <div className="container">
                    <p>Copyright &copy; 2022-{this.CurrentYear} ときめきアイドルスコアランキング運営.</p>
                </div>
            </footer>
        );
    }
}
