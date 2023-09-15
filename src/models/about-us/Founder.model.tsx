interface SocialMediaLinks {
    facebook: string;
    instagram: string;
    youTube?: string;
    website?: string;
    linkedIn?: string;
    tikTok?: string;
}

interface FounderProps {
    founderName: string;
    founderRole: string;
    founderImage: any;
    founderText: string;
    order: boolean;
    socialMediaLinks: SocialMediaLinks;
}
