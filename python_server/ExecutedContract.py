class ExecutedContract:

    def __init__(self, contract_id, product, user, subordinate, client, date_of_payment, base_value, number_of_points, in_eur, paid_out):
        self.contract_id = contract_id
        self.product = product
        self.user = user
        self.subordinate = subordinate
        self.client = client
        self.date_of_payment = date_of_payment
        self.base_value = float(base_value)
        self.number_of_points = float(number_of_points)
        self.in_eur = float(in_eur)
        self.paid_out = paid_out

    def encode(self):
        return self.__dict__