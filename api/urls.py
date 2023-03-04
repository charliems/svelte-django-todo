from django.urls import path, include

urlpatterns = [
    path('todos/', include('todos.urls'))
]