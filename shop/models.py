from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.utils import timezone
import uuid
# Create your models here.

User = get_user_model()



# PRODUCT MODEL
class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="product")
    title = models.CharField(max_length=300)
    description = models.TextField()
    price = models.DecimalField()
    quantity = models.IntegerField()
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def delete(self,*args,**kwargs):
        self.is_deleted = True
        self.save()


    def __str__(self):
        return "{} - {}".format(self.title,self.created_at.strftime("%d-%m-%Y"))
    

# PRODUCT IMAGE MODEL
class ProductImage(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="product_image")    
    image = models.FileField(upload_to="products/")
    is_cover = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {}".format(self.product.title,self.created_at)


# CART MODEL
class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="cart_item")
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="cart_item") 
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="order")
    full_name = models.CharField(max_length=400)
    email = models.EmailField()
    phone_number = models.IntegerField()
    order_id = models.UUIDField(unique=True,default=uuid.uuid4,blank=False,null=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} - {}".format(self.full_name,self.date)
    
class OrderStatus(models.Model):
    ORDER_STATUS_CHOICES = (("created","created"),("paid","paid"),("processing","processing"),("in_delivery","in_delivery"),("delivered","delivered"))
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="status") 
    status = models.CharField(max_length=20,choices=ORDER_STATUS_CHOICES)
    date = models.DateTimeField(auto_now_add=True)


class OrderItems(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="order_items")
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="order_items")
    quantity = models.IntegerField()
    price = models.DecimalField()
    date = models.DateTimeField(auto_now_add=True)

    
    

class ShippingInfo(models.Model):

    pass