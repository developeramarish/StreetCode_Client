import './FounderCard.styles.scss';

import Facebook from '@/assets/images/about-us/facebook.svg';
import Instagram from '@/assets/images/about-us/instagram.svg';

const FounderCard = ({ founder }: { founder: FounderProps }) => (
    <div className="founderCard">
        <div className="founderCardImageContainer">
            <img className="founderImage" src={founder.founderImage} alt={founder.founderName} />
        </div>
        <div className="foundersTextBlock borderRadiusSmall">
            <div className="founderCardTextContainer">
                <h2>{founder.founderName}</h2>
                <p>{founder.founderRole}</p>
                <div className="founderCardLinks">
                    <a href={founder.socialMediaLinks.facebook} aria-label="Facebook"><Facebook /></a>
                    <a href={founder.socialMediaLinks.instagram} aria-label="Instagram"><Instagram /></a>
                </div>
            </div>
        </div>
    </div>
);
export default FounderCard;
