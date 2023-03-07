from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from todos.models import Todo
from todos.permissions import IsOwner
from todos.serializers import TodoSerializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
