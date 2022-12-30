import React, { createElement /*, useEffect*/ } from 'react';
import '../css/style.css';
import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ranking.css';
import first from '../resources/pic/1st.png';
import second from '../resources/pic/2nd.png';
import third from '../resources/pic/3rd.png';
import musics from '../resources/recordinfo.json';

/**
 * @param {number} order 順位
 */
const createRankingOrderView = order => {
    switch (order) {
        case 1:
            return <img src={first}></img>;
        case 2:
            return <img src={second}></img>;
        case 3:
            return <img src={third}></img>;
        default:
            return <div className="ranking-card__rank">{order}位</div>;
    }
};
/**
 * 個別のランキングのデータを作成する
 * @param {number} order 順位
 * @param {{id: number, user_id: string, name: string, score: number, upload: string}} record レコード情報
 */
const createRankingViewImpl = (order, record) => {
    if (record == null) return <p>投稿されたレコードがありません</p>;
    return (
        <article className="ranking-card" key={`ranking-${order}`}>
            <div className="ranking-card__icons">
                {createRankingOrderView(order)}
                <img src={`https://pic.tokidolranking.site/icon/no_image.png`} alt={record.user_id}></img>
            </div>
            <div className="ranking-card__contents">
                <div className="ranking-card__user-info">
                    <span className="ranking-card__user-name">{record.name}</span>
                    <span className="ranking-card__user-id">@{record.user_id}</span>
                </div>
                <dl>
                    <dt>スコア</dt>
                    <dd>{record.score}</dd>
                </dl>
            </div>
        </article>
    );
};

const noRecord = <h3>レコードがありません</h3>;

/**
 * 個別のランキングのデータを作成する
 * @param {number} order 順位
 * @param {{id: number, user_id: string, name: string, score: number, upload: string}[]|null} record レコード情報の一覧
 */
const createRankingView = recordArr => {
    let order = 1;
    return recordArr == null ? noRecord : recordArr.map(r => createRankingViewImpl(order++, r));
};

export default class RankingItem extends React.Component {
    constructor(props) {
        super(props);
        const search = new URLSearchParams(window.location.search);
        if (!search.has('song')) location.href = './';
        this.state = {
            difficulty: 'extreme',
            songkey: search.get('song'),
            musicName: musics.record.find(r => r.key === search.get('song')).music,
            records: [],
            first_get: false,
        };
    }
    getRecord() {
        fetch(`https://api.tokidolranking.site/v1_insider_preview/record/${this.state.songkey}`, {
            mode: 'cors',
            method: 'GET',
        })
            .then(r => r.json())
            .then(response => {
                const resRecords = [];
                response.record_table.forEach(r => {
                    resRecords[r.level] = r.records;
                    resRecords[r.level].sort((a, b) => b.score - a.score);
                });
                this.setState({ records: resRecords });
            });
    }
    render() {
        /**
         *
         * @param {string} difficulty
         * @param {string} viewText
         * @returns
         */
        if (!this.state.first_get) {
            this.getRecord();
            this.setState({ first_get: true });
            setInterval(() => {
                this.getRecord();
            }, 1000 * 60);
        }
        const createLevelNavButton = difficulty => {
            return createElement(
                'button',
                this.state.difficulty === difficulty
                    ? { className: 'game-mode-container__item is-current', key: difficulty }
                    : {
                          className: 'game-mode-container__item',
                          key: difficulty,
                          onClick: () => this.setState({ difficulty: difficulty }),
                      },
                createElement('a', [], difficulty.toUpperCase())
            );
        };
        const navigation = createElement(
            'nav',
            { className: 'game-mode' },
            createElement('div', { className: 'game-mode-container' }, [
                createLevelNavButton('easy'),
                createLevelNavButton('normal'),
                createLevelNavButton('hard'),
                createLevelNavButton('extreme'),
            ])
        );
        return (
            <div className="container">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h2>{this.state.musicName}</h2>
                </div>
                {navigation}
                <section className="ranking">{createRankingView(this.state.records[this.state.difficulty])}</section>
            </div>
        );
    }
}
