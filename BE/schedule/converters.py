import datetime

class DateConverter:
    # 4자리 - 2자리 - 2자리
    # YYYY  -  MM  -  DD
    regex = '\d{4}-\d{1,2}-\d{1,2}'
    format = '%Y-%m-%d'

    def to_python(self, value):
        return datetime.datetime.strptime(value, self.format).date()

    def to_url(self, value):
        return value.strftime(self.format)