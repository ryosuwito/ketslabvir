# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nim = models.CharField(max_length=30)
    fakultas = models.CharField(max_length=30, blank=True)
    jurusan = models.CharField(max_length=30, blank=True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if not hasattr(instance, 'profile'):
        Profile.objects.create(user=instance)
    instance.profile.save()
"""
class PengukuranHambatan(models.Model):
    tanggal =  models.DateTimeField(default=datetime.now, blank=True)
    praktikan = models.ForeignKey(User, on_delete=models.CASCADE)
    resistor_seri = models.TextField(blank=True)
    resistor_parallel = models.TextField(blank=True)
"""

