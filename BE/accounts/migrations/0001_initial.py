# Generated by Django 3.2.16 on 2022-11-14 20:51

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('phone', models.CharField(max_length=11, unique=True, validators=[django.core.validators.MinLengthValidator(10)], verbose_name='휴대폰 번호')),
                ('name', models.CharField(max_length=30, validators=[django.core.validators.MinLengthValidator(2)], verbose_name='이름')),
                ('birth', models.DateField(verbose_name='생년월일')),
                ('image', models.ImageField(blank=True, default='user/profile/profile_default1.png', null=True, upload_to='user/profile/', verbose_name='프로필 사진')),
                ('kakao_id', models.CharField(blank=True, max_length=30, null=True, unique=True)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
    ]
