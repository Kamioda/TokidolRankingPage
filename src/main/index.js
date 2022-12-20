import React from 'react';
import musics from '../resources/recordinfo.json';
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.items = musics.record.map(r => {
            const boxContent =
                r.picture == null ? (
                    <div className="noimage"></div>
                ) : (
                    <img src={`${process.env.PUBLIC_URL}/pic/${r.picture}`} title={r.picture}></img>
                );
            return (
                <section key={r.key} className="box">
                    {boxContent}
                    <a href={'/ranking?song=' + r.key}>
                        <article className="title">{r.music}</article>
                    </a>
                </section>
            );
        });
    }
    render() {
        return <div className="container index_selection_container">{this.items}</div>;
    }
}
