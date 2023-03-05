from django.urls import path, include

urlpatterns = [
    path('todos/', include('todos.urls')),
    path('accounts/', include('accounts.urls'))
]
