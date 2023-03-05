from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=200, unique=True, error_messages={'unique': 'This todo already exists'})
    description = models.TextField()

    def __str__(self):
        return self.title
