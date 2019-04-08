FROM python:3.7.0
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN apt-get update
RUN apt-get install gdal-bin libgdal-dev
RUN apt-get install python3-gdal
RUN apt-get install binutils libproj-dev
RUN pip install -r requirements.txt
ADD . /code/