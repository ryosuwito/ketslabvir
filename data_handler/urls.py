from django.conf.urls import url
from data_handler import views

urlpatterns = [
    url(r'^$', views.show_profile),
    url(r'^update/', views.update_profile),
]
