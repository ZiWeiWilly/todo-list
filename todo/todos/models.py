from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=32)
    content = models.CharField(blank=True, max_length=64)
    due = models.CharField(blank=True, max_length=16)
    place = models.CharField(blank=True, max_length=16)
    flag = models.CharField(blank=True, max_length=16)
    priority = models.CharField(blank=True, max_length=8)
    is_completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
