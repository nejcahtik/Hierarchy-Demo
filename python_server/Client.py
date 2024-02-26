class Client:

    def __init__(self, id, name, surname, emso, address, city, email):
        self.id = id
        self.name = name
        self.surname = surname
        self.emso = emso
        self.address = address
        self.city = city
        self.email = email

    def encode(self):
        return self.__dict__