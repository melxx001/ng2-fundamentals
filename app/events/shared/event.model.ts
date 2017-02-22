export interface Event {
    id: number;
    name: string;
    date: Date;
    time: string;
    price: number;
    imageUrl?: string;
    location?: {
        address: string;
        city: string;
        country: string;
    },
    onlineUrl?: string;
    sessions?: Sessions[];
}

export interface Sessions {
    id: number;
    name: string;
    presenter: string;
    duration: number;
    level: string;
    abstract: string;
    voters: string[];
}