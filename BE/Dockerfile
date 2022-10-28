FROM python:3.9

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update

RUN apt-get -y install vim

COPY ./ /var/jenkins_home/workspace/ssafy_server_developbranch_deploy/Backend/

WORKDIR /var/jenkins_home/workspace/ssafy_server_developbranch_deploy/Backend/

RUN pip3 install --upgrade pip && pip3 install -r requirements.txt
RUN python manage.py test
EXPOSE 8000

CMD ["bash", "-c", "python manage.py test && python manage.py collectstatic --noinput && gunicorn apiserver.wsgi --bind 0.0.0.0:8000"]