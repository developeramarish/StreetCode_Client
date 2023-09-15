import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import TeamMember from '@/models/team/team.model';

import TeamMemberCard from '../../TeamMemberCard/TeamMemberCard.component';

type TeamMemberSliderProps = {
    team: TeamMember[];
};

const sliderProps = {
    centeredSlides: true,
    spaceBetween: 20,
    slideToClickedSlide: true,
    loop: true,
};

const TeamMemberSlider: React.FC<TeamMemberSliderProps> = ({ team }) => {
    const getSliderData = () => (team.length > 0 ? (
        <Swiper slidesPerView="auto" {...sliderProps}>
            {team.map((member) => (
                <SwiperSlide key={member.id}>
                    <TeamMemberCard {...member} />
                </SwiperSlide>
            ))}
        </Swiper>
    ) : (
        <></>
    ));

    return <div className="teamMembersSlider">{getSliderData()}</div>;
};

export default TeamMemberSlider;
