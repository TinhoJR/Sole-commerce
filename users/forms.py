from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from . models import Profile

User = get_user_model()


class RegisterFormX(UserCreationForm):

    email = forms.EmailField(required=True)
    
    class Meta(UserCreationForm.Meta):
        model = User 
        fields = UserCreationForm.Meta.fields + ('first_name','last_name','email')



class ProfileForm(forms.ModelForm):

    class Meta :
        model = Profile
        exclude = ["user"]
        
