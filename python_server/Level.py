class Level:

    def __init__(self, level_id, hierarchy_level, hierarchy_name, points_from, points_to, in_eur):
        self.level_id = level_id
        self.level_number = hierarchy_level
        self.level_name = hierarchy_name
        self.points_from = float(points_from)
        self.points_to = float(points_to)
        self.in_eur = float(in_eur)

    def encode(self):
        return self.__dict__