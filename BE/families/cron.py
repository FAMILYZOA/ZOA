from datetime import datetime
from .models import InvitationCodeFamily

def DeleteCodeObject():
    time = datetime.datetime.now()-datetime.timedelta(minutes=1)
    data = InvitationCodeFamily.objects.filter(created_at__lt=time)
    data.delete()
    return