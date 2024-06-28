// import {promises as readline} from 'readline';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// }) 

// const reply = await rl.question('hi, how are you')

export class grossProfitLoss {
    constructor(data) {
        const getNetSales = () => {
            let sales = data.sales || 0;
            let salesReturn = data.salesReturn || 0;
            let salesDisc = data.sales.salesDisc || 0;

            return sales - salesReturn - salesDisc || 0;
        }

        this.netSales = getNetSales()

        const getNetPurch = () => {
            let purchases = data.purchases || 0;
            let purchReturn = data.purchaseReturn || 0;
            let purchDisc = data.purchDisc || 0;
            let transportaion_in = data.transportaion_in || 0;
            let wages = data.wages || 0;

            return purchases - purchDisc - purchReturn + transportaion_in + wages;
        }

        this.netPurchases = getNetPurch()

        const getCogs = () => {
            let mdsInventory_opening = data.mdsInventory_opening || 0;
            let mdsInventory_ending = data.mdsInventory_ending || 0;

            let gafs = mdsInventory_opening + this.netPurchases;

            return gafs - mdsInventory_ending;
        }

        this.cogs = getCogs();
        this.grossProfitLoss = this.netSales - this.cogs;
    }

    get revenue_details() {
        console.log(
            `I've gross profit/Loss of this year ${this.grossProfitLoss} out of which the net sales are ${this.netsales} - cost of goods sold is ${this.cogs} in which the net purchases this year are ${this.netpurchases}!`
        );
    }

};

let data = {
    sales: 50000,
    purchases: 40000,
    mdsInventory_opening: 5000,
    mdsInventory_ending: 6000
}

const grosProfitLoss = new grossProfitLoss(
    data
)

// grosProfitLoss.revenue_details()
grosProfitLoss.revenue_details


export class netProfitLoss extends grossProfitLoss {
    constructor(data) {
        super(data)

        const getOperatingExpense = () => {
            let expenses = data.expenses || 0;
            this.operatingExpense = 0
            if (!!expenses) {
                expenses = Object.values(expenses)
                for (const expense of expenses) {
                    this.operatingExpense += expense
                }
            }
        }
        getOperatingExpense();
        this.netProfitLoss = this.grossProfitLoss - this.operatingExpense
    }

    get revenue_details() {
        console.log(
            `\nI\'ve net profit/loss of this year ${this.netProfitLoss} out of which the gross profit/loss is, net sales: ${this.netSales} - cost of goods sold: ${this.cogs} = ${this.grossProfitLoss} - total operating expense is ${this.operatingExpense}, in which the net purchases this year are ${this.netPurchases}!`
        );
    }
}

let expenses = {
    'rent-expense': 2000,
    'insurance-expense': 2000,
    'salaries-expense': 16000,
    'bad-debts-expense': 1000,
    'dep-expense': 1000
}

data = {
    expenses,
    ...data
}

const rajput_company_netProfitLoss = new netProfitLoss(data)

rajput_company_netProfitLoss.revenue_details

export class totalNetProfitLoss extends netProfitLoss {
    constructor(data) {
        super(data)

        const getOtherIncome = () => {
            let otherIncome = data.otherIncome || 0;
            this.otherIncome = 0;
            if (!!otherIncome) {
                otherIncome = Object.values(otherIncome)
                for (const income of otherIncome) {
                    this.otherIncome += income;
                }
            }
        }
        getOtherIncome();
        this.totalNetProfitLoss = this.netProfitLoss + this.otherIncome;
    }

    get revenue_details() {
        console.log(
            `\nI\'ve total net profit/loss of this year ${this.totalNetProfitLoss} out of which the net profit is, gross profit/loss: ${this.grossProfitLoss} = net sales: ${this.netSales} - cost of goods sold: ${this.cogs} = ${this.grossProfitLoss} - total operating expense: ${this.operatingExpense} = net profit/loss: ${this.netProfitLoss} - other income: ${this.otherIncome} = total net profit/loss: ${this.totalNetProfitLoss}, in which the net purchases this year are ${this.netPurchases}!`
        );
    }
}

let otherIncome = { 'commission-income': 2000 };

data = {
    expenses,
    otherIncome,
    ...data
};

const rajput_company_totalNetProfitLoss = new totalNetProfitLoss(data);

rajput_company_totalNetProfitLoss.revenue_details
