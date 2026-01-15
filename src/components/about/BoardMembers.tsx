"use client"
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

import salehHussien from '@/assets/images/saleh-hussien.png';
import aliKazlan from '@/assets/images/ali-kazlan.png';
import talalSuail from '@/assets/images/talal-suail.png';
import mashaalMahalawy from '@/assets/images/mashaal-mahalawy.png';
import othmanAlhasim from '@/assets/images/othman-alhasim.png';

const memberImages: Record<string, typeof salehHussien> = {
    'saleh-hussien': salehHussien,
    'ali-kazlan': aliKazlan,
    'talal-suail': talalSuail,
    'mashaal-mahalawy': mashaalMahalawy,
    'othman-alhasim': othmanAlhasim,
};

export default function BoardMembers() {
    const t = useTranslations('aboutUs.boardMembers');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const members = t.raw('members') as Array<{ name: string; image: string }>;

    return (
        <div className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className={`text-secondary ${isRTL ? 'me-2' : 'ms-2'}`}>{t('title')}</span>
                    <span className="text-primary"> {t('titleHighlight')}</span>
                </h1>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6">
                    {members.map((member, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Avatar Circle with Image */}
                            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 shadow-lg">
                                <Image
                                    src={memberImages[member.image]}
                                    alt={member.name}
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Name */}
                            <div className="text-center">
                                <p className="text-blue-900 font-bold text-lg leading-relaxed">
                                    {member.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}