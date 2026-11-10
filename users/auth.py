from django.views.generic import CreateView
from django.urls import reverse_lazy,reverse
from django.contrib.auth import get_user_model
from . forms import RegisterFormX


User = get_user_model()


class RegisterView(CreateView):
    model = User
    template_name = "register.html"
    form_class = RegisterFormX #RegisterForm
    # REDIRECT TO REGISTRATION EMAIL 
    success_url = reverse_lazy("login")

    
