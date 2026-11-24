from django.shortcuts import render
from django.views.generic import TemplateView,View
from shop . models import Order

# Create your views here.



class DashboardView(TemplateView):

    template_name = "dashboard.html"


class OrderListView(View):

    template_name = "order_list.html"  

    def get(self,request,*args,**kwargs):

        context = {
            "orders": Order.objects.filter(user=request.user).order_by("-date")
        }  
        return render(request,self.template_name,context)


class OrderDetailView(View):

    template_name = "order-details.html"

    def get(self,request,*args,**kwargs):
        order_id = kwargs["order_id"]
        order = Order.objects.get(order_id=order_id)
        context = {
            "order":order
        }

        return render(request,self.template_name,context)

    
