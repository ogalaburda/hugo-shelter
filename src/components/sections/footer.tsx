import React from 'react';
import footerData from '../../../data/footer.json';

const Footer: React.FC = () => {
    const { copyright, links } = footerData;

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Copyright Section */}
                <div className="text-sm text-center md:text-left">
                    {copyright}
                </div>

                {/* Links Section */}
                <ul className="flex space-x-4 mt-2 md:mt-0">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.url}
                                className="text-gray-300 hover:text-white text-sm"
                            >
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
