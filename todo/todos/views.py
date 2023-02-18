from rest_framework import generics, mixins

from .models import Todo
from .serializers import TodoSerializer


class TodoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

todo_list_create_view = TodoListCreateAPIView.as_view()


class TodoDetailAPIView(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

todo_detail_view = TodoDetailAPIView.as_view()


class TodoUpdateMixinView(mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

todo_update_mixin_view = TodoUpdateMixinView.as_view()


class TodoDestroyAPIView(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

todo_destroy_view = TodoDestroyAPIView.as_view()
