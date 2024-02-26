class Product:

    def __init__(self, id, product_name, product_partner,
                 constant, plan_value, basic_name, plan_type,
                 product_type, plan_name, bcv, points_earned,
                 points_to_be_paid, points_for_carrer,
                 satbppr):
        self.id = id
        self.product_name = product_name
        self.product_partner = product_partner
        self.constant = float(constant)
        self.plan_value = plan_value
        self.basic_name = basic_name
        self.plan_type = plan_type
        self.product_type = product_type
        self.plan_name = plan_name
        self.bcv = float(bcv)
        self.points_earned = float(points_earned),
        self.points_to_be_paid = points_to_be_paid
        self.points_for_career = points_for_carrer
        self.satbppr = satbppr

    def encode(self):
        return self.__dict__