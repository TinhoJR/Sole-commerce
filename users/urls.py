from django.urls import path
from . import auth,views,profile


urlpatterns = [
    path("register/",auth.RegisterView.as_view(),name="register"),
    path("dashboard/",views.DashboardView.as_view(),name="dashboard"),
    path("dashboard/profile/",profile.ProfileView.as_view(),name="profile"),
    path("order_details/",views.OrderDetailView.as_view(),name="order_detail")
  
]