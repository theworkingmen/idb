
class NotFoundException(Exception):
    def __init__(self, message):
        Exception.__init__(self)
        self.message = message
        self.status_code = 404

    def to_dict(self):
        res = dict()
        res ['message'] = self.message
        return res
