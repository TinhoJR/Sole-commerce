from django.urls import path
from . import auth


urlpatterns = [
    path("register/",auth.RegisterView.as_view(),name="register"),
    
]