import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import googlePlay from '@/assets/images/LandingImgs/Groupplay.png'
import appleStore from '@/assets/images/LandingImgs/Group.png'
import logo from '@/assets/images/main-logo.png'
import mdarjLogo from '@/assets/images/mdarjFooter.png'
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

function Footer({ contactUsFooter }: { contactUsFooter: boolean }) {
    const t = useTranslations('footer');
    const locale = useLocale();
    const isRTL = locale === 'ar'; // Adjust based on your RTL locales

    return (
        <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Main content container */}
            <div className="max-w-7xl mx-auto">
                {/* Top section with newsletter and logo */}
                {contactUsFooter ? "" : <>

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between mb-12 lg:mb-16">
                        {/* Right side - Logo and tagline */}
                        <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight text-secondary">
                                <span className='text-primary'>{t('newsletter.title')}</span> {t('newsletter.titleHighlight')}
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                                {t('newsletter.subtitle')}
                            </p>
                        </div>
                        {/* Left side - Newsletter signup */}
                        <div className="flex-1 max-w-lg w-full">
                            <h2 className={`text-gray-600 text-base sm:text-lg mb-6 font-bold text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                                {t('newsletter.stayConnected')}
                            </h2>

                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <input
                                    type="email"
                                    placeholder={t('newsletter.emailPlaceholder')}
                                    className={`flex-1 w-full px-5 py-3 border border-primary placeholder:text-primary rounded-full text-sm ${isRTL ? 'text-right' : 'text-left'} focus:outline-none focus:border-2`}
                                />
                                <button className="bg-secondary hover:bg-secondary/80 text-white px-8 py-3 rounded-full font-bold transition-colors w-full sm:w-auto">
                                    {t('newsletter.subscribe')}
                                </button>
                            </div>

                            <p className={`text-gray-500 text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                                {t('newsletter.privacyNote')}{' '}
                                <Link href="/privacy-policy" className="text-primary hover:underline font-medium">
                                    {t('newsletter.privacyLink')}
                                </Link>{' '}
                                {t('newsletter.privacyNoteSuffix')}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 mb-12"></div>
                </>}

                <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between items-center py-8 sm:py-10'>
                    <Image src={logo.src} alt="logo" width={200} height={150} className="w-40 sm:w-48 md:w-56 h-auto" />
                    <div className={`flex flex-wrap justify-center sm:justify-start text-gray-700 gap-x-3 gap-y-2 text-sm sm:text-base ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                        <a href="#" className={`hover:text-primary transition-colors whitespace-nowrap ${isRTL ? 'sm:border-r-2 pr-3' : 'sm:border-l-2 pl-3'} border-gray-300`}>
                            {t('links.termsOfUse')}
                        </a>
                        <a href="#" className={`hover:text-primary transition-colors whitespace-nowrap ${isRTL ? 'sm:border-r-2 pr-3' : 'sm:border-l-2 pl-3'} border-gray-300`}>
                            {t('links.helpSupport')}
                        </a>
                        <a href="#" className={`hover:text-primary transition-colors whitespace-nowrap ${isRTL ? 'sm:border-r-2 pr-3' : 'sm:border-l-2 pl-3'} border-gray-300`}>
                            {t('links.aboutUs')}
                        </a>
                        <a href="#" className="hover:text-primary transition-colors whitespace-nowrap">
                            {t('links.financing')}
                        </a>
                    </div>
                    <div className="space-y-4">
                        <div className={`flex items-center justify-center sm:justify-end gap-3 text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Phone className="w-5 h-5 text-primary" />
                            <span className="text-lg">{t('contact.phone')}</span>
                        </div>
                        <div className={`flex items-center justify-center sm:justify-end gap-3 text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Mail className="w-5 h-5 text-primary" />
                            <span className="text-base">{t('contact.email')}</span>
                        </div>
                        <div className={`flex items-center justify-center sm:justify-end gap-3 text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="w-5 h-5 text-primary" />
                            <span className="text-base">{t('contact.location')}</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 mb-12"></div>

                {/* Right side - Logo and app downloads */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">

                    {/* Social media icons */}
                    <div className="flex gap-3 justify-center sm:justify-start ">
                        {/* X (Twitter) */}
                        <a href="https://x.com/waqftaiba" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* YouTube */}
                        <a href="https://youtube.com/@waqftaiba" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://instagram.com/waqftaiba" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                            <Instagram className="w-5 h-5 text-white" />
                        </a>
                    </div>
                    {/* App download buttons */}
                    <div className="flex gap-4 mb-6 flex-wrap justify-center sm:justify-end ">
                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                            <Image
                                src={googlePlay.src}
                                alt="Get it on Google Play"
                                width={140}
                                height={48}
                                className="w-32 sm:w-36 h-auto"
                            />
                        </div>
                        <div className="cursor-pointer hover:opacity-80 transition-opacity">
                            <Image
                                src={appleStore.src}
                                alt="Download on App Store"
                                width={140}
                                height={48}
                                className="w-32 sm:w-36 h-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Powered by Mdarj and Copyright section */}
                <div className="bg-gray-100 py-4 px-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Copyright text */}
                        <div className={`text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
                            <p className="text-gray-600 text-sm">
                                {t('copyright')}
                            </p>
                        </div>
                        
                        {/* Powered by Mdarj */}
                        <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm font-bold italic">{t('poweredBy')}</span>
                            <div className="flex items-center gap-2 bg-primary rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <Image
                                    src={mdarjLogo.src}
                                    alt="Mdarj Logo"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;