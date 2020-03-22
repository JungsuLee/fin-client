interface IFinData {
    date: Date;
    type: string;
    category: string;
    title: string;
    amount: string;
    description: string;
    isSaved: boolean;
}

interface IOffering {
    id: string;
    date: Date;
    amount: number;
    description: string;
    name: string;
    category: string;
    moneyType: string;
}