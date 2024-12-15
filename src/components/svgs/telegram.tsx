import * as React from 'react';

export default function Telegram({ className, ...props }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M12 0C5.372 0 0 5.372 0 12c0 6.628 5.372 12 12 12s12-5.372 12-12c0-6.628-5.372-12-12-12zm5.46 8.132l-1.553 7.348c-.118.527-.427.657-.864.43l-2.392-1.76-1.155 1.11c-.127.13-.235.237-.482.237l.173-2.482 4.52-4.09c.196-.173-.043-.27-.304-.097l-5.585 3.54-2.405-.752c-.522-.165-.534-.522.11-.78l9.42-3.633c.436-.155.82.097.684.73z" />
        </svg>
    );
}