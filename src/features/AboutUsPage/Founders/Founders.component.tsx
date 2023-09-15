import './Founders.styles.scss';

import Inna from '@assets/images/about-us/Inna.webp';
import InnaSmall from '@assets/images/about-us/InnaWithBG.webp';
import Natalia from '@assets/images/about-us/Nata.webp';
import NataliaSmall from '@assets/images/about-us/NataliaWithBG.webp';

import TeamMember from '@/models/team/team.model';

import TeamMemberCard from '../TeamMemberCard/TeamMemberCard.component';

import Founder from './Founder/Founder.component';

// тут лежить хардкод
const FounderInna: FounderProps = {
    founderName: 'Інна Крупник',
    founderRole: 'Голова і співзасновниця ГО',
    founderImage: Inna,
    socialMediaLinks: {
        facebook: 'https://www.facebook.com/krupnyk.inna',
        instagram: 'https://www.instagram.com/krupnyk_inna/',
    },
    founderText: '«На участь, до того ж найактивнішу, в проєкті «Стріткод: історія на кожному кроці» мене надихає розуміння того, наскільки українське суспільство та нація проапгрейдили власне розуміння себе та своєї історії за останні роки, наскільки відкриті вони до вивчення історії та спростування історичних міфів, наскільки хочуть бачити цю історію близькою до себе, пережитою та бути дотичною до неї. Це все наштовхує на необхідність важливих історичних проєктів, як просвітницьких, так і розважальних. Для широких верств та найширшого залучення в історію. Занурюймося!»',
    order: true,
};

const FounderNatalia: FounderProps = {
    founderName: 'Наталя Демідова',
    founderRole: 'Авторка ідеї, співзасновниця проєкту',
    founderImage: Natalia,
    socialMediaLinks: {
        facebook: 'https://www.facebook.com/NatalyaDemydiv',
        instagram: 'https://www.instagram.com/notatka8/',
    },
    founderText: '«Я хочу, щоб українські діти, які зростатимуть після Перемоги, знали, хто в цьому світі на що здатний. Хочу, щоби розуміли причинно-наслідкові зв’язки і були захищені цим знанням. Для того маємо відновлювати історичну пам’ять вже зараз. Це водночас і просто, і складно. Просто – бо є проєкт «Стріткод», бачення, як його втілити, і команда, яка вже це робить. Складно, бо масштаби – вся Україна. Але це той проєкт, який має бути реалізований, тут без варіантів. Тому несемось!) Приєднуйтеся ;)»',
    order: false,
};

const TeamMemberCardInna: TeamMember = {
    id: -1,
    isMain: true,
    imageId: -1,
    name: FounderInna.founderName,
    description: FounderInna.founderRole,
    image: {
        id: -1,
        base64: `${InnaSmall}`,
        blobName: 'Inna',
        mimeType: 'png',
    },
    teamMemberLinks: [
        {
            id: -1,
            targetUrl: FounderInna.socialMediaLinks.facebook,
            logoType: 2,
        },
        {
            id: -2,
            targetUrl: FounderInna.socialMediaLinks.instagram,
            logoType: 1,
        },
    ],
    positions: [],
};

const TeamMemberCardNatalia: TeamMember = {
    id: -2,
    isMain: true,
    imageId: -2,
    name: FounderNatalia.founderName,
    description: FounderNatalia.founderRole,
    image: {
        id: -2,
        base64: NataliaSmall,
        blobName: 'Natalia',
        mimeType: 'png',
    },
    teamMemberLinks: [
        {
            id: -1,
            targetUrl: FounderInna.socialMediaLinks.facebook,
            logoType: 2,
        },
        {
            id: -2,
            targetUrl: FounderInna.socialMediaLinks.instagram,
            logoType: 1,
        },
    ],
    positions: [],
};
// Кінець хардкода

const Founders = () => (
    <div className="aboutUsBlockContainer">
        <h1>
            <div />
            <span>Засновниці</span>
            <div />
        </h1>
        <div className="foundersBlock">
            {window.innerWidth > 600 ? <Founder founder={FounderInna} /> : <TeamMemberCard {...TeamMemberCardInna} />}
            {window.innerWidth > 600 ? <Founder founder={FounderNatalia} /> : <TeamMemberCard {...TeamMemberCardNatalia} />}
        </div>
    </div>
);

export default Founders;
