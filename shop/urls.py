from django.urls import path
from . import views,product_view,order


urlpatterns = [
    path("",views.HomeView.as_view(),name="index"),
    path("product-list/",views.ProductListView.as_view(),name="product-list"),
    path("product/<int:pk>/details/",product_view.ProductDetailView.as_view(),name="product-detail"),



    path("cart/",product_view.CartPageView.as_view(),name="cart-page"),
    path("cart/checkout/",product_view.CheckoutView.as_view(),name="checkout"),
    path("checkout/order/",order.OrderView.as_view(),name="order"),
    path("payment/<uuid:order_id>/",order.PaymentView.as_view(),name="payment"),
    
    
]