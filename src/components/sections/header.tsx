import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import headerData from '../../../data/header.json';
import { HeaderData } from 'utils/interface';
import Search from '../blocks/search';
import petData from '../../../data/pets.json';

import { Link, Action } from '../atoms';
import ImageBlock from '../blocks/MediaDisplayBlock';
import ChevronDownIcon from '../svgs/chevron-down';
import CloseIcon from '../svgs/close';
import MenuIcon from '../svgs/menu';

export default function Header() {
    const { logo, title, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark' } = headerData;
    const petNames = petData.map((pet) => ({ name: pet.name }));
    return (
        <header className={classNames('sticky top-0', 'z-50', colors, 'relative', 'shadow-header', 'p-4')}>
            <div className="max-w-7x1 mx-auto">
                <div className="flex items-center relative justify-between">
                    {/* Logo and Title */}
                    {(title || logo?.url) && (
                        <div className="mr-10">
                            <SiteLogoLink title={title} logo={logo} />
                        </div>
                    )}

                    {/* Primary Links */}
                    {primaryLinks.length > 0 && (
                        <ul className="hidden mr-3 gap-x-10 lg:flex lg:items-center">
                            <ListOfLinks links={primaryLinks} colors={colors} />
                        </ul>
                    )}

                    {/* Search Component */}
                    <div className="flex-grow mx-4 lg:mx-6">
                        <Search items={petData} />
                    </div>

                    {/* Secondary Links */}
                    {secondaryLinks.length > 0 && (
                        <ul className="hidden ml-auto gap-x-2.5 lg:flex lg:items-center">
                            <ListOfLinks links={secondaryLinks} isSecondary />
                        </ul>
                    )}

                    {/* Mobile Menu */}
                    {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...{ logo, title, primaryLinks, secondaryLinks }} />}
                </div>
            </div>
        </header>
    );
}

function MobileMenu(props) {
    const { title, logo, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark', styles = {} } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const openMobileMenu = () => {
        setIsMenuOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div className="ml-auto lg:hidden">
            <button aria-label="Open Menu" title="Open Menu" className="p-2 -mr-1 focus:outline-none" onClick={openMobileMenu}>
                <span className="sr-only">Open Menu</span>
                <MenuIcon className="fill-current h-6 w-6" />
            </button>
            <div className={classNames(colors, 'fixed', 'inset-0', styles?.self?.padding ?? 'p-4', 'overflow-y-auto', 'z-10', isMenuOpen ? 'block' : 'hidden')}>
                <div className="flex flex-col min-h-full">
                    <div className="flex items-center justify-between mb-10">
                        {(title || logo?.url) && <SiteLogoLink title={title} logo={logo} />}
                        <button aria-label="Close Menu" title="Close Menu" className="p-2 -mr-1 focus:outline-none" onClick={closeMobileMenu}>
                            <CloseIcon className="fill-current h-6 w-6" />
                        </button>
                    </div>
                    {primaryLinks.length > 0 && (
                        <ul>
                            <ListOfLinks links={primaryLinks} inMobileMenu />
                        </ul>
                    )}
                    {secondaryLinks.length > 0 && (
                        <ul>
                            <ListOfLinks links={secondaryLinks} inMobileMenu />
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

function SiteLogoLink({ title, logo }) {
    return (
        <Link href="/" className="flex items-center space-x-4">
            {logo && <ImageBlock {...logo} />}
            {title && <span className="h4">{title}</span>}
        </Link>
    );
}

function ListOfLinks(props) {
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

function LinkWithSubnav(props) {
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
                <ChevronDownIcon
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

function ListOfSubNavLinks({ links = [], inMobileMenu = false }) {
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
