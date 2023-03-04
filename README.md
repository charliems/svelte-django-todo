# Svelte Django

A simple todo application built with Svelte and Django.

## Installation

Make sure pipenv is installed

```bash
pip install pipenv
```

Install dependencies

```bash
pipenv sync
cd ui/
npm install
```

## Running

Django API
```bash
pipenv run python manage.py runserver
```

Svelte UI
```bash
cd ui/
npm run dev
```