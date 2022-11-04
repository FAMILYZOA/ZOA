# Generated by Django 3.2.16 on 2022-11-03 15:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('audio', models.FileField(upload_to='audio/')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('status', models.BooleanField(default=False)),
                ('second', models.IntegerField()),
                ('from_user_id', models.ForeignKey(db_column='from_user_id', on_delete=django.db.models.deletion.CASCADE, related_name='audios_from', to=settings.AUTH_USER_MODEL)),
                ('to_user_id', models.ManyToManyField(db_column='to_user_id', related_name='audios_to', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
