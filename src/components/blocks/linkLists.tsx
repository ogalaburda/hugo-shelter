import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ChevronDown from 'components/svgs/chevron-down';
import Link from "next/link";
import classNames from 'classnames';
import Donate from '../svgs/donate';
import Heart from 'components/svgs/favorites';
import ImageBlock from '../blocks/MediaDisplayBlock';
import Button from './button';

export function SiteLogoLink({ title, logo }) {
    return (
        <Link href="/" className="flex items-center space-x-4">
            {logo && <ImageBlock {...logo} />}
            {title && <span className="h4">{title}</span>}
        </Link>
    );
}

export function PrimaryLinks(props) {
    const { links = [], colors, inMobileMenu = false } = props;

    return (
        <>
            {links.map((link, index) => {
                if (link.type === 'SubNav') {
                    return <LinkWithSubnav key={index} link={link} inMobileMenu={inMobileMenu} colors={colors} />;
                } else {
                    return (
                        <li
                            key={index}
                            className={classNames(inMobileMenu ? 'border-t' : 'py-2', {
                                'py-4': inMobileMenu && link.type === 'Button'
                            })}
                        >
                            <Link
                                href={link.url}
                                className={classNames('whitespace-nowrap', inMobileMenu ? 'w-full' : 'text-sm', {
                                    'justify-start py-3': inMobileMenu && link.type === 'Link'
                                })}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                }
            })}
        </>
    );
}

export function SecondaryLinks(props) {
    const { links = [], colors, inMobileMenu = false } = props;
    const router = useRouter();

    const handleNavigation = (url) => {
        // Compare current path with target URL
        if (router.asPath !== url) {
            router.push(url);
        }
    };

    return (
        <ul className="flex space-x-4">
            {links.map((link, index) => (
                <li key={index}>
                    <button
                        onClick={() => handleNavigation(link.url)}
                        className="flex items-center justify-center p-2 rounded hover:bg-gray-100"
                        aria-label={link.label}
                    >
                        {link.label === 'Favorites' ? (
                            <Heart className="w-6 h-6 text-blue-500 hover:text-blue-700" />
                        ) : link.label === 'Donate' ? (
                            <Donate className="w-6 h-6 text-blue-500 hover:text-blue-700" />
                        ) : (
                            link.label
                        )}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export function ListOfSubNavLinks({ links = [], inMobileMenu = false }) {
    return (
        <>
            {links.map((link, index) => (
                <li key={index}>
                    <Link href={link.url || '#'} className={classNames(inMobileMenu ? 'w-full justify-start' : 'text-sm text-left', link.className)}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </>
    );
}

export function LinkWithSubnav(props) {
    const { link, colors, inMobileMenu = false } = props;
    const [isSubNavOpen, setIsSubNavOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsSubNavOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <li
            className={classNames('relative', inMobileMenu ? 'border-t py-3' : 'py-2 group')}
            onMouseLeave={
                !process.env.stackbitPreview && !inMobileMenu
                    ? () => {
                          setIsSubNavOpen(false);
                      }
                    : undefined
            }
        >
            <button
                aria-expanded={isSubNavOpen ? 'true' : 'false'}
                onMouseOver={
                    !process.env.stackbitPreview && !inMobileMenu
                        ? () => {
                              setIsSubNavOpen(true);
                          }
                        : undefined
                }
                onClick={() => setIsSubNavOpen((prev) => !prev)}
                className={classNames('inline-flex items-center', inMobileMenu ? 'w-full' : 'text-sm', {
                    'hover:text-primary': !inMobileMenu && link.labelStyle === 'primary'
                })}
            >
                {link.label}
                <ChevronDown
                    className={classNames('fill-current', 'shrink-0', 'h-4', 'w-4', isSubNavOpen && 'rotate-180', inMobileMenu ? 'ml-auto' : 'ml-1')}
                />
            </button>
            {(link.links ?? []).length > 0 && (
                <ul
                    className={classNames(
                        colors,
                        inMobileMenu ? 'p-4 space-y-3' : 'absolute top-full left-0 w-max border-t border-primary shadow-header z-10 px-4 py-4 space-y-5',
                        isSubNavOpen ? 'block' : 'hidden'
                    )}
                >
                    <ListOfSubNavLinks links={link.links} inMobileMenu={inMobileMenu} />
                </ul>
            )}
        </li>
    );
}



