# Generated by Django 3.2.16 on 2022-11-11 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PhoneAuthentication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=11, verbose_name='휴대폰 번호')),
                ('certification', models.CharField(max_length=6, verbose_name='인증번호')),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
