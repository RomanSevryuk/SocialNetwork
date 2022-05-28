import React from 'react';
import s from './Post.module.css';

type PostTypeProps = {
    message: string
    likeCounts: number
}

export const Post = (props: PostTypeProps) => {
    return (
        <div className='content'>
            <div className={s.item}>
                <img
                    src='https://images.ctfassets.net/hrltx12pl8hq/qGOnNvgfJIe2MytFdIcTQ/429dd7e2cb176f93bf9b21a8f89edc77/Images.jpg'/>
                {props.message}
                <div>
                    <span>like {props.likeCounts}</span>
                </div>
            </div>
        </div>
    );
};