
from django.shortcuts import render 
from django.views.generic import View
from django.http import HttpResponse,JsonResponse
import json
from . models import Order,OrderItems,Product
from django.contrib.auth.mixins import LoginRequiredMixin



class OrderView(LoginRequiredMixin,View):


    def create_order(self,form_details,cart):

        full_name = form_details["full_name"]
        email = form_details["email"]
        phone_number = form_details["phone_number"]
        delivery_address = form_details["delivery_address"]
        payment_method = form_details["payment_method"]

        order = Order.objects.create(
            user = self.request.user,
            full_name=full_name,
            email=email,
            phone_number=phone_number)

        print(self.request.user)
        print(self.request.user.is_authenticated)
        print(self.request.user.is_anonymous)
        
        for cartitem in cart:
            
            try:
                product = Product.objects.get(pk=cartitem["product_id"])
                product_price = product.price
                
            except Exception as e:
                print(f"PRODUCT ERROR: {e}")
                continue    
            OrderItems.objects.create(
                # product__pk = cartitem["product_id"],
                product_id = cartitem["product_id"],
                order= order,
                quantity=cartitem["product_qty"],
                price=product_price
            )


        print(order.order_items.count())    
            
        return order


    def post(self,request,*args,**kwargs):

        data = json.loads(request.body)

        cart = data["cart"]
        form_details = data["form_details"]

        order = self.create_order(form_details,cart)
        
        print(order.order_id)
        print("ORDER CREATED")

        return JsonResponse({"order_id":order.order_id,
                             "status": 200})



class PaymentView(LoginRequiredMixin,View):

    template_name = "payment.html"

    def get(self,request,*args,**kwargs):

        order_id = kwargs["order_id"]
        order = Order.objects.get(order_id=order_id)

        context = {
            "order":order
        }

        return render(request,self.template_name,context)
        
