import React from 'react';
import VersionInfo from '../resources/version.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
const viewVersion = () => {
    const Ret = [];
    VersionInfo.versions.forEach(v => {
        Ret.push([<dt key={v.name}>{v.name}</dt>, <dd key={v.name}>{v.version}</dd>]);
    });
    return Ret;
};

export default class VersionItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="version" className="container">
                <dl>{viewVersion()}</dl>
            </div>
        );
    }
}
