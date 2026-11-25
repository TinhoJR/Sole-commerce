from django.shortcuts import render
from django.views.generic import TemplateView,UpdateView
from . models import Profile
from . forms import ProfileForm
from django.urls import reverse_lazy,reverse



class ProfileView(UpdateView):

    model = Profile
    template_name = "profile.html"
    form_class = ProfileForm

    def get_success_url(self):
        profile_pk = self.kwargs.get("pk")
        return reverse("profile",args=[profile_pk])