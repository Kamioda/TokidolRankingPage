import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import rawRecord from '../resources/recordinfo.json';
import liveSample from '../resources/pic/sample01.png';
import melodiusSample from '../resources/pic/sample02.png';
import '../css/form.css';
import toast from '../toast.js';

const ToCalendarView = val => {
    const date = new Date(val);
    return `${date.getFullYear()}年${
        date.getMonth() + 1
    }月${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export default class LiveUploadItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_music: '',
            file: null,
            error_message: '',
        };
    }
    __changeMusicSelect(e) {
        this.setState({
            selected_music: e.target.value,
        });
    }
    __setFile(e) {
        if (e.target.files.length === 0) {
            this.setState({ file: null });
        } else {
            this.setState({ file: e.target.files[0] });
            const fileReader = new FileReader();
            fileReader.onload = e => {
                this.setState({ file: e.target.result });
            };
            fileReader.readAsDataURL(this.state.file);
        }
    }
    __sendAction() {
        if (this.state.file == null) {
            this.setState({
                error_message: 'ファイルを選択して下さい',
            });
        } else {
            const formData = new FormData();
            formData.append('img', this.state.file);
            fetch('https://api.tokidolranking.site/v1/record/' + this.state.selected_music, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: localStorage.getItem('access_token'),
                },
                body: formData,
            })
                .then(res => res.json())
                .then(json => {
                    toast['success'](
                        `お問い合わせＩＤ: ${json.ocr_execute_id}
                    読み取り実行時刻: ${ToCalendarView(json.ocr_execute)}`,
                        '投稿成功'
                    );
                });
        }
    }
    render() {
        const preview =
            this.state.file == null ? (
                ''
            ) : (
                <div>
                    <p>アップロードされるファイル</p>
                    <img src={this.state.file} />
                </div>
            );
        const errorMsgView =
            this.state.error_message.length > 0 ? '' : <p className="error_message">{this.state.error_message}</p>;
        return (
            <div className="container">
                <h2>レコードの投稿</h2>
                <section id="live_upload_caution">
                    <p>下のサンプルに合うスクリーンショットを投稿して下さい。</p>
                    <p>関係ないスクリーンショットや違う画像を送っても反映されません。</p>
                    <p>
                        また、利用規約に抵触する画像の投稿があった場合は、アカウント停止措置が取られることもあります。
                    </p>
                </section>
                <form>
                    <label>楽曲選択</label>
                    <select onChange={this.__changeMusicSelect}>
                        {rawRecord.record.map(m => (
                            <option value={m.key} key={m.key}>
                                {m.music}
                            </option>
                        ))}
                    </select>
                    <input type="file" accept="image/*" onChange={this.__setFile} />
                    {preview}
                    <input type="submit" value="送信" onClick={this.__sendAction} />
                    {errorMsgView}
                </form>
                <h4>ライブのサンプル</h4>
                <img className="view_sample" src={liveSample} width="100%" />
                <h4>メロディアスライブのサンプル</h4>
                <img className="view_sample" src={melodiusSample} width="100%" />
            </div>
        );
    }
}
