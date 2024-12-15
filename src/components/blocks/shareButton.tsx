import React, { useState } from 'react';
import Facebook from 'components/svgs/facebook';
import Twitter from 'components/svgs/twitter';
import Telegram from 'components/svgs/telegram';

const ShareButtonDropdown = ({ url, text }: { url: string; text: string }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleShare = (platform: string) => {
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative inline-block">
            {/* Main Share Button */}
            <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded focus:outline-none"
            >
                Share
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div
                    className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded w-48 z-10"
                    onMouseLeave={closeDropdown}
                >
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleShare('facebook')}>
                            <Facebook className="inline-block w-5 h-5 mr-2 text-blue-600" />
                            Facebook
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleShare('twitter')}>
                            <Twitter className="inline-block w-5 h-5 mr-2 text-blue-400" />
                            Twitter
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleShare('telegram')}>
                            <Telegram className="inline-block w-5 h-5 mr-2 text-blue-500" />
                            Telegram
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShareButtonDropdown;