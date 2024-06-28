class grossProfit:

    def __init__(self, **data):

        def get_netsales():
            sales = data.get('sales', 0)
            sales_return = data.get('sales_return', 0)
            sales_discount = data.get('sales_discount', 0)

            return sales - sales_return - sales_discount

        self.netsales = get_netsales()

        def get_netpurchases():
            purchases = data.get('purchases', 0)
            purchase_return = data.get('purchase_return', 0)
            purchase_discount = data.get('purchase_discount', 0)
            transportaion_in = data.get('transportaion_in', 0)
            wages = data.get('wages', 0)

            return purchases - purchase_return - purchase_discount + transportaion_in + wages

        self.netpurchases = get_netpurchases()

        def get_cogs():
            mdsInventory_opening = data.get('mdsInventory_opening', 0)
            mdsInventory_ending = data.get('mdsInventory_ending', 0)

            gafs = mdsInventory_opening + self.netpurchases

            return gafs - mdsInventory_ending

        self.cogs = get_cogs()
        self.grossProfit = self.netsales - self.cogs

    @property
    def revenue_details(self):
        print(
            f'I\'ve gross profit of this year {self.grossProfit} out of which the net sales are {
                self.netsales} - cost of goods sold is {self.cogs} in which the net purchases this year are {self.netpurchases}!'
        )


class netProfit(grossProfit):

    def __init__(self, **data):
        super().__init__(**data)

        def get_operatingExpense():
            expenses = data.get('expenses', 0)
            if not bool(expenses):
                self.operatingExpense = expenses
            else:
                self.operatingExpense = 0
                for expense in expenses.values():
                    self.operatingExpense += expense

        get_operatingExpense()

        self.netProfit = self.grossProfit - self.operatingExpense

    @property
    def revenue_details(self):
        print(
            f'I\'ve net profit of this year {self.netProfit} out of which the gross profit is, net sales: {self.netsales} - cost of goods sold: {self.cogs} = {
                self.grossProfit} - total operating expense is {self.operatingExpense}, in which the net purchases this year are {self.netpurchases}!'
        )


class totalNetProfit(netProfit):

    def __init__(self, **data):
        super().__init__(**data)

        def get_otherIncome():
            otherIncome = data.get('otherIncome', 0)

            if not bool(otherIncome):
                self.otherIncome = otherIncome
            else:
                self.otherIncome = 0
                for income in otherIncome.values():
                    self.otherIncome += income

        get_otherIncome()
        self.totalNetProfit = self.netProfit + self.otherIncome

    @property
    def revenue_details(self):
        print(
            f'I\'ve total net profit of this year {self.totalNetProfit} out of which the net profit is, gross profit = net sales: {self.netsales} - cost of goods sold: {self.cogs} = {self.grossProfit} - total operating expense: {
                self.operatingExpense} = net profit: {self.netProfit} - other income: {self.otherIncome} = total net profit: {self.totalNetProfit}, in which the net purchases this year are {self.netpurchases}!'
        )


rajput_company_grossProfit = grossProfit(sales=50000,
                                         purchases=40000,
                                         mdsInventory_opening=5000,
                                         mdsInventory_ending=6000)

# rajput_company_grossProfit.revenue_details()
rajput_company_grossProfit.revenue_details

expenses = {
    'rent-expense': 2000,
    'insurance-expense': 2000,
    'salaries-expense': 16000,
    'bad-debts-expense': 1000,
    'dep-expense': 1000
}

rajput_company_netProfit = netProfit(sales=50000,
                                     purchases=40000,
                                     mdsInventory_opening=5000,
                                     mdsInventory_ending=6000,
                                     expenses=expenses)

rajput_company_netProfit.revenue_details

otherIncome = {'commission-income': 2000}

rajput_company_totalNetProfit = totalNetProfit(sales=50000,
                                               purchases=40000,
                                               mdsInventory_opening=5000,
                                               mdsInventory_ending=6000,
                                               expenses=expenses,
                                               otherIncome=otherIncome)

rajput_company_totalNetProfit.revenue_details
