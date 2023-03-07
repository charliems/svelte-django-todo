from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=200, unique=True, error_messages={'unique': 'This todo already exists'})
    description = models.TextField()
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='todos')

    def __str__(self):
        return self.title
