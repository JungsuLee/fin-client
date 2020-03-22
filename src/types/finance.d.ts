interface IFinData {
    offerings: IOffering[];
    expenses: IExpense[];
    revenues: IRevenue[];
}

interface IOffering {
    date: string;
    amount: number;
    description: string;
    name: string;
    category: string;
    moneyType: string;
}

interface IExpense {
    date: string;
    amount: number;
    description: string;
    team: string;
    status: string;
    reference: string;
}

interface IRevenue {
    date: string;
    amount: number;
    description: string;
    team: string;
    reference: string;
}

