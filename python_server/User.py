class User:

    def __init__(self, id, name, surname, mentor_name, mentor_surname, mentor_id, personal_points, networking_points, paid_points,
                 cash, paid_cash, level, emso, municipality, geolocation, trr, bank, date_of_mentorship, employment_contract_date):
        self.id = id
        self.name = name
        self.surname = surname
        self.mentor_name = mentor_name
        self.mentor_surname = mentor_surname
        self.mentor_id = mentor_id
        self.date_of_mentorship = date_of_mentorship
        self.personal_points = float(personal_points)
        self.networking_points = float(networking_points)
        self.total_points = self.personal_points + self.networking_points
        self.paid_points = float(paid_points)
        self.cash = float(cash)
        self.paid_cash = float(paid_cash)
        self.level = level
        self.emso = emso
        self.municipality = municipality
        self.geolocation = geolocation
        self.trr = trr
        self.bank = bank
        self.employment_contract_date = employment_contract_date

    def encode(self):
        return self.__dict__
