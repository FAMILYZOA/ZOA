FROM python:3.9

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update

RUN apt-get -y install vim

COPY ./ /var/jenkins_home/workspace/ssafyServer/BE/

WORKDIR /var/jenkins_home/workspace/ssafyServer/BE/

RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

RUN python3 manage.py test

RUN python3 manage.py collectstatic -y

EXPOSE 8000

CMD ["gunicorn", "apiserver.wsgi", "--bind", "0.0.0.0:8000"]