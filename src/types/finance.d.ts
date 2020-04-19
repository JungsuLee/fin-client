interface IFinData {
    offerings: IOffering[];
    expenses: IExpense[];
    revenues: IRevenue[];
    totalGeneralOffering: number;
    totalSpecialOffering: number;
    totalExpense: number;
    totalRevenue: number;
    finSummary: IFinSummary;
}

interface IOffering {
    date: string;
    amount: number;
    // description: string;
    // name: string;
    category: string;
    // moneyType: string;
}

interface IExpense {
    date: string;
    amount: number;
    description: string;
    category: string;
    // status: string;
    // reference: string;
}

interface IRevenue {
    date: string;
    amount: number;
    description: string;
    category: string;
    // team: string;
    // reference: string;
}

interface IFinSummary {
    years: string[];
    totalAmount: number;
    totalGeneralOffering: number;
    totalMissionaryOffering: number;
    totalVehicleOffering: number;
    totalConstructionOffering: number;
}
