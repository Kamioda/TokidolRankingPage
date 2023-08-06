import React, { createElement } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/producer_search.css';

/**
 *
 * @param {{ id: number, producer_id: string, name: string, icon: string, introduction: string }} Producer
 * @returns {JSX.Element}
 */
const createProducerSearchResultBlock = Producer => {
    if (Producer.introduction == null || Producer.introduction.length === 0) Producer.introduction = '< 自己紹介なし >';
    return (
        <article className="producer_info" key={Producer.producer_id}>
            <div>
                <p>
                    {Producer.name} @{Producer.producer_id}
                </p>
                <p>{Producer.introduction}</p>
            </div>
        </article>
    );
};

export default class ProducerSearchItem extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @type { { producers: JSX.Element[], keyword: string} }
         */
        this.state = {
            producers: [],
            keyword: '',
        };
    }
    search() {
        const keyword = this.state.keyword;
        if (keyword.length === 0) return;
        const requestUrl = `https://api.tokidolranking.site/v1_insider_preview/user?keyword=${keyword.replace(
            ' ',
            '+'
        )}`;
        fetch(requestUrl)
            .then(r => r.json())
            .then(response => {
                this.setState({
                    producers:
                        Object.keys(response.producers).length > 1
                            ? response.producers.map(p => createProducerSearchResultBlock(p))
                            : [createProducerSearchResultBlock(response.producers)],
                });
            });
    }
    render() {
        return (
            <div className="container">
                <section>
                    <p>検索キーワード</p>
                    <input onBlur={e => this.setState({ keyword: e.target.value })} />
                    <input type="button" onClick={this.search.bind(this)} value="検索" />
                </section>
                {createElement('section', { id: 'producer_informations' }, this.state.producers)}
            </div>
        );
    }
}
