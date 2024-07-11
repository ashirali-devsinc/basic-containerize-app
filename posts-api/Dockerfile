From ruby:3.1.1

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /backend

COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock

RUN bundle install

COPY . /backend

EXPOSE 3000

CMD [ "bash", "-c", "rails db:create && rails db:migrate && bundle exec rails server -b 0.0.0.0" ]
