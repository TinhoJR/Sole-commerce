from django.shortcuts import render
from django.views.generic import TemplateView,View
from shop . models import Order

# Create your views here.



class DashboardView(TemplateView):

    template_name = "dashboard.html"

    def get_context_data(self, **kwargs):
        ctx = super(DashboardView,self).get_context_data(**kwargs)
        orders = Order.objects.filter(user=self.request.user)
        ctx["orders"] = orders
        ctx["pending_orders"] = sum(1 for order in orders 
                                    if order.latest_status and order.latest_status.status=="paid")
        ctx["delivered_orders"] = sum(1 for order in orders
                                      if order.latest_status and order.latest_status.status=="delivered")

        return ctx


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

    
