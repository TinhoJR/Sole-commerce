from django.shortcuts import render
from django.views.generic import ListView,TemplateView
from . models import Product

# Create your views here.


class HomeView(TemplateView):
    
    template_name = "index.html"


    def get_context_data(self, **kwargs):
        ctx = super(HomeView,self).get_context_data(**kwargs)

        ctx["products"] = Product.objects.all()[:8]

        return ctx


class AboutView(TemplateView):

    template_name = "about.html"


class ProductListView(ListView):

    model = Product
    template_name = "product-list.html"
    context_object_name = "products"

    def get_context_data(self, **kwargs):
        ctx = super(ProductListView,self).get_context_data()  
        ctx["shop_name"] = "Exclusive shopping mall"

        return ctx

