export interface HeaderData {
    logo?: {
        url: string;
        altText: string;
    };
    title?: string;
    primaryLinks: Array<{
        label: string;
        altText?: string;
        url?: string;
        links?: Array<{
            label: string;
            url: string;
            style?: string;
            type?: string;
        }>;
        labelStyle?: string;
        type?: string;
        colors?: string;
    }>;
    secondaryLinks?: Array<{
        label: string;
        url: string;
    }>;
    colors?: string;
}

export interface Pet {
    id: string;
    status?: string;
    // image?: string;
    additionalImages?: string[];
    type?: string;
    breed?: string;
    sex?: string;
    name?: string;
    dob?: string;
    dis?: string;
    location?: string;
    weight?: string;
    color?: string;
    medication?: string;
    personality?: string[];
    goodWithCats?: string;
    goodWithDogs?: string;
    description?: string;
    history?: string;
}

export interface GridProps {
    items: {
        id: string;
        name: string;
        dob: string;
        dis: string;
        location: string;
        additionalImages: string[];
        // image: string;
        url?: string;
    }[];
}