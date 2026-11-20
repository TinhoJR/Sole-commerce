from django.shortcuts import render
from django.views.generic import TemplateView,View
from shop . models import Order

# Create your views here.



class DashboardView(TemplateView):

    template_name = "dashboard.html"


class OrderDetailView(View):

    template_name = "order-details.html"
    def get(self,request,*args,**kwargs) :

        context = {
            "orders": Order.objects.filter(user=request.user)
        }  

        return render(request,self.template_name,context) 
