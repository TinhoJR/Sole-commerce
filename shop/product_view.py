from django.shortcuts import render
from django.views.generic import CreateView,UpdateView,DeleteView,DetailView,TemplateView,View

from . models import Product,ProductImage
from . forms import CheckoutForm
from django.http import Http404,JsonResponse
import json
from django.contrib.auth.mixins import LoginRequiredMixin


class ProductDetailView(DetailView):
    model = Product
    template_name = "product-detail.html"
    context_object_name = "product"



class CartPageView(TemplateView):
    
    template_name = "cart-page.html"



class CheckoutView(LoginRequiredMixin,View):

    template_name = "checkout.html"

    def get(self,request,*args,**kwargs):
        # ADD CHECKOUT FORM AS A CONTEXT DATA
        form = CheckoutForm()
        context = {
            "form":form
        }

       
        print(request.user)
        print(request.user.is_authenticated)
        print(request.user.is_anonymous)

        return render(request,self.template_name,context)


    def post(self,request,*args,**kwargs) :
        # DESERIALIZE THE CART PAYLOAD RECEIVED FROM FE
        cart = json.loads(request.body) 

        # ITERATE THROUGH THE CART ITEMS , RETRIEVING THE CORRESPONDING PRODUCT
        # DETAILS USING EACH ITEMS PRODUCT ID
        #  ENRICH EACH CART ITEM WITH ITS ASSOCIATED PRODUCT DATA,PRICE,TITLE,IMG AND OTHER RELEVANT ATTR
        for cartitem in cart:
            product_id = cartitem["product_id"]
            print(cartitem["product_id"])
            try:
                product = Product.objects.get(pk=product_id)
                product_price = product.price
                cartitem["product_title"] = product.title
                cartitem["product_price"] = product_price
                # product_cover_image = product.product_image.filter(is_cover=True)
                product_cover_image = product.product_image.get(is_cover=True)
                cartitem["product_img"] = product_cover_image.image.url
                print(cartitem["product_price"])

            # HANDLE EXCEPTIONS RAISED DURING PRODUCT AND PRODUCT IMAGE RETRIVAL
            # ACCOUNT FOR MISSING PRODUCT RECORDS,MISSING PRODUCT IMAGE AND
            # MULTIPLE IMAGE RECORDS RETURNED WHERE A SINGLE RECORD IS EXPECTED
            except Product.DoesNotExist:
                raise Http404("PRODUCT NOT FOUND")  

            except ProductImage.DoesNotExist:
                raise Http404("COVER IMAGE NOT FOUND")

            except ProductImage.MultipleObjectsReturned:
                raise Http404("MULTIPLE COVER IMAGES FOUND")

        # RETURN THE ENRICHED CART DATA TO THE FE
        return JsonResponse(cart,safe=False)

    


