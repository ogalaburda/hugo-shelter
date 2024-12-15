import * as React from 'react';
import classNames from 'classnames';
import headerData from '../../../data/header.json';
import Search from '../blocks/search';
import petData from '../../../data/pets.json';
import { SiteLogoLink, PrimaryLinks, SecondaryLinks } from '../blocks/linkLists';
import { MobileMenu } from 'components/blocks/mobileMenu';

export default function Header() {
    const { logo, title, primaryLinks = [], secondaryLinks = [], colors = 'bg-light-fg-dark' } = headerData;
    const petNames = petData.map((pet) => ({ name: pet.name }));
    return (
        <header className={classNames('sticky top-0', 'z-50', colors, 'relative', 'shadow-lg', 'p-4')}>
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
                            <PrimaryLinks links={primaryLinks} colors={colors} />
                        </ul>
                    )}

                    {/* Search Component */}
                    <div className="flex-grow mx-4 lg:mx-6">
                        <Search items={petData} />
                    </div>

                    {/* Secondary Links */}
                    {secondaryLinks.length > 0 && (
                        // <ul className="hidden ml-auto gap-x-2.5 lg:flex lg:items-center">
                            <SecondaryLinks links={secondaryLinks} isSecondary />
                        // </ul>
                    )}

                    {/* Mobile Menu */}
                    {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...{ logo, title, primaryLinks, secondaryLinks }} />}
                </div>
            </div>
        </header>
    );
}