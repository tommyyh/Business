Client dependencies

- npm install

Django dependencies

- install all dependencies with - pip install -r requirements.txt

Environment variables

- in root create .env file with theses values:

  - SECRET_KEY = django secret key
  - DB_NAME = mysql database name
  - DB_HOST = mysql database host (in dev use localhost)
  - DB_PORT = mysql port (usually 3306)
  - DB_USER = mysql database user
  - DB_PASS = mysql database password

Start servers

- ./client - npm start
- ./ - python manage.py runserver YOUR_PORT

Database migrations

- if models are modified -> python manage.py makemigrations
- python manage.py migrate
