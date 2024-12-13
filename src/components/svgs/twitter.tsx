import * as React from 'react';

export default function Twitter({ className, ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-sb-field-path={props['data-sb-field-path']}>
            <path d="M23.34 4.951c-0.78 0.353-1.685 0.612-2.634 0.731l-0.046 0.005c0.964-0.586 1.689-1.484 2.043-2.55l0.010-0.033c-0.902 0.527-1.902 0.91-2.967 1.123-0.854-0.912-2.065-1.48-3.409-1.48-2.578 0-4.668 2.090-4.668 4.668 0 0.377 0.045 0.744 0.129 1.096l-0.006-0.032c-3.88-0.183-7.318-2.047-9.62-4.863-0.397 0.664-0.632 1.465-0.632 2.32 0 0.010 0 0.020 0 0.030v-0.002c0 1.622 0.825 3.048 2.076 3.886-0.78-0.026-1.504-0.239-2.137-0.596l0.023 0.012v0.057c0 0.001 0 0.001 0 0.002 0 2.251 1.593 4.131 3.713 4.572l0.030 0.005c-0.368 0.103-0.79 0.162-1.227 0.162-0.308 0-0.61-0.029-0.902-0.086l0.030 0.005c0.618 1.87 2.332 3.202 4.363 3.242l0.005 0c-1.575 1.245-3.589 1.997-5.779 1.997-0.003 0-0.007 0-0.010 0h0.001c-0.37 0-0.739-0.022-1.11-0.064 2.025 1.314 4.501 2.096 7.16 2.096 0.003 0 0.007 0 0.010 0h-0.001c8.589 0 13.28-7.112 13.28-13.268 0-0.199 0-0.398-0.014-0.598 0.92-0.667 1.695-1.468 2.313-2.384l0.021-0.033z"></path>
        </svg>
    );
}