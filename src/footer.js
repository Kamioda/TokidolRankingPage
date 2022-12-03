import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
