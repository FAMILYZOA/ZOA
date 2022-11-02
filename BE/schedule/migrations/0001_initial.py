# Generated by Django 3.2.16 on 2022-11-02 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Checklist',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('today', models.DateField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('title', models.CharField(max_length=30)),
                ('color', models.CharField(max_length=50)),
                ('exitbtn', models.BooleanField(default=False)),
            ],
        ),
    ]