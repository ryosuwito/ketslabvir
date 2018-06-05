# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render, redirect
from data_handler.forms import UserForm, ProfileForm
from django.contrib import messages

# Create your views here.
@login_required(login_url="/admin/login/")
@transaction.atomic
def update_profile(request):
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, instance=request.user.profile)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Your profile was successfully updated!')
            return redirect('/profiles')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        user_form = UserForm(instance=request.user)
        profile_form = ProfileForm(instance=request.user.profile)
    return render(request, 'data_handler/profile.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })

@login_required(login_url="/admin/login/")
def show_profile(request):
    return render(request, 'data_handler/profile_page.html')
