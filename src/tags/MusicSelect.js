import React from 'react';
import rawMusic from '../resources/recordinfo.json';

export default function MusicSelect() {
    return (
        <section>
            <label>曲名</label>
            <select>
                {rawMusic.record.map(m => {
                    return (
                        <option value={m.key} key={m.key}>
                            {m.music}
                        </option>
                    );
                })}
            </select>
        </section>
    );
}
