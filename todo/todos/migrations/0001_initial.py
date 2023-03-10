# Generated by Django 4.1.7 on 2023-02-17 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32)),
                ('content', models.CharField(blank=True, max_length=64)),
                ('due', models.CharField(blank=True, max_length=16)),
                ('place', models.CharField(blank=True, max_length=16)),
                ('flag', models.CharField(blank=True, max_length=16)),
                ('priority', models.CharField(blank=True, max_length=8)),
                ('is_completed', models.BooleanField(default=False)),
            ],
        ),
    ]
