from django import forms
from . models import Product



class ProductForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = ["title","description","price","quantity"]


class CheckoutForm(forms.Form):

    full_name = forms.CharField(max_length=300,label="Full Name")
    email = forms.EmailField(label="Email Address")
    phone_number = forms.IntegerField(label="Phone Number")
    delivery_address = forms.CharField(max_length=450,label="Delivery Address")  