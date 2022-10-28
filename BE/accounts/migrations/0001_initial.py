# Generated by Django 3.2.16 on 2022-10-27 05:15

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('families', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
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
                ('family_id', models.ForeignKey(blank=True, db_column='family_id', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users', to='families.family')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
    ]
