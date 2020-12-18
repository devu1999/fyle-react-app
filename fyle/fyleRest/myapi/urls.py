from django.conf.urls import url 
from myapi import views 
 
urlpatterns = [ 
    url(r'^api/branches/autocomplete', views.myapi_list),
    url(r'^api/branches', views.myapi_detail),
    ##url(r'^api/myapi/published$', views.myapi_list_published)
]