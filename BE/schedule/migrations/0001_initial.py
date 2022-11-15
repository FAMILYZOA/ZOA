# Generated by Django 3.2.16 on 2022-11-14 20:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('families', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('start_date', models.DateField(null=True)),
                ('end_date', models.DateField(null=True)),
                ('title', models.CharField(max_length=30)),
                ('color', models.CharField(max_length=50)),
                ('important_mark', models.BooleanField(default=False)),
                ('family', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calendar_family', to='families.family')),
                ('writer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calendar_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
