from django.urls import path
from . import views

urlpatterns = [
    # User Routes
    path('users/register/', views.register_user, name='register'),
    path('users/profile/', views.get_user_profile, name='user-profile'),

    # Product Routes
    path('products/', views.product_list, name='product-list'),
    path('products/<int:pk>/', views.product_detail, name='product-detail'),
]