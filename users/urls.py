from django.urls import path
from . import auth,views,profile


urlpatterns = [
    path("register/",auth.RegisterView.as_view(),name="register"),
    path("dashboard/",views.DashboardView.as_view(),name="dashboard"),
    path("profile/<int:pk>/",profile.ProfileView.as_view(),name="profile"),
    path("logout/",views.LogoutView.as_view(),name="log_out"),
    path("order_list/",views.OrderListView.as_view(),name="order_list"),
    path("order_details/<uuid:order_id>/",views.OrderDetailView.as_view(),name="order_detail")
  
]