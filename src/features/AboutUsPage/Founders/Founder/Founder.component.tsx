import FounderCard from './FounderCard/FounderCard.component';
import FounderText from './FounderText/FounderText.component';

const Founder = ({ founder }: { founder: FounderProps }) => (
    <div className="foundersContentBlock">
        { founder.order
            ? <FounderText founderText={founder.founderText} />
            : <FounderCard founder={founder} />}

        { founder.order
            ? <FounderCard founder={founder} />
            : <FounderText founderText={founder.founderText} />}
    </div>
);

export default Founder;
