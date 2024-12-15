import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Menu from 'components/svgs/menu';
import Close from 'components/svgs/close';
import { SiteLogoLink, PrimaryLinks, SecondaryLinks } from './linkLists';

export function MobileMenu(props) {
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
                <Menu className="fill-current h-6 w-6" />
            </button>
            <div className={classNames(colors, 'fixed', 'inset-0', styles?.self?.padding ?? 'p-4', 'overflow-y-auto', 'z-10', isMenuOpen ? 'block' : 'hidden')}>
                <div className="flex flex-col min-h-full">
                    <div className="flex items-center justify-between mb-10">
                        {(title || logo?.url) && <SiteLogoLink title={title} logo={logo} />}
                        <button aria-label="Close Menu" title="Close Menu" className="p-2 -mr-1 focus:outline-none" onClick={closeMobileMenu}>
                            <Close className="fill-current h-6 w-6" />
                        </button>
                    </div>
                    {primaryLinks.length > 0 && (
                        <ul>
                            <PrimaryLinks links={primaryLinks} inMobileMenu />
                        </ul>
                    )}
                    {/* {secondaryLinks.length > 0 && (
                        <ul>
                            <SecondaryLinks links={secondaryLinks} inMobileMenu />
                        </ul>
                    )} */}
                </div>
            </div>
        </div>
    );
}