from rest_framework import serializers

from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = [
            'id',
            'title',
            'content',
            'due',
            'place',
            'flag',
            'priority',
            'is_completed',
        ]
