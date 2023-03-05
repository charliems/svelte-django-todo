from django.urls import path, include

from accounts.views import MeView

urlpatterns = [
    path('me/', MeView.as_view()),
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls'))
]
