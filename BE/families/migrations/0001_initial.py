# Generated by Django 3.2.16 on 2022-11-20 18:28

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
            name='Family',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=13, verbose_name='가족이름')),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='InvitationCodeFamily',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invitationcode', models.CharField(max_length=33)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('family_id', models.ForeignKey(db_column='family_id', on_delete=django.db.models.deletion.CASCADE, related_name='invitationcode', to='families.family')),
            ],
        ),
        migrations.CreateModel(
            name='FamilyInteractionName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=12)),
                ('family', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users_name', to='families.family')),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='from_family_name', to=settings.AUTH_USER_MODEL)),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='to_family_name', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
