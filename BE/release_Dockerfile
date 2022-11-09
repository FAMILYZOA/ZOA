FROM python:3.9

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update

RUN apt-get -y install vim

COPY ./ /home/BE/

WORKDIR /home/BE/

RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

RUN python3 manage.py test --keepdb

EXPOSE 8000

CMD ["bash", "-c", "python manage.py collectstatic --noinput --settings=apiserver.settings.deploy && python manage.py migrate --settings=apiserver.settings.deploy &&gunicorn apiserver.wsgi --env DJANGO_SETTINGS_MODULE=apiserver.settings.deploy --bind 0.0.0.0:8000"]
